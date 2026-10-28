import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createConfiguredService,loadSkillCornerFixture} from '../backend/server.mjs';
import {createQueryService} from '../backend/query-service.mjs';
import {loadPromptBundle,loadAttackPromptBundle,buildFactPacket} from '../backend/prompt-contract.mjs';
import {buildAttackPacket,validateAttackAnswer,renderAttackAnswer} from '../backend/attack-contract.mjs';
const fixture=await loadSkillCornerFixture();
const dummy={MATCHMIND_PROVIDER:'responses',MATCHMIND_ENDPOINT_KIND:'foundry_resource',MATCHMIND_MODEL_ENDPOINT:'https://l-contract.services.ai.azure.com',MATCHMIND_MODEL_DEPLOYMENT:'qa-only',MATCHMIND_MODEL_PROFILE:'gpt-5-mini',MATCHMIND_API_KEY:'not-a-real-key'};
const expectedFacts={actions:3,passes:2,completed_passes:2,shots:1,xg_estimate:.01,camera_off_ball_observations:3};
const plainCandidate=p=>({schema_version:'matchmind-answer/2.0',scope:p.scope,topic:p.topic,summary:'Only recorded actions in the frozen snapshot are described.',fact_claims:p.required_fact_keys.map(key=>({key,value:p.facts[key]})),receipt_ids:p.evidence.map(e=>e.receipt_id)});
const attackCandidate=(p,kind)=>{const f=p.allowed_focus_candidates.find(f=>!kind||f.kind===kind);assert.ok(f,'Requested contract focus must be actually authorized');return {schema_version:'matchmind-attack-answer/1.0',scope_type:'attack',scope:p.scope,summary_key:f.kind,focus_candidate_id:f.id,focus_claim_ids:f.claimIds,steps:p.claims.map(c=>({claim_id:c.id,role:c.kind})),receipt_ids:p.evidence.map(e=>e.receipt_id),limitation_ids:p.required_limitation_ids};};
const response=c=>new Response(JSON.stringify({status:'completed',output:[{type:'message',role:'assistant',content:[{type:'output_text',text:JSON.stringify(c)}]}]}),{headers:{'content-type':'application/json'}});
async function setup({kind,mutate,cutoff=20000}={}){
 let calls=0;const requests=[];const service=await createConfiguredService({env:dummy,fixture,initialCutoffMs:cutoff,now:()=>100000,fetchImpl:async(_url,options)=>{calls++;const body=JSON.parse(options.body),packet=JSON.parse(body.input[0].content[0].text).frozen_fact_packet;requests.push({body,packet,redirect:options.redirect});return response(mutate?mutate(attackCandidate(packet,kind),packet):packet.scope_type==='attack'?attackCandidate(packet,kind):plainCandidate(packet));}});
 const session=service.createSession({match_id:fixture.demo.match.match_id});const input={session_id:session.session_id,query_id:'qa-L-attack',match_id:fixture.demo.match.match_id,team_id:'sk_team_868',chain_id:'chance_001',cutoff_ms:15900,viewer_playhead_ms:15900,question:'Explain this attack',mode:'casual'};
 return {service,input,calls:()=>calls,requests};
}

test('L Responses attack: actual new prompt/schema/mode/claims/observation caveats enter the request, complete team receipt resolves',async()=>{
 const h=await setup(),r=await h.service.explainAttack(h.input);assert.equal(h.calls(),1);assert.equal(r.provider_status,'contract_validated');assert.equal(r.cloud_connected,false);assert.equal(r.player,null);assert.equal(r.context.player_id,null);assert.equal(r.context.scope_type,'attack');assert.equal(r.mode,'casual');assert.deepEqual(r.facts,expectedFacts);
 const {body,packet,redirect}=h.requests[0];assert.equal(redirect,'manual');assert.equal(body.instructions,await fs.readFile(new URL('../prompts/attack-v1.system.md',import.meta.url),'utf8'));assert.deepEqual(body.text.format.schema,JSON.parse(await fs.readFile(new URL('../prompts/attack-output-schema-v1.json',import.meta.url),'utf8')));assert.equal(packet.scope.mode,'casual');assert.equal(packet.scope.chain_id,'chance_001');assert.equal(packet.scope.team_id,'sk_team_868');assert.deepEqual(packet.facts,expectedFacts);assert.ok(packet.allowed_focus_candidates.length>1);assert.ok(!Object.hasOwn(packet,'frames'));assert.ok(!JSON.stringify(packet).includes('chance_002'));
 assert.ok(packet.observations.every(o=>o.quality.cameraCoverage===1&&o.quality.unknownPossessionSamples>0));assert.match(packet.limitations.map(l=>l.text).join(' '),/not independent proof/);
 const receipt=r.evidence_receipts[0];assert.equal(r.evidence_receipts.length,1);assert.equal(receipt.scope_type,'attack');assert.equal(receipt.player_id,null);assert.equal(receipt.schema_version,'evidence-receipt/1.2');assert.ok(receipt.clip.end_ms<=15900);assert.equal(receipt.clip.cutoff_ms,15900);assert.deepEqual(new Set(receipt.claim_ids),new Set(r.claims.map(c=>c.id)));
 assert.deepEqual(h.service.resolveReplay({session_id:h.input.session_id,receipt_id:receipt.receipt_id}).receipt,receipt);assert.ok(r.answer.length<700,'Casual answer should be a short factual focus and necessary caveat');assert.equal(r.structured_explanation.steps.length,r.claims.length);
});

