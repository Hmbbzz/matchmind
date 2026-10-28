import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {isEarlyContext,asksPerformance,asksShotQuality,sampleContextCopy,observeVisibleCopy,visibleCopy,compactCopy,COPY_LIMITS} from '../public/display-copy.js';
import {projectPlayerQuestion} from '../public/assistant-api.js';

// Independent state-machine fixtures. Real fullscreen/rendering is verified in Chromium.
const root = new URL('../', import.meta.url);
// The browser import is outside this isolated state-machine harness; its wire
// contract and real module loading have separate G/Chromium coverage.
const source = fs.readFileSync(new URL('public/app.js', root), 'utf8').replace(/^import\s+.*\n/gm, '').replace(/\ninit\(\);\s*$/, '\n');
const demo = JSON.parse(fs.readFileSync(new URL('public/data/demo.json', root)));
class Element {
  constructor() { this.children=[];this.dataset={};this.hidden=false;this.style={setProperty(){}};this.attributes={};this.listeners={};this.isConnected=true;const names=new Set();this.classList={add:n=>names.add(n),remove:n=>names.delete(n),contains:n=>names.has(n),toggle:(n,v)=>{if(v??!names.has(n))names.add(n);else names.delete(n);}}; }
  set innerHTML(v){this._html=v;this.children=[];} get innerHTML(){return this._html||'';}
  append(...n){this.children.push(...n);} replaceChildren(...n){this.children=n;}
  setAttribute(k,v){this.attributes[k]=String(v);}getAttribute(k){return this.attributes[k]??null;}
  addEventListener(k,f){this.listeners[k]=f;}focus(){}querySelector(){return new Element();}querySelectorAll(){return [];}
}
function harness({ready=true,playing=false,fullscreen='unsupported'}={}) {
  const ids=new Map(),messages=[],raf=[];let now=100;
  const doc={body:new Element(),activeElement:new Element(),fullscreenElement:null,documentElement:new Element(),createElement:()=>new Element(),addEventListener(){},getElementById(id){if(!ids.has(id))ids.set(id,new Element());return ids.get(id);},querySelectorAll(){return [];},querySelector(){return new Element();},exitFullscreen(){doc.fullscreenElement=null;return Promise.resolve();}};
  const ctx=vm.createContext({isEarlyContext,asksPerformance,asksShotQuality,sampleContextCopy,observeVisibleCopy,visibleCopy,compactCopy,COPY_LIMITS,projectPlayerQuestion,document:doc,location:{hostname:'localhost',search:'',origin:'http://localhost:4173'},URLSearchParams,structuredClone,console,performance:{now:()=>now},requestAnimationFrame:f=>raf.push(f),window:{scrollX:3,scrollY:80,scrollTo(){},addEventListener(){},setTimeout(){}}});
  vm.runInContext(source+'\ncacheElements(); renderAll = () => {};',ctx);
  const api=vm.runInContext('({state,byId,startAttackReplay,advanceAttackReplay,handle3DViewerMessage,returnToMatch,handleReplayKey,viewingTime,renderScoreAndClock,animate,captureQuestionContext,matchClockContext})',ctx);
  const data=structuredClone(demo);data.analytics={chanceChains:{chains:[]},evidenceIndex:{rows:[]},tacticalStates:{rows:[]},tacticalChanges:{changes:[]},forecastSnapshots:{snapshots:[]},forecastOutcomes:{outcomes:[]}};
  data.events=[];data.highlights=[];data.frames=[{t:0,b:[0,0,-1,0],p:[],q:1},{t:50000,b:[0,0,-1,0],p:[],q:1}];
  Object.assign(api.state,{data,time:20000,liveEdge:20000,playing,followingLive:playing,autoStartPending:false,viewer3dReady:ready,selectedPlayerId:data.players[0].id,viewMode:'3d'});
  api.byId['viewer3d-frame'].contentWindow={postMessage:m=>messages.push(structuredClone(m)),addEventListener(){}};
  const viewer=api.byId['match-viewer'];
  if(fullscreen==='reject')viewer.requestFullscreen=()=>Promise.reject(new Error('Fullscreen denied by platform policy'));
  const receipt=({start=3000,end=20000,cutoff=20000,id='qa_chain',eventEnd=15000}={})=>({start,end,cutoffMs:cutoff,eventId:`${id}_event`,event:{id:`${id}_event`,t:15000,q:{endMs:eventEnd},type:'shot',team:data.teams[0].id,player:data.players[0].id},chain:{id,startMs:8000,endMs:15900,teamId:data.teams[0].id,eventIds:[`${id}_event`]}});
  const receive=m=>api.handle3DViewerMessage({origin:'http://localhost:4173',source:api.byId['viewer3d-frame'].contentWindow,data:{source:'soccerviewer',...m}});
  const ack=(replay=api.state.attackReplay)=>receive({type:'frame-presented',requestId:replay.requestId,period:1,renderedClockMs:replay.time});
  return {...api,ctx,doc,viewer,messages,receipt,receive,ack,clock:ms=>{now=ms;}};
}

