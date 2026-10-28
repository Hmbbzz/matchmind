import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizedBrier,evaluateForecastBaselines} from '../scripts/lib/forecast-evaluation.mjs';

const regime={persist:.8,change:.2},escape={left:.4,center:.3,right:.2,long:.1},zone={wide_left:.2,half_space_left:.2,center:.2,half_space_right:.2,wide_right:.2};
const approx=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
function snapshot(id,horizonMs=120000,probs=regime){return {forecastId:id,cutoffMs:0,createdAtMs:0,validUntilMs:horizonMs,horizonMs,tasks:{regimePersistence:{targetState:'mid_block',probabilities:{...probs}},pressEscape:{probabilities:{...escape},topScenario:'left'},zoneRisk:{probabilities:{...zone},topScenario:'wide_left'}}};}
const unscorable=()=>({actual:null,status:'unscorable',brier:null});
const task=(actual,status,brier)=>({actual,status,brier});
function fixture(){return {snapshots:[snapshot('f1'),snapshot('f2',120000,{persist:.6,change:.4}),snapshot('f3'),snapshot('f4'),snapshot('f5',300000)],outcomes:[
 {forecastId:'f1',status:'resolved',taskOutcomes:{regimePersistence:task('persist','supported',.04),pressEscape:task('left','supported',.125),zoneRisk:task('wide_left','supported',.16)}},
 {forecastId:'f2',status:'resolved',taskOutcomes:{regimePersistence:task('change','contradicted',.36),pressEscape:task('right','contradicted',.225),zoneRisk:unscorable()}},
 {forecastId:'f3',status:'pending',taskOutcomes:null},
 {forecastId:'f4',status:'unscorable',taskOutcomes:{regimePersistence:unscorable(),pressEscape:unscorable(),zoneRisk:unscorable()}},
 {forecastId:'f5',status:'unscorable',taskOutcomes:{regimePersistence:unscorable(),pressEscape:unscorable(),zoneRisk:unscorable()}},
]};}

test('F forecast: hand-computed normalized Brier preserves each task class count',()=>{
 approx(normalizedBrier(regime,'persist'),.04);approx(normalizedBrier(escape,'left'),.125);approx(normalizedBrier({left:.25,center:.25,right:.25,long:.25},'right'),.1875);approx(normalizedBrier(zone,'center'),.16);
});

test('F forecast: baselines share exact scored cohorts per task and horizon',()=>{
 const report=evaluateForecastBaselines(fixture()),get=task=>report.groups.find(r=>r.task===task&&r.horizonMs===120000);
 const p=get('regimePersistence');assert.equal(p.n,2);assert.equal(p.pending,1);assert.equal(p.unscorable,1);approx(p.forecastBrier,.2);approx(p.uniformBrier,.25);approx(p.forecastMinusUniform,-.05);approx(p.alwaysPersistBrier,.5);approx(p.forecastMinusAlwaysPersist,-.3);
 const e=get('pressEscape');assert.equal(e.n,2);assert.equal(e.classCount,4);approx(e.forecastBrier,.175);approx(e.uniformBrier,.1875);approx(e.forecastMinusUniform,-.0125);assert.equal(Object.hasOwn(e,'alwaysPersistBrier'),false);
 const z=get('zoneRisk');assert.equal(z.n,1);assert.equal(z.pending,1);assert.equal(z.unscorable,2);assert.equal(z.classCount,5);approx(z.forecastBrier,.16);approx(z.uniformBrier,.16);
});

test('F forecast: zero scored samples are null, including each baseline and difference',()=>{
 const r=evaluateForecastBaselines(fixture()).groups.filter(r=>r.horizonMs===300000);assert.equal(r.length,3);
 for(const group of r){assert.equal(group.n,0);assert.equal(group.unscorable,1);assert.equal(group.forecastBrier,null);assert.equal(group.uniformBrier,null);assert.equal(group.forecastMinusUniform,null);if(group.task==='regimePersistence'){assert.equal(group.alwaysPersistBrier,null);assert.equal(group.forecastMinusAlwaysPersist,null);}}
});

test('F forecast: duplicate, missing and foreign ledger rows cannot silently change the scored cohort',()=>{
 for(const mutate of [x=>x.snapshots.push(structuredClone(x.snapshots[0])),x=>x.outcomes.push(structuredClone(x.outcomes[0])),x=>x.outcomes.pop(),x=>x.outcomes.push({forecastId:'foreign',status:'pending',taskOutcomes:null})]){const x=fixture();mutate(x);assert.throws(()=>evaluateForecastBaselines(x),TypeError);}
});

test('F forecast: invalid probabilities, labels and status inconsistencies fail instead of dropping a sample',()=>{
 for(const [p,a] of [[{a:.4,b:.4},'a'],[{a:-.1,b:1.1},'a'],[{a:NaN,b:1},'a'],[{a:1},'a'],[{a:.5,b:.5},'c']])assert.throws(()=>normalizedBrier(p,a),TypeError);
 for(const mutate of [x=>x.snapshots[0].tasks.pressEscape.probabilities.left=.5,x=>x.outcomes[0].taskOutcomes.pressEscape.actual='unknown',x=>x.outcomes[0].taskOutcomes.pressEscape.status='contradicted',x=>x.outcomes[0].taskOutcomes.pressEscape.brier=.99,x=>x.outcomes[2].taskOutcomes=x.outcomes[0].taskOutcomes,x=>delete x.outcomes[0].taskOutcomes.zoneRisk]){const x=fixture();mutate(x);assert.throws(()=>evaluateForecastBaselines(x),TypeError);}
});
