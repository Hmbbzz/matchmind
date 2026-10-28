import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createPlayerWatchlist,WATCHLIST_VERSION} from '../public/player-story-watchlist.js';
const demo=JSON.parse(await fs.readFile(new URL('../public/data/demo.json',import.meta.url))),A='sk_player_11885',B='sk_player_51685',C='sk_player_624628';
const matchId=demo.match.match_id,sourceVersion='skillcorner-2017461/local-static-v1';
const envelope=players=>({version:WATCHLIST_VERSION,match_id:matchId,source_version:sourceVersion,players});
function store(raw=null){const values=new Map(),writes=[];const key=`matchmind-observers/1:${encodeURIComponent(matchId)}:${encodeURIComponent(sourceVersion)}`;if(raw!==null)values.set(key,raw);return{key,values,writes,getItem:k=>values.get(k)??null,setItem:(k,v)=>{writes.push([k,v]);values.set(k,v);}};}
const make=s=>createPlayerWatchlist({matchId,sourceVersion,players:demo.players,storage:()=>s});
test('T local watchlist stores only ordered real-roster IDs and styles, with safe independent copies',()=>{
 const s=store(),w=make(s);assert.equal(WATCHLIST_VERSION,'matchmind-observers/1');assert.equal(w.key,s.key);assert.deepEqual(w.list(),[]);assert.equal(w.add(A,'casual'),true);assert.equal(w.add(C,'analyst'),true);assert.equal(w.add(A,'analyst'),false);assert.equal(w.add('foreign-player','casual'),false);assert.equal(w.add(B,'expert'),false);assert.deepEqual(w.list(),[{player_id:A,mode:'casual'},{player_id:C,mode:'analyst'}]);
 assert.deepEqual(JSON.parse(s.values.get(s.key)),envelope([{player_id:A,mode:'casual'},{player_id:C,mode:'analyst'}]));const copy=w.list();copy.pop();assert.equal(w.list().length,2);assert.ok(Object.isFrozen(w.list()[0]));w.setMode(A,'analyst');w.setMode(C,'wrong');assert.equal(make(s).list()[0].mode,'analyst');w.remove(A);assert.deepEqual(make(s).list(),[{player_id:C,mode:'analyst'}]);assert.ok(!JSON.stringify([...s.values]).match(/snapshot|token|owner|session|followed/));
});
test('T persisted watchlist rejects malformed, foreign-scope and oversized values without admitting unknown IDs',()=>{
 const valid={player_id:A,mode:'casual'},dirty={...valid,snapshot:{private:'must not persist'},share_token:'not-a-real-capability',owner_id:'not-real'};
 for(const raw of ['{bad','null','[]','x'.repeat(32769),JSON.stringify({...envelope([valid]),version:'foreign'}),JSON.stringify({...envelope([valid]),match_id:'other'}),JSON.stringify({...envelope([valid]),source_version:'other'})])assert.deepEqual(make(store(raw)).list(),[],raw.slice(0,50));
 const s=store(JSON.stringify(envelope([dirty,null,{player_id:'foreign',mode:'casual'},{player_id:A,mode:'analyst'},{player_id:B,mode:'expert'},{player_id:C,mode:'analyst'}]))),w=make(s);assert.deepEqual(w.list(),[valid,{player_id:C,mode:'analyst'}]);w.setMode(A,'analyst');assert.deepEqual(JSON.parse(s.values.get(s.key)),envelope([{player_id:A,mode:'analyst'},{player_id:C,mode:'analyst'}]));
});
test('T storage getter and quota failure retain usable visit-only state without false persistence',()=>{
 for(const storage of [()=>{throw new DOMException('denied','SecurityError');},()=>({getItem:()=>null,setItem:()=>{throw new DOMException('full','QuotaExceededError');}})]){const w=createPlayerWatchlist({matchId,sourceVersion,players:demo.players,storage});w.add(A,'casual');w.add(B,'analyst');assert.equal(w.persistent,false);assert.deepEqual(w.list(),[{player_id:A,mode:'casual'},{player_id:B,mode:'analyst'}]);w.remove(A);assert.deepEqual(w.list(),[{player_id:B,mode:'analyst'}]);}
});
test('T match/source preference keys isolate recovery and preserve unaffected observation order',()=>{
 const s=store(),w=make(s);w.add(A,'casual');w.add(B,'analyst');w.add(C,'casual');const before=structuredClone(w.list());for(const patch of [{matchId:'other/match'},{sourceVersion:'other/source'}]){const other=createPlayerWatchlist({matchId,sourceVersion,players:demo.players,storage:()=>s,...patch});assert.notEqual(other.key,w.key);assert.deepEqual(other.list(),[]);other.add(C,'analyst');}assert.deepEqual(make(s).list(),before);
});
