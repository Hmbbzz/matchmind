import { ApiError } from '../query-service.mjs';

const HTTPS_COOKIE = '__Host-matchmind-visitor';
const LOCAL_COOKIE = 'matchmind-local-visitor';
const TOKEN = /^[a-f0-9]{64}$/;
const hex = value => Array.from(value, byte => byte.toString(16).padStart(2, '0')).join('');

// Sites dispatch owns/strips oai-authenticated-* headers. Never expose this
// Worker directly outside that platform boundary or accept another owner header.
// Anonymous identity is an independent 256-bit browser capability, never an
// account ID, session ID, client-selected owner field or the shared Azure key.
export async function requestIdentity(request) {
  const owner = request.headers.get('oai-authenticated-user-id');
  if (owner !== null) {
    if (!owner || owner.length > 256 || /[\x00-\x20\x7f]/.test(owner) || owner.startsWith('anonymous-v1:')) throw new ApiError(401, 'AUTH_REQUIRED', 'The account identity is invalid.');
    return Object.freeze({ owner, authentication:'siwc-owner', setCookie:null, signedIn:true });
  }
  const url = new URL(request.url);
  const secure = url.protocol === 'https:';
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (!secure && !(url.protocol === 'http:' && loopback)) throw new ApiError(403, 'HTTPS_REQUIRED', 'Use the secure website.');
  const name = secure ? HTTPS_COOKIE : LOCAL_COOKIE;
  const cookies = (request.headers.get('cookie') ?? '').split(';').map(part => part.trim()).filter(part => part.startsWith(`${name}=`));
  let value = cookies.length === 1 ? cookies[0].slice(name.length + 1) : null;
  let setCookie = null;
  if (!value || !TOKEN.test(value)) {
    value = hex(crypto.getRandomValues(new Uint8Array(32)));
    setCookie = `${name}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=7200${secure ? '; Secure' : ''}`;
  }
  const digest = hex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))));
  return Object.freeze({ owner:`anonymous-v1:${digest}`, authentication:'anonymous-cookie', setCookie, signedIn:false });
}

export function withIdentityCookie(response, identity) {
  // Errors (including an anonymous saved-story request during startup) must
  // not race a successful AI bootstrap by overwriting its browser identity.
  if (!identity.setCookie || !response.ok) return response;
  const headers = new Headers(response.headers);
  headers.append('set-cookie', identity.setCookie);
  return new Response(response.body, { status:response.status, statusText:response.statusText, headers });
}
