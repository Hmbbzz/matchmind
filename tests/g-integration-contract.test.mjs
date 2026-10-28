import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveModelProfile} from '../backend/model-profiles.mjs';
import {readProviderConfig,createResponsesProvider} from '../backend/responses-provider.mjs';
import {createQueryService} from '../backend/query-service.mjs';
import {createConfiguredService,readAllowedOrigins} from '../backend/server.mjs';
import {startLocalApi} from '../backend/launch-local.mjs';
import {createAssistantApi} from '../public/assistant-api.js';
import {G_FIXTURE} from './g-acceptance-fixtures.mjs';

// All configuration and transports in this file are explicit dummy contract inputs.
// No real key, account, endpoint, cloud request or model-quality result is used.
const dummy={MATCHMIND_PROVIDER:'responses',MATCHMIND_ENDPOINT_KIND:'foundry_resource',MATCHMIND_MODEL_ENDPOINT:'https://qa-dummy.services.ai.azure.com',MATCHMIND_MODEL_DEPLOYMENT:'arbitrary-deployment-name',MATCHMIND_MODEL_PROFILE:'gpt-5-mini',MATCHMIND_API_KEY:'not-a-real-key'};
const candidate=p=>({schema_version:'matchmind-answer/2.0',scope:p.scope,topic:p.topic,summary:'Only recorded actions in the frozen snapshot are described.',fact_claims:p.required_fact_keys.map(key=>({key,value:p.facts[key]})),receipt_ids:p.evidence.map(e=>e.receipt_id)});
const reply=c=>new Response(JSON.stringify({status:'completed',usage:{input_tokens:1,output_tokens:2,total_tokens:3},output:[{type:'message',role:'assistant',content:[{type:'output_text',text:JSON.stringify(c)}]}]}),{headers:{'content-type':'application/json'}});

test('G profile: explicit GPT-5 mini uses minimal effort and preserves the bounded Terra profile',()=>{
  assert.deepEqual(resolveModelProfile({profile:'gpt-5-mini'}),{modelProfile:'gpt-5-mini',reasoningEffort:'minimal'});
  assert.deepEqual(resolveModelProfile({profile:'gpt-5.6-terra'}),{modelProfile:'gpt-5.6-terra',reasoningEffort:'none'});
  for(const effort of ['none','low','medium'])assert.throws(()=>resolveModelProfile({profile:'gpt-5-mini',reasoningEffort:effort}));
  assert.throws(()=>resolveModelProfile({profile:'unknown'}));
  const config=readProviderConfig(dummy);assert.equal(config.deployment,'arbitrary-deployment-name');assert.equal(config.modelProfile,'gpt-5-mini');assert.equal(config.reasoningEffort,'minimal');assert.equal(config.limits.maxTotalCalls,null);assert.equal(config.limits.maxCallsPerSession,null);assert.equal(config.limits.maxOutputTokens,700);
});

test('G endpoint: Foundry resource root is explicit and does not weaken project bearer or URL boundaries',()=>{
  for(const suffix of ['', '/openai/v1'])assert.equal(readProviderConfig({...dummy,MATCHMIND_MODEL_ENDPOINT:dummy.MATCHMIND_MODEL_ENDPOINT+suffix}).endpoint,'https://qa-dummy.services.ai.azure.com/openai/v1/responses');
  assert.throws(()=>readProviderConfig({...dummy,MATCHMIND_AUTH_MODE:'bearer',MATCHMIND_ACCESS_TOKEN:'not-real'}));
  assert.throws(()=>readProviderConfig({...dummy,MATCHMIND_ENDPOINT_KIND:'foundry_project',MATCHMIND_MODEL_ENDPOINT:dummy.MATCHMIND_MODEL_ENDPOINT+'/api/projects/p',MATCHMIND_AUTH_MODE:'api_key'}));
  for(const url of ['https://qa-dummy.services.ai.azure.com.evil.test','http://qa-dummy.services.ai.azure.com','https://qa-dummy.services.ai.azure.com:444','https://qa-dummy.services.ai.azure.com/api/projects/p','https://qa-dummy.services.ai.azure.com/?key=x'])assert.throws(()=>readProviderConfig({...dummy,MATCHMIND_MODEL_ENDPOINT:url}));
  const p=createResponsesProvider({config:readProviderConfig(dummy),fetchImpl:()=>{throw new Error('not invoked');}});assert.equal(typeof p.generate,'function');
});