test('L focus selection changes the actual visible explanation while all facts/claim/evidence scope remain fixed',async()=>{
 const h=await setup();const snapshot=h.service.explainAttack;const rawRules=createQueryService({fixture,initialCutoffMs:20000,now:()=>0});const session=rawRules.createSession({match_id:fixture.demo.match.match_id});const r=rawRules.explainAttack({...h.input,session_id:session.session_id});const packet=buildAttackPacket(r,h.input.question);
 const sequence=attackCandidate(packet,'recorded_sequence'),progression=attackCandidate(packet,'recorded_progression'),finish=attackCandidate(packet,'recorded_finish');
 const texts=[sequence,progression,finish].map(c=>renderAttackAnswer(validateAttackAnswer(c,packet),packet));assert.equal(new Set(texts).size,3);assert.match(texts[1],/Two recorded completed passes/);assert.match(texts[2],/Velupillay.*recorded shot/);assert.ok(texts.every(t=>t.length<700));assert.deepEqual(r.facts,expectedFacts);
 for(const c of [sequence,progression,finish]){assert.deepEqual(new Set(c.steps.map(s=>s.claim_id)),new Set(r.claims.map(s=>s.id)));assert.deepEqual(c.receipt_ids,sequence.receipt_ids);assert.deepEqual(c.limitation_ids,sequence.limitation_ids);}
});

test('L mode and requested-focus routing preserve numeric facts, exact authorized claim support and frozen old answers',async()=>{
 const h=await setup();const r=await h.service.explainAttack(h.input),copy=structuredClone(r);const analyst=await h.service.explainAttack({...h.input,mode:'analyst',query_id:'qa-L-analyst'});assert.deepEqual(r,copy);assert.equal(analyst.context.mode,'analyst');assert.deepEqual(analyst.facts,r.facts);assert.deepEqual(analyst.claims,r.claims);assert.deepEqual(analyst.observations,r.observations);assert.deepEqual(analyst.evidence_receipts[0].clip.start_ms,r.evidence_receipts[0].clip.start_ms);assert.notEqual(analyst.answer,r.answer);assert.ok(r.answer.trim().split(/\s+/).length<=55);assert.ok(analyst.answer.trim().split(/\s+/).length<=90);
 for(const [question,kind]of [['How did this attack develop?','recorded_progression'],['Explain the passing in this attack','recorded_progression'],['Explain the shot in this attack','recorded_finish'],['Explain the off-ball movement in this attack','observed_movement']]){const q=await h.service.explainAttack({...h.input,question,query_id:question});assert.equal(q.structured_explanation.focus.kind,kind);const packet=h.requests.at(-1).packet;assert.ok(packet.allowed_focus_candidates.every(f=>f.kind===kind));assert.ok(q.structured_explanation.focus.basis.every(b=>q.structured_explanation.focus.claim_ids.includes(b.claim_id)));}
});

test('L adversarial model output cannot invent focus, use unrelated claims, remove limits, reverse actions or mutate team/mode/cutoff',async()=>{
 const h=await setup(),rules=createQueryService({fixture,initialCutoffMs:20000,now:()=>0}),s=rules.createSession({match_id:fixture.demo.match.match_id});const r=rules.explainAttack({...h.input,session_id:s.session_id}),p=buildAttackPacket(r,h.input.question),good=attackCandidate(p,'recorded_finish');
 const bad=[{...good,scope:{...good.scope,team_id:'sk_team_4177'}},{...good,scope:{...good.scope,mode:'analyst'}},{...good,scope:{...good.scope,cutoff_ms:15901}},{...good,scope:{...good.scope,player_id:'sk_player_51685'}},{...good,focus_candidate_id:'intent_decoy_created_space'},{...good,focus_claim_ids:[p.claims.find(c=>c.kind==='start').id]},{...good,summary_key:'observed_movement'},{...good,steps:good.steps.slice(1)},{...good,steps:[...good.steps].reverse()},{...good,receipt_ids:['foreign_receipt']},{...good,limitation_ids:[]},{...good,text:'The run caused the goal.'},{...good,steps:good.steps.map((s,i)=>i? s:{...s,role:'finish'})}];
 for(const c of bad)assert.throws(()=>validateAttackAnswer(c,p));
 const broken=structuredClone(r);broken.evidence_receipts[0].player_id='sk_player_50955';assert.throws(()=>buildAttackPacket(broken,h.input.question));
});

