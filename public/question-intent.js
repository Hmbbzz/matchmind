// Finite intent guards shared by the browser fallback and server metric scope.
// A passing keyword cannot establish a qualified statistic or identify one pass.
export function unsupportedPassingDetail(question) {
  if (!/\bpass(?:es|ing)?\b/i.test(question)) return false;
  return /\b(?:forward|backward|backwards|sideways|lateral|progressive|through|key|long|short|diagonal|vertical|final[- ]third|penalty[- ]area|box|line[- ]break(?:ing)?|defen[cs]ive[- ]line|under pressure|pressured)\b|\bbro(?:ke|ken)\b.{0,50}\bline\b|\b(?:which|identify|name)\b.{0,80}\bpass\b/i.test(question);
}
export const PASSING_DETAIL_LIMIT = 'This view currently reports total passes and completion. Directional and line-breaking breakdowns are not provided.';
export function isAttackExplanationQuestion(question) {
  const attack = /\battack(?:ing)?(?:['’]s)?\b/i.test(question);
  const explanation = /\b(?:explain|describe|how|why|form(?:ed|ation)?|build|built|develop(?:ed|ment)?|creat(?:e|ed|ion))\b/i.test(question);
  const movement = /\b(?:off[- ]?(?:the[- ]?)?ball|movement|moves?|runner|support)\b/i.test(question);
  return attack && (explanation || movement);
}
