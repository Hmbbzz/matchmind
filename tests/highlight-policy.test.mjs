import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildShotHighlights,HIGHLIGHT_POLICY,HIGHLIGHT_CONTRACT_VERSION,HIGHLIGHT_POLICY_VERSION} from '../scripts/lib/shot-highlights.mjs';

const matchId='qa-match';
const shot=(id,t,end=t,xg=.01)=>({id,type:'shot',t,team:'home',player:'p1',outcome:'saved',q:{endMs:end,xg}});
const select=(rows,cutoffMs=Infinity)=>buildShotHighlights(rows,{matchId,cutoffMs});
test('all shot quality levels are retained, no top N selection',()=>{
  const rows=Array.from({length:50},(_,i)=>shot(`s${i}`,i*100,i*100,i===49?.99:0));
  rows[2].q.xg=null;delete rows[3].q.xg;
  const actual=select(rows);assert.equal(actual.length,50);assert.deepEqual(new Set(actual.map(h=>h.anchor_event_id)),new Set(rows.map(e=>e.id)));
  for(const h of actual){assert.equal(h.contract_version,HIGHLIGHT_CONTRACT_VERSION);assert.equal(h.policy_version,HIGHLIGHT_POLICY_VERSION);}
  assert.match(HIGHLIGHT_POLICY.availabilityMode,/simulat/);
});
test('any appended future suffix cannot alter the published prefix',()=>{
  const base=[shot('s0',0),shot('s1',100,200),shot('s2',300,800),{id:'p1',type:'pass',t:50}];
  for(const cutoff of [0,99,100,199,200,299,300,799,800,1000]){
    const known=base.filter(e=>Math.max(e.t,e.q?.endMs??e.t)<=cutoff);
    const suffix=Array.from({length:100},(_,i)=>({...shot(`future${i}`,cutoff+1+i*100,cutoff+9+i*100,1),outcome:i%2?'goal':'saved'}));
    assert.deepEqual(select(base,cutoff),select(known,cutoff),`prefix at ${cutoff}`);
    assert.deepEqual(select([...base,...suffix],cutoff),select(base,cutoff),`suffix at ${cutoff}`);
  }
});
test('availability waits for completion and includes exact boundary, including t=0',()=>{
  const row=shot('delayed',1000,2000);
  assert.equal(select([row],1999).length,0);assert.equal(select([row],2000).length,1);
  assert.equal(select([shot('zero',0)],0).length,1);
  assert.equal(select([shot('early-end',1000,900)],999).length,0);
  assert.equal(select([shot('early-end',1000,900)],1000)[0].available_at_ms,1000);
  assert.equal(select([{id:'missing-q',type:'shot',t:5}],5)[0].available_at_ms,5);
});
test('same-time input permutations produce identical deterministic published records',()=>{
  const rows=[shot('z',100,300),shot('b',300),shot('a',100,300),shot('earlier',0)];
  assert.deepEqual(select(rows),select([...rows].reverse()));assert.deepEqual(select(rows).map(h=>h.anchor_event_id),['earlier','a','b','z']);
});
test('selection never mutates the input payload',()=>{
  const rows=[shot('a',100),shot('b',200)];const original=structuredClone(rows);select(rows,150);assert.deepEqual(rows,original);
});
test('invalid timestamp and identity fields fail explicitly',()=>{
  for(const bad of [NaN,Infinity,-1,'100',null]){assert.throws(()=>select([shot('a',bad)]),TypeError);if(bad!==null)assert.throws(()=>select([shot('a',1,bad)]),TypeError);}
  for(const bad of [NaN,-1,'100',null])assert.throws(()=>select([],bad),TypeError);
  assert.throws(()=>buildShotHighlights(null,{matchId}),TypeError);assert.throws(()=>buildShotHighlights([],{matchId:''}),TypeError);
  assert.throws(()=>select([shot('a',1),shot('a',2)]),TypeError);assert.throws(()=>select([{...shot('a',1),id:''}]),TypeError);
  assert.deepEqual(select([null,{type:'pass',t:NaN}]),[]);
});
test('current dataset publishes every completed shot with no duplicate or missing reference',()=>{
  const data=JSON.parse(fs.readFileSync(new URL('../public/data/demo.json',import.meta.url)));
  const actual=buildShotHighlights(data.events,{matchId:data.match.match_id});
  assert.deepEqual(actual,data.highlights);assert.equal(actual.length,data.events.filter(e=>e.type==='shot').length);assert.equal(actual.length,32);
  const bounds=new Set([0,...data.events.filter(e=>e.type==='shot').flatMap(e=>[Math.max(e.t,e.q?.endMs??e.t)-1,Math.max(e.t,e.q?.endMs??e.t)])]);
  for(const cutoff of bounds){assert.deepEqual(buildShotHighlights(data.events,{matchId:data.match.match_id,cutoffMs:cutoff}),actual.filter(h=>h.available_at_ms<=cutoff));}
});
