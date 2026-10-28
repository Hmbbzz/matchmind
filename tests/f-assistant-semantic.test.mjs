import test from 'node:test';
import assert from 'node:assert/strict';
import {createQueryService} from '../backend/query-service.mjs';
import {createAssistantService} from '../backend/assistant-service.mjs';
import {loadPromptBundle,buildFactPacket,validateModelAnswer,ANSWER_SCHEMA_VERSION,SAFE_SUMMARIES} from '../backend/prompt-contract.mjs';

const bundle=await loadPromptBundle();
// Hand-authored counts: passing 4 attempts, 2 complete / 3 known; crossing 2 attempts, 1 / 1 known.
const fixture=()=>({sourceVersion:'qa-F-independent/1',demo:{match:{match_id:'m',duration_ms:20000,kickoff:'2025-01-01T00:00:00Z',home_team_id:'h',away_team_id:'a'},teams:[{id:'h',name:'Home'},{id:'a',name:'Away'}],players:[{id:'p',name:'Selected',position:'RW',number:7,teamId:'h'},{id:'other',name:'Other',position:'CF',number:9,teamId:'h'}],events:[
 {id:'own-shot',t:1000,type:'shot',team:'h',player:'p',outcome:'saved',q:{endMs:1200,xg:.25}},
 {id:'cross-known',t:2000,type:'pass',team:'h',player:'p',outcome:'complete',q:{endMs:2100,pass_type:'cross'}},
 {id:'cross-unknown',t:3000,type:'pass',team:'h',player:'p',outcome:'unknown',q:{endMs:3100,pass_type:'cutback',completed:true}},
 {id:'plain-incomplete',t:4000,type:'pass',team:'h',player:'p',outcome:'incomplete',q:{endMs:4100}},
 {id:'plain-complete',t:4200,type:'pass',team:'h',player:'p',outcome:'complete',q:{endMs:4300}},
 {id:'other-shot',t:4400,type:'shot',team:'h',player:'other',outcome:'goal',q:{endMs:4500,xg:.9}},
 {id:'late-shot',t:4600,type:'shot',team:'h',player:'p',outcome:'goal',available_at_ms:8000,q:{endMs:4700,xg:.99}},
]},chanceChains:[]});
function setup({cutoff=5000,provider,maxReceiptsPerSession=200}={}){let n=0;const data=fixture(),rules=createQueryService({fixture:data,initialCutoffMs:cutoff,now:()=>0,idFactory:()=>String(++n),maxReceiptsPerSession});const service=createAssistantService({rulesService:rules,promptBundle:bundle,provider});const session=service.createSession({match_id:'m'});return {service,data,input:{session_id:session.session_id,match_id:'m',player_id:'p',cutoff_ms:cutoff,question:'How are his passes?'}};}

test('F assistant: unsupported questions directly state boundaries without a model call',async()=>{
 let calls=0;const h=setup({provider:{generate:async()=>{calls++;throw new Error('must not invoke');}}});
 for(const question of ['Is he tired?','Compare his passing with the last three matches.','What is the score?','Explain the team pressing shape.']){
  const r=await h.service.query({...h.input,question});assert.match(r.answer,/cannot|not support|unsupported|not provided|available|choose|clarif|one topic|outside.*scope/i,question);
  assert.doesNotMatch(r.answer,/please ask|ask instead|please choose|select.*send|clarif/i);assert.equal(r.cloud_connected,false);assert.equal(r.evidence_receipts.length,0);assert.deepEqual(r.facts,{});
 }
 assert.equal(calls,0);
});

test('F assistant: passing uses known outcomes and returns only passing facts',async()=>{
 const h=setup(),r=await h.service.query(h.input);
 assert.deepEqual(Object.keys(r.facts).sort(),['passes_attempted','passes_completed','pass_outcomes_known','pass_completion'].sort());
 assert.equal(r.facts.passes_attempted,4);assert.equal(r.facts.passes_completed,2);assert.equal(r.facts.pass_outcomes_known,3);assert.equal(r.facts.pass_completion,2/3);
 assert.doesNotMatch(r.answer,/shots:|estimated xG:/i);
});