test('attack rejects unbounded, future and malformed receipts before changing viewing state',()=>{
  const h=harness();
  for(const receipt of [null,{...h.receipt(),chain:null},h.receipt({end:20001}),h.receipt({start:-1}),h.receipt({start:21000}),h.receipt({eventEnd:21000}),{...h.receipt(),chain:{...h.receipt().chain,endMs:21000}}]){
    h.startAttackReplay(receipt);assert.equal(h.state.attackReplay,null);assert.equal(h.state.time,20000);
  }
});

test('attack freezes its receipt and the original viewing position while switching only the main visual playhead',()=>{
  const h=harness({playing:true}),r=h.receipt();h.startAttackReplay(r);
  r.end=999999;r.chain.id='poisoned';
  assert.equal(h.state.attackReplay.end,20000);assert.equal(h.state.attackReplay.receipt.chain.id,'qa_chain');
  assert.equal(h.state.time,20000);assert.equal(h.viewingTime(),3000);assert.equal(h.state.attackReplay.restore.playing,true);
  assert.equal(h.byId['replay-panel'].hidden,true);assert.equal(h.byId['viewer3d-loading'].hidden,false);
  h.renderScoreAndClock();assert.equal(h.byId['match-clock'].textContent,'0:03');assert.equal(h.byId['scope-time'].textContent,'Frozen 0:20');
});

test('initial viewer readiness alone cannot start an attack before its requested frame is presented',()=>{
  const h=harness({ready:false});h.startAttackReplay(h.receipt());
  for(let n=0;n<20;n++)h.advanceAttackReplay(100);
  assert.equal(h.state.attackReplay.time,3000);assert.equal(h.messages.length,0);
  h.receive({type:'ready'});assert.ok(h.messages.some(m=>m.type==='set-time'));
  h.advanceAttackReplay(100);assert.equal(h.state.attackReplay.time,3000);
  h.ack();h.advanceAttackReplay(100);assert.ok(h.state.attackReplay.time>3000);
});

test('wrong source, old request, wrong period and future rendered time cannot unlock the current seek',()=>{
  const h=harness();h.startAttackReplay(h.receipt());const r=h.state.attackReplay;
  const m={source:'soccerviewer',type:'frame-presented',requestId:r.requestId,period:1,renderedClockMs:3000};
  h.handle3DViewerMessage({origin:'https://other.example',source:h.byId['viewer3d-frame'].contentWindow,data:m});
  h.handle3DViewerMessage({origin:'http://localhost:4173',source:{},data:m});
  h.receive({...m,requestId:'stale'});h.receive({...m,period:2});h.receive({...m,renderedClockMs:3002});
  assert.equal(r.awaiting,true);assert.equal(r.hasPresented,false);assert.equal(h.byId['viewer3d-loading'].hidden,false);
  h.ack();assert.equal(r.hasPresented,true);assert.equal(r.awaiting,false);
  h.receive({...m,type:'frame-buffering'});assert.equal(r.buffering,false,'duplicate reply for a settled request must be inert');
});

test('buffering freezes attack time and hides the prior picture without an unbounded tracking skip',()=>{
  const h=harness();h.startAttackReplay(h.receipt());h.ack();h.advanceAttackReplay(100);
  const before=h.state.attackReplay.time,id=h.state.attackReplay.requestId;
  h.receive({type:'frame-buffering',requestId:id});
  for(let n=0;n<30;n++)h.advanceAttackReplay(100);
  assert.equal(h.state.attackReplay.time,before);assert.equal(h.byId['viewer3d-loading'].hidden,false);
  assert.equal(h.byId['attack-replay-return'].hidden,false);
  h.ack();h.advanceAttackReplay(100);assert.ok(h.state.attackReplay.time>before);
});

test('the final successfully presented attack frame stops exactly at the frozen end and never loops',()=>{
  const h=harness();h.startAttackReplay(h.receipt({start:15900,end:16050}));
  for(let n=0;n<10;n++){h.ack();h.advanceAttackReplay(100);}
  const r=h.state.attackReplay;assert.equal(r.time,16050);assert.equal(r.ended,true);assert.equal(r.playing,false);
  for(let n=0;n<20;n++)h.advanceAttackReplay(100);
  assert.equal(r.time,16050);assert.equal(h.state.time,20000);assert.equal(h.byId['attack-replay-again'].hidden,false);
  for(const m of h.messages.filter(m=>m.type==='set-time'))assert.ok(m.clockMs<=16050&&m.maxClockMs===16050);
});

test('repeated or different attacks retain the first return position and original playing state',()=>{
  const h=harness({playing:true});h.startAttackReplay(h.receipt());h.ack();h.advanceAttackReplay(100);
  h.startAttackReplay(h.receipt({start:10000,end:18000,id:'different_attack'}));
  assert.equal(h.state.attackReplay.restore.time,20000);assert.equal(h.state.attackReplay.restore.playing,true);
  h.state.liveEdge=50000;h.returnToMatch();
  assert.equal(h.state.attackReplay,null);assert.equal(h.state.time,20000);assert.equal(h.state.playing,true);assert.equal(h.state.followingLive,false);
  const pending=h.state.viewerReturn;assert.equal(pending.time,20000);assert.equal(h.byId['viewer3d-loading'].hidden,false);
  h.receive({type:'frame-presented',requestId:pending.requestId,period:1,renderedClockMs:20000});assert.equal(h.state.viewerReturn,null);
});