test('G configuration: no environment is inherited implicitly and local origins stay explicit',async()=>{
  const rules=await createConfiguredService({fixture:G_FIXTURE});assert.equal(rules.getHealth().model_configured,false);assert.equal(rules.getHealth().model_call_attempts,0);
  assert.deepEqual(readAllowedOrigins({}),[]);assert.deepEqual(readAllowedOrigins({MATCHMIND_ALLOWED_ORIGINS:'http://127.0.0.1:4173, http://localhost:4173'}),['http://127.0.0.1:4173','http://localhost:4173']);
  for(const origin of ['*','https://example.com','http://127.0.0.1:4173/','http://localhost:4173/path'])assert.throws(()=>readAllowedOrigins({MATCHMIND_ALLOWED_ORIGINS:origin}));
});

test('G local HTTP: trusted offset and explicit CORS reach the minimal contract transport without claiming live cloud',async()=>{
  let calls=0;
  const local=await startLocalApi({env:{...dummy,MATCHMIND_ALLOWED_ORIGINS:'http://127.0.0.1:4173'},port:0,initialCutoffMs:2000,fixture:G_FIXTURE,fetchImpl:async(_url,options)=>{calls++;const body=JSON.parse(options.body);assert.equal(body.reasoning.effort,'minimal');assert.equal(body.max_output_tokens,700);assert.equal(options.headers['api-key'],'not-a-real-key');assert.ok(!Object.hasOwn(options.headers,'authorization'));const packet=JSON.parse(body.input[0].content[0].text).frozen_fact_packet;assert.equal(packet.facts.pass_outcomes_known,3);assert.ok(!JSON.stringify(packet).includes('future-cross'));return reply(candidate(packet));}});
  try{
    const preflight=await fetch(local.address+'/api/assistant/query',{method:'OPTIONS',headers:{origin:'http://127.0.0.1:4173','access-control-request-method':'POST','access-control-request-headers':'content-type'}});assert.equal(preflight.status,204);assert.equal(preflight.headers.get('access-control-allow-origin'),'http://127.0.0.1:4173');
    const denied=await fetch(local.address+'/api/health',{headers:{origin:'https://evil.example'}});assert.equal(denied.status,403);
    const session=await(await fetch(local.address+'/api/sessions',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({match_id:'qa-g'})})).json();assert.ok(session.visible_cutoff_ms>=2000);
    const r=await(await fetch(local.address+'/api/assistant/query',{method:'POST',headers:{origin:'http://127.0.0.1:4173','content-type':'application/json'},body:JSON.stringify({session_id:session.session_id,match_id:'qa-g',player_id:'selected',cutoff_ms:2000,question:'How are his passes?'})})).json();
    assert.equal(calls,1);assert.equal(r.provider,'responses_contract');assert.equal(r.provider_status,'contract_validated');assert.equal(r.cloud_connected,false);assert.equal(r.model_profile,'gpt-5-mini');assert.equal(r.reasoning_effort,'minimal');assert.doesNotMatch(JSON.stringify(r),/not-a-real-key|qa-dummy\.services/);
  }finally{await local.close();}
});

function browserContract(mutate=x=>x){
  let n=0;const rules=createQueryService({fixture:G_FIXTURE,initialCutoffMs:2000,now:()=>0,idFactory:()=>String(++n)});
  return createAssistantApi({matchId:'qa-g',pageLocation:{protocol:'http:',hostname:'127.0.0.1'},fetchImpl:async(url,options)=>{
    assert.equal(options.credentials,'same-origin');
    const path=new URL(url,'http://127.0.0.1:4173').pathname,input=options.body?JSON.parse(options.body):null;let value;
    if(path==='/api/health')value={status:'ok',model_configured:true,model_profile:'gpt-5-mini',cloud_connected:true};
    else if(path==='/api/sessions')value=rules.createSession(input);
    else if(path.startsWith('/api/sessions/'))value=rules.getSessionState({session_id:path.split('/').at(-1)});
    else if(path==='/api/assistant/query'){const r=rules.query(input);value=mutate({...r,provider:'foundry_resource_responses',provider_status:'model_validated',cloud_connected:true,model_profile:'gpt-5-mini',model_used_receipt_ids:r.evidence_receipts.map(e=>e.receipt_id)});}
    else throw new Error('Unexpected contract route');
    return new Response(JSON.stringify(value),{headers:{'content-type':'application/json'}});
  }});
}
const context={selectedPlayerId:'selected',cutoffMs:2000,selectedEventId:null,selectedChainId:null,queryId:'web-g-contract'};

test('G browser wire contract: Foundry resource provider is accepted while health configuration remains ready',async()=>{
  const api=browserContract();await api.connect();assert.equal(api.getState().phase,'ready');assert.equal(api.getState().modelProfile,'gpt-5-mini');
  const r=await api.query('How are his passes?',context);assert.equal(r.answer.provider,'foundry_resource_responses');assert.equal(r.answer.facts.pass_completion,2/3);
});

