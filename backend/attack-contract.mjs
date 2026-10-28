import { ModelContractError } from './prompt-core.mjs';
import { formatSourceMatchClock } from './match-clock.mjs';
import { attackMainText } from '../public/display-copy.js';
export const ATTACK_PROMPT_VERSION = 'matchmind-attack-prompt/1.0';
export const ATTACK_ANSWER_VERSION = 'matchmind-attack-answer/1.0';
export const ATTACK_API_VERSION = 'matchmind-attack-api/1.0';
export const ATTACK_FOCUS_KINDS = Object.freeze(['recorded_sequence','recorded_progression','recorded_finish','observed_movement']);
export const ATTACK_ROLES = Object.freeze(['start','progression','finish','observed_support']);
const freeze = value => { if(value && typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value; };
const reject = () => { throw new ModelContractError(); };
function exact(value, keys) { if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==keys.length||keys.some(key=>!Object.hasOwn(value,key)))reject(); }
const eligibleFocus = (focus, facts, claims, observations) => {
  if (!ATTACK_FOCUS_KINDS.includes(focus.kind) || !Array.isArray(focus.claimIds) || !focus.claimIds.length || new Set(focus.claimIds).size !== focus.claimIds.length) return false;
  const selected = focus.claimIds.map(id => claims.find(claim => claim.id === id)); if (selected.some(claim => !claim)) return false;
  if (focus.kind === 'recorded_progression') return selected.length >= 2 && facts.completed_passes >= 2 && selected.every(claim => ['start','progression'].includes(claim.kind));
  if (focus.kind === 'recorded_finish') return facts.shots > 0 && selected.every(claim => claim.kind === 'finish');
  if (focus.kind === 'observed_movement') return selected.every(claim => claim.kind === 'observed_support' && claim.observationIds.length > 0 && claim.observationIds.every(id => observations.some(observation => observation.id === id && observation.quality.cameraCoverage === 1 && observation.quality.rawVerified && observation.quality.heldSamples === 0 && observation.quality.extrapolatedSamples === 0)));
  return selected.every(claim => claim.kind !== 'observed_support');
};
const sameSet = (actual, expected) => Array.isArray(actual)&&actual.length===expected.length&&new Set(actual).size===actual.length&&actual.every(value=>expected.includes(value));
export function createAttackPromptBundle(system, schemaText, sha256) {
  const schema=JSON.parse(schemaText);
  if(typeof system!=='string'||!system.includes(ATTACK_PROMPT_VERSION)||new TextEncoder().encode(system).length>16384||new TextEncoder().encode(schemaText).length>16384||!/^[a-f0-9]{64}$/.test(sha256)||schema.properties?.schema_version?.enum?.[0]!==ATTACK_ANSWER_VERSION||schema.properties?.scope_type?.enum?.[0]!=='attack'||JSON.stringify(schema.properties?.summary_key?.enum)!==JSON.stringify(ATTACK_FOCUS_KINDS)||!['focus_candidate_id','focus_claim_ids','steps','receipt_ids','limitation_ids'].every(key=>schema.required?.includes(key))||schema.properties?.steps?.maxItems!==6||schema.properties?.focus_claim_ids?.maxItems!==6||JSON.stringify(schema.properties?.steps?.items?.properties?.role?.enum)!==JSON.stringify(ATTACK_ROLES))throw new TypeError('Invalid attack prompt bundle.');
  return freeze({kind:'attack',version:ATTACK_PROMPT_VERSION,systemPrompt:system,schema,sha256});
}
export function buildAttackPacket(snapshot, question) {
  if(snapshot?.scope_type!=='attack'||snapshot.answerability?.topic!=='attack_explanation'||snapshot.answerability?.status!=='supported'||typeof question!=='string'||!question.trim()||question.length>4000||!['casual','analyst'].includes(snapshot.mode)||!Array.isArray(snapshot.claims)||snapshot.claims.length<1||snapshot.claims.length>6||snapshot.evidence_receipts?.length!==1)throw new TypeError('A trusted frozen attack snapshot is required.');
  const receipt=snapshot.evidence_receipts[0];
  if(receipt.scope_type!=='attack'||receipt.player_id!==null||receipt.team_id!==snapshot.context.team_id||receipt.chain_id!==snapshot.context.chain_id||receipt.as_of_ms!==snapshot.as_of_ms||receipt.clip.end_ms>snapshot.as_of_ms||receipt.clip.cutoff_ms!==snapshot.as_of_ms||!sameSet(receipt.claim_ids,snapshot.claims.map(c=>c.id)))throw new TypeError('Invalid attack evidence.');
  for(const claim of snapshot.claims)if(!ATTACK_ROLES.includes(claim.kind)||claim.atMs>snapshot.as_of_ms||!claim.eventIds.every(id=>receipt.event_ids.includes(id))||!claim.observationIds.every(id=>receipt.observation_ids.includes(id)))throw new TypeError('Invalid frozen claim.');
  const hints=[[/off[- ]?(?:the[- ]?)?ball|mov(?:e(?:d|s)?|ement)|runner|support/i,'observed_movement'],[/shot|finish|shoot/i,'recorded_finish'],[/pass|progress|develop|build/i,'recorded_progression']].filter(([pattern])=>pattern.test(question)).map(([,kind])=>kind);
  const requestedKind=hints.length===1?hints[0]:null;
  const allFocus=snapshot.focus_candidates;
  if(!Array.isArray(allFocus)||!allFocus.length||allFocus.some(f=>!eligibleFocus(f,snapshot.facts,snapshot.claims,snapshot.observations)))throw new TypeError('Invalid authorized explanation focus.');
  const matching=requestedKind?allFocus.filter(f=>f.kind===requestedKind):allFocus;
  const allowedFocus=matching.length?matching:allFocus.filter(f=>f.kind==='recorded_sequence');
  return freeze({schema_version:'frozen-attack-facts/1.0',scope_type:'attack',scope:{match_id:snapshot.context.match_id,team_id:snapshot.context.team_id,chain_id:snapshot.context.chain_id,cutoff_ms:snapshot.as_of_ms,mode:snapshot.mode},team:snapshot.team,attack:snapshot.attack,facts:snapshot.facts,participants:snapshot.participants,claims:snapshot.claims,allowed_focus_candidates:allowedFocus,focus_request:{requested_kind:requestedKind,available:requestedKind===null||matching.length>0},observations:snapshot.observations,required_claim_ids:snapshot.claims.map(c=>c.id),limitations:snapshot.attack_limitations,required_limitation_ids:snapshot.attack_limitations.map(l=>l.id),evidence:[{receipt_id:receipt.receipt_id,event_ids:receipt.event_ids,claim_ids:receipt.claim_ids,observation_ids:receipt.observation_ids,as_of_ms:receipt.as_of_ms,clip:{start_ms:receipt.clip.start_ms,end_ms:receipt.clip.end_ms,cutoff_ms:receipt.clip.cutoff_ms}}],source_version:snapshot.source_version,insight_version:snapshot.insight_version});
}
export function validateAttackAnswer(candidate, packet) {
  exact(candidate,['schema_version','scope_type','scope','summary_key','focus_candidate_id','focus_claim_ids','steps','receipt_ids','limitation_ids']);
  if(candidate.schema_version!==ATTACK_ANSWER_VERSION||candidate.scope_type!=='attack'||!ATTACK_FOCUS_KINDS.includes(candidate.summary_key))reject();
  exact(candidate.scope,['match_id','team_id','chain_id','cutoff_ms','mode']);
  for(const key of Object.keys(candidate.scope))if(candidate.scope[key]!==packet.scope[key])reject();
  if(!Array.isArray(candidate.steps)||candidate.steps.length>6||!sameSet(candidate.steps.map(step=>step.claim_id),packet.required_claim_ids)||!sameSet(candidate.receipt_ids,packet.evidence.map(e=>e.receipt_id))||!sameSet(candidate.limitation_ids,packet.required_limitation_ids))reject();
  let lastActionTime=-1;
  for(const step of candidate.steps){exact(step,['claim_id','role']);const claim=packet.claims.find(c=>c.id===step.claim_id);if(!claim||step.role!==claim.kind)reject();if(claim.kind!=='observed_support'){if(claim.atMs<lastActionTime)reject();lastActionTime=claim.atMs;}}
  const focus=packet.allowed_focus_candidates.find(f=>f.id===candidate.focus_candidate_id);
  if(!focus||focus.kind!==candidate.summary_key||!sameSet(candidate.focus_claim_ids,focus.claimIds)||!eligibleFocus(focus,packet.facts,packet.claims,packet.observations))reject();
  return freeze(structuredClone(candidate));
}
export function defaultAttackAnswer(packet) {
  const focus=packet.allowed_focus_candidates[0];
  return freeze({schema_version:ATTACK_ANSWER_VERSION,scope_type:'attack',scope:packet.scope,summary_key:focus.kind,focus_candidate_id:focus.id,focus_claim_ids:focus.claimIds,steps:packet.claims.map(claim=>({claim_id:claim.id,role:claim.kind})),receipt_ids:packet.evidence.map(e=>e.receipt_id),limitation_ids:packet.required_limitation_ids});
}
export function renderAttackExplanation(candidate, packet, selection = 'validated_provider') {
  const steps=candidate.steps.map(step=>{const claim=packet.claims.find(c=>c.id===step.claim_id);return{claim_id:claim.id,role:claim.kind,text:claim[packet.scope.mode],receipt_ids:packet.evidence.filter(e=>e.claim_ids.includes(claim.id)).map(e=>e.receipt_id),event_ids:claim.eventIds,observation_ids:claim.observationIds};});
  const selected=packet.allowed_focus_candidates.find(f=>f.id===candidate.focus_candidate_id);
  return freeze({summary_key:candidate.summary_key,focus:{selection,candidate_id:selected.id,kind:selected.kind,claim_ids:selected.claimIds,text:selected[packet.scope.mode],basis:steps.filter(step=>selected.claimIds.includes(step.claim_id))},focus_request:packet.focus_request,steps,limitations:candidate.limitation_ids.map(id=>packet.limitations.find(l=>l.id===id))});
}
export function renderAttackAnswer(candidate, packet, { question = '' } = {}) {
  const explanation=renderAttackExplanation(candidate,packet);
  const missingFocus=!packet.focus_request.available ? packet.focus_request.requested_kind==='observed_movement'?'No movement record in this attack meets the continuous direct-observation requirements. ':packet.focus_request.requested_kind==='recorded_finish'?`This attack has ${packet.facts.passes} passes and no recorded shot, so there is no shot to assess. `:`This attack has ${packet.facts.completed_passes} completed passes; no qualifying multi-pass explanation is available. ` : '';
  const unknown=packet.observations.some(observation=>observation.quality.unknownPossessionSamples>0);
  return attackMainText({ text:explanation.focus.text, question, mode:packet.scope.mode, prefix:`By ${formatSourceMatchClock(packet.scope.cutoff_ms, packet.scope.match_id)}: `, missingFocus, hasPossessionGap:unknown });
}
// The public receipt has a null player_id; this key only adapts the existing D1 column.
export function receiptStorageScope(receipt) {
  if(receipt?.scope_type==='attack'){
    if(receipt.player_id!==null||typeof receipt.team_id!=='string'||typeof receipt.chain_id!=='string')throw new TypeError('Invalid attack receipt scope.');
    return `team:${receipt.team_id}`;
  }
  return receipt.player_id;
}