test('Escape returns from an unfinished or buffering attack and old acknowledgements cannot repaint it',()=>{
  const h=harness();h.startAttackReplay(h.receipt());const old=h.state.attackReplay.requestId;let prevented=0;
  h.handleReplayKey({key:'Escape',preventDefault(){prevented++;},stopImmediatePropagation(){}});
  assert.equal(prevented,1);assert.equal(h.state.attackReplay,null);assert.equal(h.state.time,20000);assert.equal(h.state.playing,false);
  const pending=h.state.viewerReturn;h.receive({type:'frame-presented',requestId:old,period:1,renderedClockMs:3000});
  assert.equal(h.state.viewerReturn,pending);assert.equal(h.byId['viewer3d-loading'].hidden,false);
});

test('platform fullscreen rejection retains an operable page-screen replay and Return control',async()=>{
  const h=harness({fullscreen:'reject'});h.startAttackReplay(h.receipt());await new Promise(resolve=>setImmediate(resolve));
  assert.equal(h.state.attackReplay.presentation,'page');assert.equal(h.viewer.classList.contains('is-attack-replay'),true);
  assert.match(h.byId['attack-replay-status'].textContent,/browser fullscreen unavailable/i);
  h.returnToMatch();assert.equal(h.state.attackReplay,null);assert.equal(h.viewer.classList.contains('is-attack-replay'),false);
});

test('vendor clock interpolation excludes a next sample beyond cutoff and has no future first-frame fallback',()=>{
  const raw=fs.readFileSync(new URL('vendor/soccerviewer/match/index.html',root),'utf8');
  const fn=raw.slice(raw.indexOf('function frameForClock('),raw.indexOf('// the pitch model',raw.indexOf('function frameForClock(')));
  const ctx=vm.createContext({axisByPeriod:new Map([[1,[{seq:0,ms:0},{seq:1,ms:100},{seq:2,ms:200}]],[2,[{seq:3,ms:4500000}]]]),THREE:{MathUtils:{clamp:(v,l,h)=>Math.max(l,Math.min(h,v))}}});
  vm.runInContext(fn,ctx);const sample=(p,t,end)=>vm.runInContext(`frameForClock(${p},${t},${end})`,ctx);
  assert.equal(sample(1,150,150),1);assert.equal(sample(1,150,200),1.5);assert.equal(sample(1,900,150),1);
  assert.equal(sample(2,0,1000),null);assert.equal(sample(2,4500000,4500000),3);
});


test('questions during an attack freeze the displayed playhead, excluding the later selected event and chain',()=>{
  const h=harness(),r=h.receipt();h.state.data.events=[r.event];h.state.data.analytics.chanceChains.chains=[r.chain];
  h.state.selectedEventId=r.eventId;h.state.selectedChainId=r.chain.id;h.startAttackReplay(r);
  const context=h.captureQuestionContext();assert.equal(context.cutoffMs,3000);assert.equal(context.selectedEvent,null);assert.equal(context.selectedChain,null);
  assert.equal(h.state.time,20000);
});

test('cross-half seek masks the prior scene and only the new period presentation can reveal it',()=>{
  const h=harness();Object.assign(h.state.data.match,{second_half_stream_start_ms:10000,second_half_offset_ms:10000});
  const r=h.receipt({start:9900,end:10100,cutoff:20000});r.event.t=9000;r.event.q.endMs=9000;r.chain.endMs=9500;
  h.startAttackReplay(r);h.ack();h.advanceAttackReplay(100);
  const pending=h.state.attackReplay;assert.equal(pending.time,10000);assert.equal(pending.buffering,true);assert.equal(h.byId['viewer3d-loading'].hidden,false);
  h.receive({type:'frame-presented',requestId:pending.requestId,period:1,renderedClockMs:10000});assert.equal(pending.awaiting,true);
  h.receive({type:'frame-presented',requestId:pending.requestId,period:2,renderedClockMs:0});assert.equal(pending.awaiting,false);assert.equal(h.byId['viewer3d-loading'].hidden,true);
});

test('a held frame in a tracking gap is labeled and cannot fast-skip the attack endpoint',()=>{
  const h=harness();h.startAttackReplay(h.receipt({start:10000,end:10150}));
  for(let n=0;n<4;n++){
    const r=h.state.attackReplay;h.receive({type:'frame-presented',requestId:r.requestId,period:1,renderedClockMs:3000});
    if(!r.ended)assert.match(h.byId['attack-replay-status'].textContent,/Tracking gap.*held/i);
    h.advanceAttackReplay(100);
  }
  assert.equal(h.state.attackReplay.time,10150);assert.equal(h.state.attackReplay.ended,true);assert.equal(h.state.time,20000);
});