test('G browser wire contract: wrong actor, cutoff, profile or provider cannot be presented as a verified answer',async()=>{
  for(const mutate of [r=>({...r,player:{...r.player,player_id:'other'}}),r=>({...r,as_of_ms:2001}),r=>({...r,model_profile:'gpt-5.6-terra'}),r=>({...r,provider:'arbitrary_provider'}),r=>({...r,model_used_receipt_ids:['invented']})]){
    const api=browserContract(mutate);await assert.rejects(api.query('How are his passes?',context),e=>e.code==='invalid_response');
  }
});

test('G provenance contract: safe identifiers come from upstream JSON/headers, with no configuration echo when absent',async()=>{
  for(const mode of ['present','absent','invalid','credential-reflection','incomplete']){
    const service=await createConfiguredService({env:dummy,fixture:G_FIXTURE,initialCutoffMs:2000,fetchImpl:async(_url,options)=>{
      const packet=JSON.parse(JSON.parse(options.body).input[0].content[0].text).frozen_fact_packet;
      const body={status:'completed',output:[{type:'message',role:'assistant',content:[{type:'output_text',text:JSON.stringify(candidate(packet))}]}]};
      let headers={'content-type':'application/json'};
      if(mode==='present'||mode==='incomplete'){body.model='gpt-5-mini-2025-08-07';body.id='resp_qa_source';headers['apim-request-id']='qa-upstream-request-123';}
      if(mode==='invalid'){body.model='https://private.example/resource';body.id='not-a-response-id';headers['x-request-id']='private request text';headers['x-private']='must-not-leak';}
      if(mode==='credential-reflection'){body.model=dummy.MATCHMIND_API_KEY;body.id='resp_'+dummy.MATCHMIND_API_KEY;headers['x-request-id']=dummy.MATCHMIND_API_KEY;}
      if(mode==='incomplete'){body.status='incomplete';body.incomplete_details={reason:'max_output_tokens'};body.usage={input_tokens:3,output_tokens:700,total_tokens:703,output_tokens_details:{reasoning_tokens:700}};body.output=[];}
      return new Response(JSON.stringify(body),{headers});
    }});
    const session=service.createSession({match_id:'qa-g'}),r=await service.query({session_id:session.session_id,match_id:'qa-g',player_id:'selected',cutoff_ms:2000,question:'How are his passes?'}),d=r.model_diagnostics;
    assert.equal(r.cloud_connected,false,'Controlled transport must never count as live inference');
    if(mode==='present'||mode==='incomplete'){assert.equal(d.upstream_model,'gpt-5-mini-2025-08-07');assert.equal(d.response_id,'resp_qa_source');assert.equal(d.request_id,'qa-upstream-request-123');}
    else for(const key of ['upstream_model','response_id','request_id'])assert.ok(!Object.hasOwn(d,key),`${mode}: no unsafe or fabricated ${key}`);
    if(mode==='incomplete'){assert.equal(r.provider_status,'fallback_output_budget_exhausted');assert.equal(r.model_usage.reasoning_tokens,700);assert.equal(d.response_status,'incomplete');assert.ok(!r.model_output);}
    assert.doesNotMatch(JSON.stringify(r),/not-a-real-key|private\.example|must-not-leak|arbitrary-deployment-name/);
  }
});

test('G2 display: readable clock/percentage retains exact facts and candidate while scope refusal states only this question path',async()=>{
  let calls=0;
  const service=await createConfiguredService({env:dummy,fixture:G_FIXTURE,initialCutoffMs:2000,fetchImpl:async(_url,options)=>{calls++;const packet=JSON.parse(JSON.parse(options.body).input[0].content[0].text).frozen_fact_packet;return reply(candidate(packet));}});
  const session=service.createSession({match_id:'qa-g'}),input={session_id:session.session_id,match_id:'qa-g',player_id:'selected',cutoff_ms:2000,question:'How are his passes?'};
  const accepted=await service.query(input);
  assert.equal(accepted.facts.pass_completion,2/3);assert.equal(accepted.model_output.fact_claims.find(x=>x.key==='pass_completion').value,2/3);
  assert.match(accepted.answer,/By 00:02/);assert.match(accepted.answer,/2\/4 passes completed; completion 66\.7% \(3 known outcomes\)/);assert.doesNotMatch(accepted.answer,/2000 ms|0\.666666/);
  const refused=await service.query({...input,question:'Is he tired?'});
  assert.equal(calls,1);assert.equal(service.getHealth().model_call_attempts,1);assert.equal(refused.cloud_connected,false);assert.equal(refused.provider_status,'scope_unsupported');assert.match(refused.limitations.join(' '),/No model was called for this question/);assert.doesNotMatch(refused.limitations.join(' '),/No language model or Microsoft cloud service is connected/);
  const zero=await service.query({...input,cutoff_ms:0,question:'How are his crosses?'});assert.equal(zero.facts.cross_completion,null);assert.match(zero.answer,/unavailable/);assert.doesNotMatch(zero.answer,/0\.0%/);
});
