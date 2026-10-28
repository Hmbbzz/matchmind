import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {advanceStateCandidate} from '../scripts/lib/tactical-continuity.mjs';
import {eventAvailableAtMs,eventVisibleAt,eventInWindow,normalizeEventForAnalysis} from '../scripts/lib/analysis-contract.mjs';

// Independent hand-authored oracle: three consecutive B samples must follow each break.
const blank=()=>({current:null,currentFeature:null,candidate:null,candidateSince:null,candidateCount:0,lastAtMs:null});
const observation=(atMs,state='A',extra={})=>({atMs,status:'available',primaryState:state,confidence:.8,feature:{label:state,atMs},...extra});
const opts={stepMs:10000,requiredSamples:3,minConfidence:.38};
function advance(machine,obs,options=opts){return advanceStateCandidate(machine,obs,options);}
function initialized(){return advance(blank(),observation(0)).machine;}

test('F analysis: macro confirmation needs exactly twelve consecutive ten-second observations',()=>{
 let machine=initialized(); const options={...opts,requiredSamples:12};let r;
 for(let n=1;n<=11;n++){r=advance(machine,observation(n*10000,'B'),options);machine=r.machine;assert.equal(r.transition,null);assert.equal(r.confirmedState,'A');}
 r=advance(machine,observation(120000,'B'),options);
 assert.equal(r.transition.fromState,'A');assert.equal(r.transition.toState,'B');assert.equal(r.transition.effectiveFromMs,10000);assert.equal(r.transition.detectedAtMs,120000);
});

test('F analysis: insufficient, low confidence and another state each break a pending run',()=>{
 for(const interruption of [{status:'insufficient_data',primaryState:null,confidence:0},{confidence:.379},{primaryState:'C'}]){
  let m=initialized();m=advance(m,observation(10000,'B')).machine;m=advance(m,observation(20000,'B')).machine;
  const interrupted=advance(m,observation(30000,'B',interruption));assert.equal(interrupted.transition,null);m=interrupted.machine;
  for(const t of [40000,50000]){const r=advance(m,observation(t,'B'));assert.equal(r.transition,null);assert.equal(r.confirmedState,'A');m=r.machine;}
  const r=advance(m,observation(60000,'B'));assert.equal(r.transition.toState,'B');assert.equal(r.transition.effectiveFromMs,40000);assert.equal(r.transition.detectedAtMs,60000);
 }
});

test('F analysis: a missing ten-second tick cannot count as continuity or alter the caller machine',()=>{
 const first=advance(initialized(),observation(10000,'B')).machine;const frozen=structuredClone(first);
 const gap=advance(first,observation(30000,'B'));assert.deepEqual(first,frozen);assert.equal(gap.transition,null);
 const two=advance(gap.machine,observation(40000,'B'));assert.equal(two.transition,null);
 const three=advance(two.machine,observation(50000,'B'));assert.equal(three.transition.effectiveFromMs,30000);assert.equal(three.transition.detectedAtMs,50000);
});

test('F analysis: event visibility waits for completion and explicit publication, with exact inclusive cutoff',()=>{
 const e={id:'delayed',t:1000,q:{endMs:1200},available_at_ms:1500};
 assert.equal(eventAvailableAtMs(e),1500);assert.equal(eventVisibleAt(e,1499),false);assert.equal(eventVisibleAt(e,1500),true);
 assert.equal(eventInWindow(e,0,1200),false);assert.equal(eventInWindow(e,0,1500),true);
 assert.equal(eventInWindow(e,1000,1500),false);assert.equal(eventInWindow(e,1500,2000),false);
 assert.equal(eventInWindow({t:1500,q:{endMs:1500}},0,1500),true);
});

test('F analysis: opposing attack directions have identical normalized advancement and supplier channel',()=>{
 const left={id:'left',x:30,ex:80,ey:2,q:{period:1}},right={id:'right',x:75,ex:25,ey:66,q:{period:2}};
 const source={third_start:'middle_third',third_end:'attacking_third',channel_end:'wide_left'};
 const l=normalizeEventForAnalysis(left,{...source,attacking_side:'left_to_right'}),r=normalizeEventForAnalysis(right,{...source,attacking_side:'right_to_left'});
 for(const row of [l,r]){assert.equal(row.startX,30);assert.equal(row.endX,80);assert.equal(row.thirdEnd,'attacking_third');assert.equal(row.channelEnd,'wide_left');}
 assert.equal(normalizeEventForAnalysis(left,{}).startX,null);
});

test('F analysis: real Auckland pass sk_event_8_19 reaches attacking third while moving toward world left',async()=>{
 const demo=JSON.parse(await readFile(new URL('../public/data/demo.json',import.meta.url),'utf8'));
 const event=demo.events.find(e=>e.id==='sk_event_8_19');assert.equal(event.team,'sk_team_4177');assert.equal(event.q.period,1);assert.equal(event.ex,18.08);
 // Raw supplier row 8_19: x_start=5.9, target reception x=34.42, third_end=attacking_third, channel_end=wide_left.
 const normalized=normalizeEventForAnalysis(event,{attacking_side:'right_to_left',third_start:'middle_third',third_end:'attacking_third',channel_end:'wide_left'});
 assert.ok(Math.abs(normalized.startX-58.4)<1e-9);assert.ok(Math.abs(normalized.endX-86.92)<1e-9);assert.equal(normalized.channelEnd,'wide_left');
});

test('F analysis: receiver endpoint labels win over the passer release endpoint for real 8_8 and second-half 8_418',async()=>{
 const demo=JSON.parse(await readFile(new URL('../public/data/demo.json',import.meta.url),'utf8'));
 const fixtures=[
  {id:'sk_event_8_8',team:'sk_team_868',period:1,source:{attacking_side:'left_to_right',third_start:'middle_third',third_end:'middle_third',channel_end:'wide_left',player_targeted_x_reception:'-39.91',player_targeted_y_reception:'3.07',player_targeted_third_reception:'defensive_third',player_targeted_channel_reception:'center'},start:44.6,end:12.59,third:'defensive_third',channel:'center'},
  {id:'sk_event_8_418',team:'sk_team_868',period:2,source:{attacking_side:'right_to_left',third_start:'middle_third',third_end:'middle_third',channel_end:'half_space_left',player_targeted_x_reception:'20.08',player_targeted_y_reception:'22.92',player_targeted_third_reception:'attacking_third',player_targeted_channel_reception:'wide_left'},start:62.66,end:72.58,third:'attacking_third',channel:'wide_left'},
 ];
 for(const f of fixtures){const e=demo.events.find(e=>e.id===f.id);assert.equal(e.team,f.team);assert.equal(e.q.period,f.period);const n=normalizeEventForAnalysis(e,f.source);assert.ok(Math.abs(n.startX-f.start)<1e-9);assert.ok(Math.abs(n.endX-f.end)<1e-9);assert.equal(n.thirdEnd,f.third);assert.equal(n.channelEnd,f.channel);}
});
