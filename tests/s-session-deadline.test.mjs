import test from 'node:test';
import assert from 'node:assert/strict';
import {createAssistantApi} from '../public/assistant-api.js';
import {createQueryService} from '../backend/query-service.mjs';
import {loadSkillCornerFixture} from '../backend/server.mjs';
const fixture=await loadSkillCornerFixture(),match=fixture.demo.match.match_id;
const json=value=>new Response(JSON.stringify(value),{headers:{'content-type':'application/json'}});
function delayed(value,ms,signal){return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve(json(value));},ms);function abort(){clearTimeout(timer);reject(new DOMException('Local controlled abort','AbortError'));}signal.addEventListener('abort',abort,{once:true});if(signal.aborted)abort();});}
function setup(delay){const service=createQueryService({fixture,initialCutoffMs:600000,now:()=>100000}),session=service.createSession({match_id:match}),posts=[];const api=createAssistantApi({matchId:match,fetchImpl:async(path,options)=>{
 if(path==='/api/health')return json({status:'ok',model_configured:false});
 if(path==='/api/sessions')return json(session);
 if(path.startsWith('/api/sessions/'))return delayed(session,delay,options.signal);
 if(path==='/api/assistant/query'){const input=JSON.parse(options.body);posts.push(input);return json(await service.query(input));}
 throw Error('Unexpected local contract path '+path);
 }});return{api,posts,session};}
test('S session readiness: 2.5s read survives bounded6s; one POST retains original actor/mode/cutoff while current view changes', {timeout:10000},async()=>{
 const h=setup(2500);await h.api.connect();
 const view={selectedPlayerId:'sk_player_50955',selectedEventId:null,selectedChainId:null,cutoffMs:600000,queryId:'s-delayed-frozen',mode:'casual'};
 // The app's send contract passes a frozen snapshot; subsequent current-view
 // changes are independent. Do not mutate the submitted context to invent a bug.
 const frozen=Object.freeze({...view}),start=Date.now(),pending=h.api.query('How are his passes?',frozen);
 Object.assign(view,{selectedPlayerId:'sk_player_11885',cutoffMs:700000,mode:'analyst'});
 const r=await pending;assert.ok(Date.now()-start>=2400);assert.equal(h.posts.length,1);
 assert.deepEqual(h.posts[0],{session_id:h.session.session_id,match_id:match,player_id:'sk_player_50955',cutoff_ms:600000,viewer_playhead_ms:600000,question:'How are his passes?',event_id:null,chain_id:null,query_id:'s-delayed-frozen',mode:'casual'});
 assert.equal(r.answer.context.player_id,'sk_player_50955');assert.equal(r.answer.mode,'casual');assert.equal(r.answer.as_of_ms,600000);assert.deepEqual(r.answer.facts,{passes_attempted:7,passes_completed:6,pass_outcomes_known:7,pass_completion:6/7});assert.equal(r.answer.provider,'rules');assert.equal(r.answer.cloud_connected,false);
});
test('S session readiness: read beyond6s aborts without assistant POST or automatic resend', {timeout:10000},async()=>{
 const h=setup(7000);await h.api.connect();const start=Date.now();
 await assert.rejects(h.api.query('How are his passes?',Object.freeze({selectedPlayerId:'sk_player_50955',selectedEventId:null,selectedChainId:null,cutoffMs:600000,queryId:'s-delayed-timeout',mode:'casual'})),e=>e.code==='timeout');
 const elapsed=Date.now()-start;assert.ok(elapsed>=5900&&elapsed<8000,`Expected bounded6s session deadline, observed${elapsed}ms`);assert.equal(h.posts.length,0);
});
