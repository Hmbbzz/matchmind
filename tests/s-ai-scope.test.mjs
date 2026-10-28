import test from 'node:test';import assert from 'node:assert/strict';
import{createConfiguredService,loadSkillCornerFixture}from'../backend/server.mjs';
const fixture=await loadSkillCornerFixture();
test('S closes R-RELEVANCE-01: directional/line-breaking questions state the unsupported measure before any configured provider call',async()=>{
 let calls=0;const service=await createConfiguredService({fixture,initialCutoffMs:600000,now:()=>100000,env:{MATCHMIND_PROVIDER:'responses',MATCHMIND_ENDPOINT_KIND:'foundry_resource',MATCHMIND_MODEL_ENDPOINT:'https://s-controlled.services.ai.azure.com',MATCHMIND_MODEL_DEPLOYMENT:'test-only',MATCHMIND_MODEL_PROFILE:'gpt-5-mini',MATCHMIND_API_KEY:'inert-not-a-real-key'},fetchImpl:async()=>{calls++;throw Error('A qualified passing request must not reach provider');}});
 const session=service.createSession({match_id:fixture.demo.match.match_id});let serial=0;
 for(const question of['How many forward passes has he made?','Which pass broke the defensive line?','How many backward passes has he made?']){
  const r=await service.query({session_id:session.session_id,match_id:fixture.demo.match.match_id,player_id:'sk_player_50955',cutoff_ms:600000,viewer_playhead_ms:600000,query_id:`s-qualified-${++serial}`,mode:'casual',question});
  assert.notEqual(r.answerability.status,'supported');assert.deepEqual(r.facts,{});assert.deepEqual(r.evidence_receipts,[]);assert.equal(r.context.player_id,'sk_player_50955');assert.equal(r.as_of_ms,600000);assert.match(r.answer,/direction|line.break|qualified passing/i);assert.match(r.provider_status,/scope_/);assert.equal(r.cloud_connected,false);assert.doesNotMatch(r.answer,/please ask|ask instead|please choose|clarif/i);assert.equal(r.cloud_connected,false);
 }
 assert.equal(calls,0);
});
