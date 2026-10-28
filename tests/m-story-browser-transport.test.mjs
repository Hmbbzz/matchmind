import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {loadSkillCornerFixture} from '../backend/server.mjs';
import {buildPlayerStory} from '../public/player-story-core.js';
import {createPlayerStoryApi} from '../public/player-story-ui.js';
const input=await loadSkillCornerFixture(),snapshot=buildPlayerStory(input,{playerId:'sk_player_11885',cutoffMs:15900,mode:'casual'});
const hash=s=>createHash('sha256').update(JSON.stringify(s)).digest('hex');
const envelope=()=>({story_id:'story_private',created_at_ms:1000,snapshot_sha256:hash(snapshot),persistence:'d1',read_only:true,snapshot:structuredClone(snapshot),idempotency:'created',shares:[]});
const json=value=>new Response(JSON.stringify(value),{headers:{'content-type':'application/json'}});
function setup(reply){const calls=[];const api=createPlayerStoryApi({input,getSession:async()=>({session_id:'local-session'}),fetchImpl:async(path,options)=>{calls.push({path,...options,body:options.body?JSON.parse(options.body):undefined});if(path.startsWith('/api/sessions/'))return json({session_id:'local-session',match_id:snapshot.match.match_id,visible_cutoff_ms:15900});return reply?reply(path,options):json(envelope());}});return {api,calls};}

test('M browser transport sends metadata only, accepts only the matching canonical save, and resolves an exact frozen clip',async()=>{
 const h=setup((path,options)=>path==='/api/stories/resolve'?json({clip:snapshot.playlist[0],snapshot_sha256:hash(snapshot),scope:'player_story',read_only:true}):json(envelope()));
 const saved=await h.api.save(snapshot,'same-retry-id');assert.deepEqual(saved.snapshot,snapshot);assert.ok(Object.isFrozen(saved.snapshot));
 const call=h.calls.find(c=>c.path==='/api/stories/save');assert.deepEqual(call.body,{session_id:'local-session',match_id:snapshot.match.match_id,player_id:snapshot.player.player_id,source_version:snapshot.source_version,cutoff_ms:15900,mode:'casual',save_id:'same-retry-id'});assert.ok(h.calls.every(c=>c.credentials==='same-origin'&&c.cache==='no-store'));
 assert.deepEqual(await h.api.resolve({story_id:saved.story_id},snapshot.playlist[0],saved.snapshot_sha256),snapshot.playlist[0]);
});

test('M browser transport rejects mismatched saved scope, hash, invented content and clip substitution instead of claiming saved or replay-ready',async()=>{
 for(const mutate of [r=>r.snapshot.player.player_id='sk_player_50955',r=>r.snapshot.mode='analyst',r=>r.snapshot.cutoff_ms=16000,r=>r.snapshot.chapters[0].narrative+=' fabricated',r=>r.snapshot_sha256='0'.repeat(64),r=>r.persistence='local',r=>r.read_only=false,r=>r.owner_id='leaked-owner']){
  const h=setup(()=>{const r=envelope();mutate(r);return json(r);});await assert.rejects(h.api.save(snapshot,'bad-response'));
 }
 for(const mutate of [r=>r.clip.end_ms++,r=>r.snapshot_sha256='0'.repeat(64),r=>r.scope='full_match',r=>r.read_only=false]){
  const h=setup(()=>{const r={clip:structuredClone(snapshot.playlist[0]),snapshot_sha256:hash(snapshot),scope:'player_story',read_only:true};mutate(r);return json(r);});await assert.rejects(h.api.resolve({story_id:'story_private'},snapshot.playlist[0],hash(snapshot)));
 }
 for(const status of [401,403,404,409,410,429,503])await assert.rejects(setup(()=>new Response('{}',{status})).api.open('story_private'));
 await assert.rejects(setup(()=>{throw new Error('local simulated connection loss');}).api.open('story_private'),e=>e.code==='offline_or_unavailable');
 await assert.rejects(setup(()=>new Response(' '.repeat(1048577),{headers:{'content-type':'application/json'}})).api.open('story_private'),e=>e.code==='invalid_response');
});

test('M browser share validates the exact same-origin fragment capability and rejects malformed or external links',async()=>{
 const previous=globalThis.location;globalThis.location={origin:'https://m-browser-contract.invalid'};
 try{
  const token='A'.repeat(43),reply=()=>({share_id:'share_private',share_token:token,share_url:globalThis.location.origin+'/#story-share='+token,expires_at_ms:604800000});
  const valid=await setup(()=>json(reply())).api.share('story_private');assert.equal(valid.share_token,token);
  for(const mutate of [r=>r.share_url='https://foreign.invalid/#story-share='+token,r=>r.share_url=globalThis.location.origin+'/?share='+token,r=>r.share_token='B'.repeat(32),r=>r.share_token='B'.repeat(44),r=>r.expires_at_ms=-1]){
   const h=setup(()=>{const r=reply();mutate(r);if(r.share_token.length!==43)r.share_url=globalThis.location.origin+'/#story-share='+r.share_token;return json(r);});await assert.rejects(h.api.share('story_private'));
  }
 }finally{if(previous===undefined)delete globalThis.location;else globalThis.location=previous;}
});
