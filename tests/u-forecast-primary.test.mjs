import test from 'node:test';import assert from 'node:assert/strict';import {compactCopy} from '../public/display-copy.js';
test('U unpublished forecast primary preserves the concrete completed-window reason rather than claiming an uncalibrated estimate',()=>{
 const full='At 0:21, no forecast is published for this team and horizon. The first forecast window ends at 5:00; this question is earlier than that window. Only supported match details are included.';
 const text=compactCopy(full,55,2,{includeForecastCalibration:false});assert.match(text,/first forecast window ends at 5:00/);assert.doesNotMatch(text,/This estimate is uncalibrated/);assert.ok(text.trim().split(/\s+/).length<=55);
});
test('U a published forecast keeps the required uncalibrated uncertainty in a short primary',()=>{
 const full='Frozen at 5:00 for the next 5 minutes: the team has a 52% probability of retaining its current tactical state. This forecast describes a completed-pass channel proxy. It does not verify pressure escape or territorial risk. Probabilities are not independently calibrated.';
 const text=compactCopy(full,55,2);assert.match(text,/52%/);assert.match(text,/uncalibrated/);
});
