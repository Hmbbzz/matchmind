import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {unsupportedPassingDetail,PASSING_DETAIL_LIMIT,isAttackExplanationQuestion} from '../public/question-intent.js';
import {projectPlayerQuestion} from '../public/assistant-api.js';
import {visibleCopy,compactCopy,attackMainText,COPY_LIMITS,isEarlyContext,asksPerformance,asksShotQuality,sampleContextCopy,observeVisibleCopy} from '../public/display-copy.js';
import {createConfiguredService,loadSkillCornerFixture} from '../backend/server.mjs';

// Isolated user-flow harness: real application logic with a tiny in-memory DOM.
// Browser/visual coverage is recorded separately; this is not a browser substitute.
class Element {
  constructor(tag = 'div') { this.tagName = tag; this.children = []; this.dataset = {}; this.attributes = {}; this.listeners = {}; this.style = {setProperty(k,v) {this[k]=v;}}; this.hidden = false; this.value = ''; this._html = ''; this._text = ''; this.className = ''; const tokens=()=>new Set(this.className.split(/\s+/).filter(Boolean));const write=set=>{this.className=[...set].join(' ');};this.classList={add:(...items)=>{const set=tokens();items.forEach(x=>set.add(x));write(set);},remove:(...items)=>{const set=tokens();items.forEach(x=>set.delete(x));write(set);},contains:x=>tokens().has(x),toggle:(x,force)=>{const set=tokens(),on=force===undefined?!set.has(x):Boolean(force);if(on)set.add(x);else set.delete(x);write(set);return on;}}; }
  cloneNode(deep=false) { const n=new Element(this.tagName);n._html=this._html;n._text=this._text;n.className=this.className;n.dataset={...this.dataset};n.attributes={...this.attributes};n.hidden=this.hidden;n.value=this.value;if(deep)n.append(...this.children.map(c=>c.cloneNode(true)));return n; }
  set innerHTML(v) { this._html = v; this.children = []; }
  get innerHTML() { return this._html+this.children.map(c=>`<${c.tagName}>${c.innerHTML||c.textContent}</${c.tagName}>`).join(''); }
  set textContent(v) { this._text = String(v); }
  get textContent() { return (this._html ? this._html.replace(/<[^>]*>/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"') : this._text)+this.children.map(c=>c.textContent).join(' '); }
  append(...nodes) { for(const node of nodes) {node.parent = this; this.children.push(node);} }
  after(...nodes) { if(this.parent){const i=this.parent.children.indexOf(this);for(const node of nodes)node.parent=this.parent;this.parent.children.splice(i+1,0,...nodes);} }
  replaceChildren(...nodes) {this.children=[];this.append(...nodes);}
  setAttribute(k,v) { this.attributes[k] = String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=String(v); }
  getAttribute(k) { if(k.startsWith('data-'))return this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]??null;return this.attributes[k] ?? null; }
  removeAttribute(k) { delete this.attributes[k];if(k.startsWith('data-'))delete this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]; }
  hasAttribute(k) { return this.getAttribute(k)!==null; }
  get title() { return this.getAttribute('title') ?? ''; }
  set title(value) { this.setAttribute('title',value); }
  get parentElement() { return this.parent ?? null; }
  closest(selector) { for(let node=this;node;node=node.parentElement)if(selector.startsWith('.')&&node.classList.contains(selector.slice(1)))return node;return null; }
  addEventListener(k,fn) { this.listeners[k] = fn; }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? new Element(selector); }
  querySelectorAll(selector) { const matches = node => selector.startsWith('.') ? node.className.split(/\s+/).includes(selector.slice(1)) : node.tagName===selector; return this.children.flatMap(c=>[...(matches(c)?[c]:[]),...c.querySelectorAll(selector)]); }
  remove() { if(this.parent) this.parent.children = this.parent.children.filter(c=>c!==this); }
  getBoundingClientRect() { return {left:0,top:0,width:1000,height:600}; }
}
const root = new URL('../', import.meta.url);
const raw = fs.readFileSync(new URL('public/app.js',root),'utf8');
const realData = JSON.parse(fs.readFileSync(new URL('public/data/demo.json',root)));
function harness() {
  const ids = new Map(); const timers=[];
  const all = selector => [...ids.values()].flatMap(node=>node.querySelectorAll(selector));
  const doc = {createElement:t=>new Element(t), getElementById:id=>{if(!ids.has(id))ids.set(id,new Element());return ids.get(id);}, querySelector:selector=>all(selector)[0]??new Element(),querySelectorAll:all,documentElement:{style:{setProperty(){}}}};
  const context = vm.createContext({projectPlayerQuestion,visibleCopy,compactCopy,attackMainText,COPY_LIMITS,isEarlyContext,asksPerformance,asksShotQuality,sampleContextCopy,observeVisibleCopy,unsupportedPassingDetail,PASSING_DETAIL_LIMIT,isAttackExplanationQuestion,document:doc,location:{hostname:'localhost',search:'',origin:'http://localhost:4173'},URLSearchParams,structuredClone,performance:{now:()=>0},requestAnimationFrame:()=>{},console,qaPending:timers,window:{setTimeout:fn=>timers.push(fn),addEventListener(){}}});
  // Keep the real application body and every original trust assertion. Only
  // its unexecuted ESM transport imports are stripped for this VM harness.
  const source = raw.replace(/^import\s+.*\n/gm, '').replace(/\ninit\(\);\s*$/, '\n');
  // Explicit deferred offline transport: no real HTTP/model call. It keeps the
  // original delayed-response assertions meaningful after askQuestion became async.
  vm.runInContext(source + '\ncacheElements(); renderReplay = () => {}; renderPitch = () => {}; sync3DViewer = () => {}; assistantApi = {getState:()=>({available:false,phase:"unavailable"}),query:()=>new Promise((_,reject)=>qaPending.push(()=>reject({code:"unavailable"}))),explainAttack:()=>new Promise((_,reject)=>qaPending.push(()=>reject({code:"unavailable"})))};',context);
  const api = vm.runInContext('({state,byId,askQuestion,answerWithContext:answerQuestion,captureQuestionContext,openReplay,renderTimelineMarkers,renderPlayerPanel,eventDescription,appendAssistant,frameAt,calculatePlayerStats,scoresAt})',context);
  const data = structuredClone(realData); data.frames=[{t:0,b:[0,0,-1,0],p:[[0,0,0,100,0,0,0,0,0,0,3,1]],q:1}];
  data.analytics={chanceChains:{chains:[]},evidenceIndex:{rows:[]},tacticalStates:{rows:[]},tacticalChanges:{changes:[]},forecastSnapshots:{snapshots:[]},forecastOutcomes:{outcomes:[]}};
  data.events=[]; data.highlights=[];
  api.state.data=data; api.state.selectedPlayerId=data.players[0].id; api.state.time=20000;
  return {...api,timers,ids,context,answerQuestion(question,cutoff) {api.state.time=cutoff;return api.answerWithContext(question,api.captureQuestionContext());}};
}
const snapshot = value => JSON.parse(JSON.stringify(value));
function shot(h,{t=1000,endMs=t,id='qa_shot'}={}) { const p=h.state.data.players[0];return {id,t,player:p.id,team:p.teamId,type:'shot',outcome:'saved',q:{endMs,xg:.15,distance_m:14}}; }


