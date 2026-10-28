import matchmindHtml from './matchmind-shell.html?raw';

export const dynamic = 'force-dynamic';

export function GET() {
  // Hosted access remains dispatch-owned; no private-site self-fetch is used.
  return new Response(matchmindHtml, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff' } });
}