test('F assistant: crossing unknown outcome is excluded from denominator and every representative anchor is selected-actor crossing',async()=>{
 const h=setup(),r=await h.service.query({...h.input,question:'How are his crosses?'});
 assert.deepEqual(Object.keys(r.facts).sort(),['crosses_attempted','crosses_completed','cross_outcomes_known','cross_completion'].sort());
 assert.equal(r.facts.crosses_attempted,2);assert.equal(r.facts.crosses_completed,1);assert.equal(r.facts.cross_outcomes_known,1);assert.equal(r.facts.cross_completion,1);
 assert.ok(r.evidence_receipts.length>0);
 for(const receipt of r.evidence_receipts){const e=h.data.demo.events.find(e=>e.id===receipt.anchor_event_id);assert.equal(e.player,'p');assert.equal(e.type,'pass');assert.ok(['cross','cutback'].includes(e.q.pass_type));assert.ok(receipt.clip.end_ms<=5000);}
});

test('F assistant: shooting cites the selected actor shot rather than three more recent passes or another actor',async()=>{
 const h=setup(),r=await h.service.query({...h.input,question:'How many shots and estimated xG does he have?'});
 assert.deepEqual(Object.keys(r.facts).sort(),['shots','xg_estimate','xg_samples','xg_missing'].sort());assert.equal(r.facts.shots,1);assert.equal(r.facts.xg_estimate,.25);
 assert.ok(r.evidence_receipts.length>0);assert.ok(r.evidence_receipts.some(e=>e.event_ids.includes('own-shot')));
 for(const receipt of r.evidence_receipts){const e=h.data.demo.events.find(e=>e.id===receipt.anchor_event_id);assert.equal(e.type,'shot');assert.equal(e.player,'p');assert.ok(!receipt.event_ids.includes('late-shot'));}
});

test('F assistant: explicit event of another domain is rejected before the provider and zero attempts keep a missing rate',async()=>{
 let calls=0;const h=setup({provider:{generate:async()=>{calls++;throw new Error('must not invoke');}}});
 await assert.rejects(h.service.query({...h.input,question:'How are his crosses?',event_id:'own-shot'}),e=>e.status===400);assert.equal(calls,0);
 const z=setup({cutoff:0}),r=await z.service.query({...z.input,question:'How are his crosses?'});assert.equal(r.facts.crosses_attempted,0);assert.equal(r.facts.cross_completion,null);assert.equal(r.evidence_receipts.length,0);assert.doesNotMatch(r.answer,/0(?:\.0)?%/);
});

test('F assistant: promised finite player-summary phrases preserve all twelve facts and unknown generic questions decline',async()=>{
 const h=setup();
 for(const question of ['How is he playing?','How has he played?','How is this player doing?']){const r=await h.service.query({...h.input,question});assert.equal(r.answerability.status,'supported',question);assert.equal(r.answerability.topic,'player_summary');assert.equal(Object.keys(r.facts).length,12);assert.equal(r.facts.passes_attempted,4);assert.equal(r.facts.shots,1);}
 const r=await h.service.query({...h.input,question:'Tell me anything interesting.'});assert.equal(r.answerability.status,'unsupported');assert.deepEqual(r.facts,{});
});