// S-CTX-01: source-backed player totals are independent of the globally selected
// other-player event/chain. DOM harness complements the separate real UI proof.
const sFixture=await loadSkillCornerFixture();
function contextHarness(){
 const h=harness();h.state.data.events=structuredClone(realData.events);
 h.state.data.analytics.chanceChains=structuredClone(sFixture.chanceChains);
 h.state.data.analytics.evidenceIndex=JSON.parse(fs.readFileSync(new URL('public/data/live/evidence-index.json',root)));
 h.state.time=76541;h.state.audienceMode='casual';h.state.selectedPlayerId='sk_player_51685';h.state.selectedEventId='sk_event_8_6';h.state.selectedChainId='chance_001';
 h.context.qaObserved=[];
 vm.runInContext('assistantApi.query=(question,context)=>{qaObserved.push({route:"player",question,context});return new Promise((_,reject)=>qaPending.push(()=>reject({code:"unavailable"})));};assistantApi.explainAttack=(question,context)=>{qaObserved.push({route:"attack",question,context});return new Promise((_,reject)=>qaPending.push(()=>reject({code:"unavailable"})));};',h.context);
 return h;
}
test('S-CTX-01 independent player statistics freeze actor/time/mode without inheriting another-player event/chain or clearing the global selection',async()=>{
 for(const question of ['Recorded passes','How many recorded passes has he completed?','Summarize his recorded passing, crossing and shooting.']){
  const h=contextHarness(),pending=h.askQuestion(question),r=h.context.qaObserved[0];
  assert.equal(r.route,'player');assert.equal(r.context.selectedPlayerId,'sk_player_51685');assert.equal(r.context.cutoffMs,76541);assert.equal(r.context.mode,'casual');
  assert.equal(r.context.selectedEventId,null,'An unqualified player statistic must not inherit the global Velupillay shot');
  assert.equal(r.context.selectedChainId,null,'An unqualified player statistic must not inherit a team attack');
  assert.equal(h.state.selectedEventId,'sk_event_8_6');assert.equal(h.state.selectedChainId,'chance_001');
  h.state.selectedPlayerId='sk_player_11117';h.state.time=90000;h.state.audienceMode='analyst';
  h.timers.shift()();await pending;assert.equal(r.context.selectedPlayerId,'sk_player_51685');assert.equal(r.context.cutoffMs,76541);assert.equal(r.context.mode,'casual');
  const html=h.byId['chat-log'].children.at(-1).innerHTML;assert.match(html,/L\. Jackson/);assert.match(html,/1:16/);
 }
});
test('S-CTX-01 an explicit shot question and later attack explanation retain their requested evidence scope; globals remain available',async()=>{
 const h=contextHarness();await h.askQuestion('How good was this shot?');assert.equal(h.context.qaObserved.length,0,'Wrong-actor explicit shot stops before transport');assert.equal(h.byId['chat-log'].children.at(-1).dataset.providerStatus,'evidence_context_mismatch');
 let pending=h.askQuestion('How did this attack develop?'),r=h.context.qaObserved[0];assert.equal(r.route,'attack');assert.equal(r.context.selectedChainId,'chance_001');assert.equal(r.context.selectedPlayerId,'sk_player_51685');h.timers.shift()();await pending;
 assert.equal(h.state.selectedPlayerId,'sk_player_51685');assert.equal(h.state.selectedEventId,'sk_event_8_6');assert.equal(h.state.selectedChainId,'chance_001');
});
test('S-CTX-01 direct explicit mismatched event/chain still rejects before a configured provider, while independent Jackson passing has its own source event',async()=>{
 let calls=0;const service=await createConfiguredService({fixture:sFixture,initialCutoffMs:76541,now:()=>100000,env:{MATCHMIND_PROVIDER:'responses',MATCHMIND_ENDPOINT_KIND:'foundry_resource',MATCHMIND_MODEL_ENDPOINT:'https://s-controlled.services.ai.azure.com',MATCHMIND_MODEL_DEPLOYMENT:'test-only',MATCHMIND_MODEL_PROFILE:'gpt-5-mini',MATCHMIND_API_KEY:'inert-not-a-real-key'},fetchImpl:async()=>{calls++;throw Error('A rejected mismatched request must not reach provider');}});
 const session=service.createSession({match_id:sFixture.demo.match.match_id}),base={session_id:session.session_id,match_id:sFixture.demo.match.match_id,player_id:'sk_player_51685',cutoff_ms:76541,viewer_playhead_ms:76541,question:'Recorded passes',mode:'casual'};
 for(const [i,scope]of[{event_id:'sk_event_8_6',chain_id:null},{event_id:null,chain_id:'chance_001'},{event_id:'sk_event_8_6',chain_id:'chance_001'}].entries())await assert.rejects(service.query({...base,...scope,query_id:`s-c3-explicit-${i}`}),e=>e.status===400&&e.code==='INVALID_REQUEST');
 assert.equal(calls,0);const own=realData.events.filter(e=>e.type==='pass'&&e.player==='sk_player_51685'&&Math.max(e.t,e.q?.endMs??e.t,e.available_at_ms??e.t)<=76541);assert.deepEqual(own.map(e=>e.id),['sk_event_8_12']);assert.equal(own[0].outcome,'complete');assert.equal(own[0].q.endMs,59500);
});
