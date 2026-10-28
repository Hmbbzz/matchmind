export const MODEL_PROFILE_VERSION = 'matchmind-model-profile/1.0';
export const MODEL_PROFILES = Object.freeze({
  'gpt-5-mini': Object.freeze({ defaultEffort: 'minimal', allowedEfforts: Object.freeze(['minimal']) }),
  'gpt-5.6-terra': Object.freeze({ defaultEffort: 'none', allowedEfforts: Object.freeze(['none', 'low']) }),
});
export const LEGACY_MODEL_PROFILE = 'gpt-5.6-terra';

// A deployment's name is opaque. Only trusted configuration chooses its model profile.
export function resolveModelProfile({ profile = LEGACY_MODEL_PROFILE, reasoningEffort } = {}) {
  if (typeof profile !== 'string' || !Object.hasOwn(MODEL_PROFILES, profile)) throw new TypeError('Unsupported model profile.');
  const settings = MODEL_PROFILES[profile];
  const effort = reasoningEffort ?? settings.defaultEffort;
  if (!settings.allowedEfforts.includes(effort)) throw new TypeError('Unsupported reasoning effort for this model profile.');
  return Object.freeze({ modelProfile: profile, reasoningEffort: effort });
}