const modelCandidate=packet=>({schema_version:ANSWER_SCHEMA_VERSION,scope:{...packet.scope},topic:packet.topic,summary:SAFE_SUMMARIES[0],fact_claims:packet.required_fact_keys.map(key=>({key,value:packet.facts[key]})),receipt_ids:packet.evidence.map(e=>e.receipt_id)});
test('F assistant: prompt contract requires exact topic, all denominators, and representative same-topic evidence',async()=>{
 const h=setup();for(const question of ['How are his passes?','How are his crosses?','How many shots and estimated xG does he have?']){
  const snapshot=await h.service.query({...h.input,question}),packet=buildFactPacket(snapshot,question),good=modelCandidate(packet);
  assert.equal(packet.required_fact_keys.length,4);assert.doesNotThrow(()=>validateModelAnswer(good,packet,question));
  for(const bad of [{...good,topic:'player_summary'},{...good,receipt_ids:[]},{...good,fact_claims:good.fact_claims.slice(1)},{...good,fact_claims:[{key:'shots',value:1}]},{...good,receipt_ids:['unknown']}])assert.throws(()=>validateModelAnswer(bad,packet,question));
 }
 const question='How has he played?',snapshot=await h.service.query({...h.input,question}),packet=buildFactPacket(snapshot,question),good=modelCandidate(packet);
 assert.equal(packet.required_fact_keys.length,12);assert.doesNotThrow(()=>validateModelAnswer(good,packet,question));assert.throws(()=>validateModelAnswer({...good,fact_claims:good.fact_claims.slice(0,11)},packet,question));assert.throws(()=>validateModelAnswer({...good,fact_claims:[...good.fact_claims,good.fact_claims[0]]},packet,question));
});

test('F assistant: player summary needs a representative citation for every nonzero topic, with crossing allowed to cover passing',async()=>{
 const h=setup(),question='How has he played?',snapshot=await h.service.query({...h.input,question});
 for(const topic of ['passing','crossing','shooting'])assert.ok(snapshot.evidence_receipts.some(e=>e.supported_topics.includes(topic)),`Summary omitted ${topic} representative evidence`);
 const packet=buildFactPacket(snapshot,question),good=modelCandidate(packet);assert.doesNotThrow(()=>validateModelAnswer(good,packet,question));
 const onlyCrossing=packet.evidence.find(e=>e.supported_topics.includes('crossing')&&!e.supported_topics.includes('shooting'));assert.ok(onlyCrossing);
 assert.throws(()=>validateModelAnswer({...good,receipt_ids:[onlyCrossing.receipt_id]},packet,question),'Passing/crossing evidence cannot support the summary shot claim');
});

test('F assistant: missing or forged evidence requirements cannot weaken summary packet validation',async()=>{
 const h=setup(),question='How has he played?',snapshot=await h.service.query({...h.input,question}),packet=buildFactPacket(snapshot,question),good=modelCandidate(packet);
 assert.deepEqual(packet.required_evidence_topics,['passing','crossing','shooting']);
 for(const mutate of [s=>delete s.required_evidence_topics,s=>s.required_evidence_topics=['passing'],s=>{s.evidence_receipts=s.evidence_receipts.filter(e=>!e.supported_topics.includes('shooting'));},s=>{s.evidence_receipts[0].topic_event_ids[s.evidence_receipts[0].supported_topics[0]]=['invented-event'];}]){const broken=structuredClone(snapshot);mutate(broken);assert.throws(()=>buildFactPacket(broken,question),TypeError);}
 for(const required_evidence_topics of [undefined,[],['passing']]){const broken=structuredClone(packet);broken.required_evidence_topics=required_evidence_topics;assert.throws(()=>validateModelAnswer(good,broken,question));}
});

test('K assistant: legacy small receipt cache cannot deny complete summary or its immediately returned citations',async()=>{
 let calls=0;const h=setup({maxReceiptsPerSession:1,provider:{generate:async({packet})=>{calls++;return {candidate:modelCandidate(packet)};}}});
 const r=await h.service.query({...h.input,question:'How has he played?'});assert.equal(r.provider_status,'contract_validated');assert.equal(calls,1);assert.equal(Object.keys(r.facts).length,12);
 for(const topic of ['passing','crossing','shooting'])assert.ok(r.evidence_receipts.some(e=>e.supported_topics.includes(topic)));
 for(const receipt of r.evidence_receipts){const resolved=h.service.resolveReplay({session_id:h.input.session_id,receipt_id:receipt.receipt_id});assert.deepEqual(resolved.receipt,receipt);}
});
