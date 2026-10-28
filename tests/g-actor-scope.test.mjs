import test from 'node:test';
import assert from 'node:assert/strict';
import {createQueryService} from '../backend/query-service.mjs';
import {createAssistantService} from '../backend/assistant-service.mjs';
import {loadPromptBundle} from '../backend/prompt-contract.mjs';
import {G_FIXTURE} from './g-acceptance-fixtures.mjs';

const bundle=await loadPromptBundle();
function setup(){
  const fixture=structuredClone(G_FIXTURE);
  fixture.demo.players=[
    {id:'selected',name:'N. Velupillay',fullName:'Nishan Velupillay',teamId:'home',position:'RW',number:7},
    {id:'other',name:'B. Hamill',fullName:'Brendan Hamill',teamId:'home',position:'CB',number:4},
    {id:'twin',name:'J. Velupillay',fullName:'Jordan Velupillay',teamId:'home',position:'CF',number:9},
  ];
  let calls=0,id=0;
  const rules=createQueryService({fixture,initialCutoffMs:2000,now:()=>0,idFactory:()=>String(++id)});
  const service=createAssistantService({rulesService:rules,promptBundle:bundle,provider:{generate:async()=>{calls++;throw new Error('QA contract sentinel; no real model');}}});
  const session=service.createSession({match_id:'qa-g'});
  return {service,calls:()=>calls,input:{session_id:session.session_id,match_id:'qa-g',player_id:'selected',cutoff_ms:2000,viewer_playhead_ms:2000}};
}

test('G actor: explicit other full or display name declines before a provider attempt, case insensitive',async()=>{
  const h=setup();
  for(const question of ["How are Brendan Hamill's passes?","How are B. Hamill's passes?","How are b. HAMILL's crosses?"]){
    const r=await h.service.query({...h.input,question});
    assert.notEqual(r.answerability.status,'supported',question);assert.doesNotMatch(r.answer,/please ask|ask instead|please choose|clarif|select.*send|\?/i);assert.match(r.answer,/Selected player: N\. Velupillay, through 00:02/);assert.deepEqual(r.facts,{});assert.deepEqual(r.evidence_receipts,[]);assert.equal(r.cloud_connected,false);
  }
  assert.equal(h.calls(),0);assert.equal(h.service.getHealth().model_call_attempts,0);
});

test('G actor: selected full/display name remains selected and supplies the same known-outcome denominator',async()=>{
  const h=setup();
  for(const question of ["How are Nishan Velupillay's passes?","How are n. VELUPILLAY's passes?"]){
    const r=await h.service.query({...h.input,question});assert.equal(r.answerability.status,'supported',question);assert.equal(r.player.player_id,'selected');assert.equal(r.facts.passes_attempted,4);assert.equal(r.facts.pass_outcomes_known,3);assert.equal(r.facts.pass_completion,2/3);
  }
  assert.equal(h.calls(),2);
});

test('G actor: ambiguous surname cannot silently select one roster member and multi-entity questions decline',async()=>{
  const h=setup();
  for(const question of ["How are Velupillay's passes?","How are Nishan Velupillay and Brendan Hamill passing?","Compare N. Velupillay's passes with B. Hamill's."]){const r=await h.service.query({...h.input,question});assert.notEqual(r.answerability.status,'supported',question);assert.doesNotMatch(r.answer,/please ask|ask instead|please choose|clarif|select.*send|\?/i);assert.match(r.answer,/Selected player: N\. Velupillay, through 00:02/);assert.deepEqual(r.facts,{});}
  assert.equal(h.calls(),0);
});

test('G actor: roster matching observes word boundaries instead of matching an unrelated surname prefix',async()=>{
  const fixture=structuredClone(G_FIXTURE);
  fixture.demo.players[0].name='A. Hamillton';fixture.demo.players[0].fullName='Alex Hamillton';
  fixture.demo.players[1].name='B. Hamill';fixture.demo.players[1].fullName='Brendan Hamill';
  let id=0;const rules=createQueryService({fixture,initialCutoffMs:2000,now:()=>0,idFactory:()=>String(++id)}),session=rules.createSession({match_id:'qa-g'});
  for(const question of ["How are Alex Hamillton's passes?","How are A. Hamillton's passes?"]){const r=rules.query({session_id:session.session_id,match_id:'qa-g',player_id:'selected',cutoff_ms:2000,question});assert.equal(r.answerability.status,'supported',question);assert.equal(r.facts.passes_attempted,4);}
});