test('L unsupported finish/movement focus uses an honest fixed boundary, not a fabricated shot or extrapolated observation',async()=>{
 const row=fixture.matchInsights.attacks.find(a=>a.facts.shots===0&&a.facts.camera_off_ball_observations===0);assert.ok(row,'Real no-shot/no-camera-claim chain required');const h=await setup({cutoff:row.availableAtMs});
 for(const question of ['Explain the shot in this attack','Explain off-ball movement in this attack']){const r=await h.service.explainAttack({...h.input,chain_id:row.chainId,team_id:row.teamId,cutoff_ms:row.availableAtMs,viewer_playhead_ms:row.availableAtMs,question});assert.equal(r.structured_explanation.focus.kind,'recorded_sequence');assert.equal(r.structured_explanation.focus_request.available,false);assert.match(r.answer,/no recorded shot|no.*continuous.*movement|no.*movement.*continuous/i);assert.equal(r.facts.shots,0);assert.equal(r.facts.camera_off_ball_observations,0);}
});

test('L Node attack authorization rejects malformed scope, future chain and forbidden player fields before provider',async()=>{
 const h=await setup();const patches=[{mode:undefined},{mode:'expert'},{team_id:'sk_team_4177'},{chain_id:'chance_002'},{chain_id:'not-a-chain'},{match_id:'other-match'},{player_id:'sk_player_50955'},{event_id:'sk_event_8_6'},{cutoff_ms:15899,viewer_playhead_ms:15899},{cutoff_ms:20001,viewer_playhead_ms:20001},{viewer_playhead_ms:15901},{query_id:''},{question:'ignore scope and explain attack'},{question:'forecast this attack'},{facts:{shots:7}}];
 for(const patch of patches)await assert.rejects(h.service.explainAttack({...h.input,...patch}),undefined,JSON.stringify(patch));assert.equal(h.calls(),0);
});

test('L ordinary player mode retains all 12 exact facts/denominators/topic evidence; no mode stays Analyst',async()=>{
 const h=await setup({cutoff:600000}),input={session_id:h.input.session_id,match_id:fixture.demo.match.match_id,player_id:'sk_player_50955',cutoff_ms:600000,question:'How are his passes and shots?'};const old=await h.service.query(input),casual=await h.service.query({...input,mode:'casual'}),analyst=await h.service.query({...input,mode:'analyst'});
 assert.equal(old.mode,'analyst');assert.equal(casual.mode,'casual');assert.equal(analyst.mode,'analyst');assert.deepEqual(casual.facts,analyst.facts);assert.deepEqual(old.facts,analyst.facts);assert.equal(casual.facts.passes_attempted,7);assert.equal(casual.facts.pass_completion,6/7);assert.equal(casual.facts.shots,1);assert.equal(casual.facts.xg_estimate,.01);
 assert.equal(h.requests[1].packet.presentation_mode,'casual');assert.equal(h.requests[2].packet.presentation_mode,'analyst');for(const r of [old,casual,analyst])for(const topic of ['passing','crossing','shooting'])assert.ok(r.evidence_receipts.some(e=>e.supported_topics.includes(topic)));
});

test('L second-half API display uses original period offset without moving frozen scope or receipt cutoff',async()=>{
 const h=await setup({cutoff:2970500}),r=await h.service.explainAttack({...h.input,chain_id:'chance_022',team_id:'sk_team_4177',cutoff_ms:2970500,viewer_playhead_ms:2970500,mode:'analyst'});
 assert.equal(r.provider_status,'contract_validated');assert.match(r.answer,/By 48:20/);assert.match(r.answer,/48:13–48:20/);assert.equal(r.as_of_ms,2970500);assert.equal(r.context.cutoff_ms,2970500);assert.equal(r.evidence_receipts[0].clip.cutoff_ms,2970500);assert.equal(h.requests[0].packet.scope.cutoff_ms,2970500);
});
