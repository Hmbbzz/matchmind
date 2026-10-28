import { env } from 'cloudflare:workers';
import { handleMatchmindRequest } from '../../../backend/worker/index.mjs';

export const dynamic = 'force-dynamic';

// The backend owns SIWC/owner/Origin/cutoff checks and persistent budgets.
// The platform supplies env bindings; browser JSON cannot select an endpoint.
export function GET(request: Request) { return handleMatchmindRequest(request, env); }
export function POST(request: Request) { return handleMatchmindRequest(request, env); }
export function OPTIONS(request: Request) { return handleMatchmindRequest(request, env); }
