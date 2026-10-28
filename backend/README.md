# Matchmind API and constrained prompt provider

The Node adapter defaults to deterministic rules with no model/network request. G independently verified a local Azure GPT-5 mini finite fact-selection path; it did not host a production API. H adds the same-origin Sites Worker/D1 adapter below. H deployment, real SIWC identity and native cloud acceptance remain separate QA/release gates.

## L: evidence-constrained attack explanations and causal real-data insights

L adds `POST /api/assistant/explain-attack` to both the Node adapter and production Worker. It is a separate **team/complete-chain** scope; it does not weaken the selected-player statistics validator. The request requires `session_id,match_id,team_id,chain_id,cutoff_ms,viewer_playhead_ms,question,mode,query_id`; modes are `casual|analyst`, time fields remain continuous stream milliseconds, and team/chain/all referenced evidence must be authorized and complete by the frozen cutoff. Unknown fields, an unrelated team, future chain, mismatched playhead or unsupported question are rejected before a provider request. Owner, exact Origin, persistent query-ID/hash/idempotency, unknown-not-retried and existing technical bounds remain. K's unlimited business counts remain.

The actual Responses request uses `prompts/attack-v1.system.md` / `attack-output-schema-v1.json` and `matchmind-attack-prompt/1.0`; the old statistics prompt/schema stay compatible. The packet contains exact frozen facts, participants, representative source-event claims, raw-audited camera observations and all limitations. The provider must choose an authorized explanation focus with exact supporting claim IDs, echo the scope/mode, cover every claim in structured steps, preserve action order and include all evidence/limitation IDs. Allowed foci are recorded sequence, progression supported by two completed-pass representatives, a recorded finishing shot, or a qualified camera movement. An explicit unavailable focus receives a direct statement and deterministic sequence candidate; there is no invented intent/created-space/counterfactual explanation. Foreign claims, unavailable shot/movement, omitted limitations, free narrative and reversed action order are rejected.

Casual renders a short evidence-specific explanation and essential source/unknown limitation. Analyst expands its evidence basis, timestamps, observations and full limitations. Both responses retain the same complete facts/claims/steps/limits for a frozen question; mode changes only expression. `structured_explanation.focus.selection` is `rule_default` or `validated_provider`; the latter includes injected protocol tests and is **not** a cloud-success badge. The outer provider/profile/status/cloud flags still control provenance. Rules fallback visibly says it uses the default focus. See [the exact L contract](../docs/iterations/L-insights-contract.md) before modifying browser validation.

New attack receipts are `evidence-receipt/1.2`, `scope_type:attack`, `player_id:null`, with explicit team/chain and authorized claim/observation references. The legacy D1 player_id column stores a private `team:<team_id>` scope key for these receipts only; the public receipt stays explicitly team-scoped. Resolve branches by receipt scope. Existing player receipts, stored result payloads, usage, unknown reservations and query hashes remain compatible; no DB migration/reset/secret change is introduced. Explicit modes are included in new request hashes; old player requests with no mode retain the original normalized hash byte algorithm and default Analyst display. New player responses echo mode while retaining their strict actor/topic validator.

`node scripts/build-match-insights.mjs` reads existing real public inputs and the local original SkillCorner tracking JSONL/CSV, writes only new `public/data/live/match-insights.json` plus L developer evidence, and does not regenerate old events/tracking/features. Movement cards require every native sample to be camera-detected, source-available and raw-coordinate verified, no known self-possession frame, >=800ms and >=5m displacement. Their own completed event determines publication, with no future chain link; completed attack cards may later refer to them. Opponent geometry uses the same continuously camera-detected subset, and unknown possession is explicit. Turning cards compare two fixed adjacent completed 30-second source-event windows; their coverage denominator is the expected 300 samples, not the number present. State labels remain transparent heuristic descriptions, not proved causes or major match turning points.

New L card/claim text and attack answer headers map second-half stream timestamps through real match metadata. `backend/worker/generated-clock.mjs` is regenerated from that metadata and hash-recorded by the existing backend input builder; `backend/match-clock.mjs` uses it internally. The old player API and every authorization/receipt time remain unchanged. No public clock-policy DTO is added.

The native request limit stays 700 output tokens, including reasoning. Developer enumeration of all legal focus outputs found a maximum 1024-byte JSON response (rough byte estimates 342–512 tokens, not an actual tokenizer or reasoning measurement). The longest packet plus prompt/schema was 16180 bytes and largest rules response 19098 bytes. Actual GPT-5 mini completion/latency/quality remains a separate acceptance step. No retry is added to mask incomplete output or uncertain transport.

## K: direct answers and unlimited question counts (pending independent acceptance)

K removes business lifetime, owner and session model-call quotas and the 200-query/receipt admission caps. Policy call/count fields are explicitly `null` (unlimited), not a large replacement integer. Legacy positive integer overrides and the old Node `MATCHMIND_MODEL_MAX_CALLS_PER_SESSION`, `MAX_TOTAL_CALLS` and `MAX_BUDGET_SESSIONS` variables are accepted for rollout compatibility but normalized to `null`; they no longer constrain question counts. Authentication, frozen scope, exact facts/citations, concurrency leases, request/response bytes, timeout/output tokens, session expiry and provider 429 handling remain. This does not upgrade the Azure subscription, extend trial credit expiry or remove Azure/Cloudflare service limits. No production secret, ledger or cloud resource is changed by these source edits.

The live input remains the real SkillCorner historical match. K does not integrate synthetic data or delete the standalone generator/archive. Questions combining the supported passing/crossing/shooting domains are answered directly using the existing `player_summary` facts. Out-of-scope metrics or unestablished roster identities receive a direct statement including the frozen player and cutoff, without asking for clarification, a topic choice, a player switch or another question. The prompt is `matchmind-prompt/2.1`; the answer schema remains `matchmind-answer/2.0`.

## Sites Worker and durable D1 boundary

H-TRANSPORT-01 (hosted acceptance pending): the Azure request now uses `redirect: manual`, because Workers does not implement `redirect: error`. Every 300–399 response is rejected before parsing, without reading Location or issuing another fetch. This preserves the fixed destination/credential boundary. The same response schema, mini/minimal profile, 8-second timeout and 700-token limit remain. Local workerd with all outbound traffic intercepted reproduced the previous pre-network `transport_failed`; its corrected dummy response passed the actual prompt/fact validator. This establishes runtime compatibility, not native Azure success.

Failures may add bounded `model_diagnostics.transport_stage` (`credential`, `fetch`, `response_read`, `candidate_parse`) and `transport_failure` (`unsupported_redirect`, `invalid_receiver`, `request_context`, `invalid_header`, `network_error`, `aborted`, `unclassified`). Only recognized fixed runtime signatures/network codes produce a category; otherwise it remains unclassified. Original exception text/name/cause, headers, endpoint, key, question and identity are never emitted. Fields use the existing owner-scoped response/D1 payload; no console log or diagnostic endpoint is added. Historical unknown rows are unchanged and cannot retroactively recover the original exception; reservations are never reset or refunded.

The production route imports `handleMatchmindRequest(request, env)` from `backend/worker/index.mjs`. It uses standard Request/Response and `env.DB`; it never starts a Node listener or fetches the private Site's public URL. `backend/worker/build-inputs.mjs` reads fixed `public/data` inputs and the current v2-family prompt/schema, generating a **server-only** projected module. Coordinates, physical metrics and video are excluded. The generated manifest records source/projection/quality-clock hashes. The Node-only prompt file loader remains in `prompt-contract.mjs`; `prompt-core.mjs` contains the shared validator/renderer.

All API operations require the dispatch-injected `oai-authenticated-user-id`, including health. Sessions and receipts are authorized against that owner on every operation; a session ID or Sites service-bypass bearer supplies no owner identity. This handler is supported behind Sites dispatch only, where the platform owns identity-header injection. Portable mock auth is development evidence only. POST requests require exact same-origin `Origin`; no wildcard CORS or alternate client endpoint is enabled. Dispatch retains sign-in routes.

The G route shapes remain, with H additions:

- `POST /api/assistant/query` requires `query_id` (bounded string). Unknown fields remain invalid. Frozen context/facts/precise numeric values/null and representative evidence validation are unchanged.
- `POST /api/sessions` starts at trusted stream time 0. A build-time quality-only gap schedule releases long missing sections after a 450 ms hold, then resumes 1× server wall time. The first gap 22,100→34,300 ms releases at 22,550 ms wall elapsed. Client `?at`, player changes and cutoff fields cannot advance it. Pausing the view does not pause the server's released ceiling; earlier requests remain valid. Clock release is monotonic in D1 and versioned `historical-gap-clock/1.0`. Short gaps below 2,000 ms remain 1×. Browser interpolation can begin its hold about 50 ms earlier; the frontend may wait briefly for the original frozen cutoff, never rewrite it.
- Session views add `authentication: siwc-owner` and `clock_policy`. Health first checks all three tables and required columns read-only (missing/partial schema→safe 503), then reports configuration readiness for this request, never another owner's latest answer or global ledger totals; `cloud_connected` is always false in health. Only a particular validated native answer receives `model_validated` and cloud=true. Injected providers remain `contract_validated`, cloud=false.
- Same owner/query ID + same normalized frozen request returns the persisted result (`idempotency.status: replayed`), without a provider call. Different request→409 `QUERY_CONFLICT`; active pending→409 `QUERY_PENDING`. A stale pending reservation becomes `unknown_not_retried`, returns its frozen rules fallback and never resends.

`db/schema.ts` and the ordered `drizzle/` migrations define sessions, immutable receipt payloads and query/reservation ledger. Apply local migrations through the starter's documented local D1 command; Sites applies hosted migrations when publishing. Request handling never creates schema. Security-critical operations use a new D1 `withSession('first-primary')`. A model-attempt reservation is one conditional `INSERT … SELECT`, checking active leases only, with unique owner/query ID. **Only `meta.changes === 1` permits a provider request.** No isolate Map controls authority or money. Receipt/result completion is a D1 batch transaction.

Production technical bounds remain **2 active model leases, 8,000 ms timeout and 700 output tokens**. There is no lifetime, owner, session, question or representative-receipt count quota in D1 admission. Health reports `model_call_limits: unlimited`. Unsupported/rules/auth/cutoff failures make no model reservation. A concurrency rejection freezes `fallback_busy` without calling a model; reusing that query ID replays the same result. Every reservation, usage record and failure/unknown result stays in the durable audit; historical rows are not reset, refunded or automatically retried. Transport/timeout uncertainty retains its 60-second lease. Lease expiry releases concurrency and does not prove Azure stopped computing. Azure trial credits, provider rate limits and platform limits remain external constraints.

Sessions expire after two hours, with at most 10 active sessions per owner and 100 overall. These are active-session/storage safeguards, not question quotas. There is no 200-query or 200-receipt admission ceiling in a production session. Existing expired unpaid query/receipt/session TTL cleanup remains; **model-reserved ledger rows are retained** for audit and idempotency. No rollout migration, deletion, reseed or refund is introduced. Full question/prompt/credentials are never logged or stored in the query ledger; it stores a normalized request SHA-256 and the bounded answer. Model diagnostic IDs/usage remain sanitized and owner-scoped.

Required runtime configuration keys (values belong only in Sites server environment, not browser/source/hosting manifest):

| Key | Required value/type |
| --- | --- |
| `MATCHMIND_PROVIDER` | `rules` (default/off) or explicitly `responses` |
| `MATCHMIND_ENDPOINT_KIND` | `foundry_resource` for the current resource transport |
| `MATCHMIND_MODEL_ENDPOINT` | Trusted generic resource root or `/openai/v1`; whitelist validation remains |
| `MATCHMIND_MODEL_DEPLOYMENT` | Existing deployment name, server-only |
| `MATCHMIND_MODEL_PROFILE` | Explicit `gpt-5-mini` |
| `MATCHMIND_MODEL_REASONING_EFFORT` | `minimal` |
| `MATCHMIND_AUTH_MODE` | `api_key` for resource kind (also its default) |
| `MATCHMIND_API_KEY` | Runtime **secret**, never a public variable |

H does not read a local `.env` or install an SDK at request time. Worker config is taken only from its trusted `env`; browser/model input cannot choose endpoints, auth, model, cutoff or budgets. The Worker requires the selected mini/minimal profile; Node's explicit Terra compatibility remains. Worker uses the fixed technical timeout/token policy and no business call quota. To stop new native inference, set `MATCHMIND_PROVIDER=rules` through the approved runtime channel, preserving the D1 ledger. Missing/invalid configuration yields a per-answer rules fallback and cloud=false. Revoke/rotate the runtime secret separately; a deployment rollback does not do that.

QA-only code injection: `createWorkerApi({fixture,promptBundle,now,idFactory,initialCutoffMs,providerFactory,policy}) -> {handle(request,env)}`. `providerFactory({env,config})` returns the existing bounded `generate` interface. Policy injection may only reduce technical bounds. Removed business-quota fields accept legacy positive integers but normalize to `null`; they cannot reinstate call/query/receipt quotas. No HTTP/env debug offset exists in the production handler. Use two adapters over the **same actual local D1 binding** and restart its persistent runtime for durability tests; a hand-written Map/mock D1 cannot establish those guarantees.

Remaining limits: finite three-topic/summary selection with five safe summary sentences, no free-form reasoning/memory; simulated completion availability, no provider revision handling; original full-match browser assets remain downloadable (GAP-01 open). Production SIWC/secrets/D1 migration/deployment and real cloud/browser acceptance must be independently recorded before claiming hosted success.

## Run

From the project directory, using the existing Node 26 runtime:

```sh
node backend/server.mjs
```

The server binds to `127.0.0.1:4174`. Set `MATCHMIND_API_PORT` to change the port. No package installation is required. Only the trusted loader reads the fixed local `public/data/demo.json` and `public/data/live/chance-chains.json`; HTTP requests cannot supply file paths.

For local frontend integration, configure `MATCHMIND_ALLOWED_ORIGINS` as the exact comma-separated local HTTP origins (for example `http://127.0.0.1:4173,http://localhost:4173`). It accepts at most eight localhost/loopback origins, no wildcard, URL path or remote host; no origins are allowed by default. The API still binds only to loopback. The model endpoint and credentials are never sent to the browser.

```sh
curl http://127.0.0.1:4174/api/health
curl -X POST http://127.0.0.1:4174/api/sessions \
  -H 'Content-Type: application/json' \
  -d '{"match_id":"skillcorner_2017461"}'
```

Copy the returned local session ID into the next request. A new session starts at stream time 0. Its visible ceiling advances at 1× elapsed server time; requesting an earlier cutoff is allowed. The public API cannot fast-forward a session.

```sh
curl -X POST http://127.0.0.1:4174/api/assistant/query \
  -H 'Content-Type: application/json' \
  -d '{"session_id":"<session_id>","match_id":"skillcorner_2017461","player_id":"sk_player_50955","cutoff_ms":0,"viewer_playhead_ms":0,"question":"How is this player crossing?"}'
curl http://127.0.0.1:4174/api/sessions/<session_id>
curl -X POST http://127.0.0.1:4174/api/replay/resolve \
  -H 'Content-Type: application/json' \
  -d '{"session_id":"<session_id>","receipt_id":"<receipt_id_from_a_later_answer>"}'
```

At kickoff the facts are valid zero counts, completion rates are null, and no event receipt exists yet. Later queries can return receipts for already completed actions. `<...>` values above are placeholders, not credentials.

## Public routes and boundaries

| Route | Input / behavior |
|---|---|
| `GET /api/health` | Prompt readiness, configured provider, last attempted model status and bounded call counters; no endpoint or credential |
| `POST /api/sessions` | `{match_id}` only; returns opaque local session ID, ceiling and expiration |
| `GET /api/sessions/:id` | Returns that session's current ceiling, without raw events |
| `POST /api/assistant/query` | Required `session_id, match_id, player_id, cutoff_ms, question`; optional `viewer_playhead_ms, event_id, chain_id, query_id` |
| `POST /api/replay/resolve` | `{session_id, receipt_id}`; returns the original frozen receipt/clip |

Times must be non-negative safe integers in continuous stream milliseconds. If supplied, `viewer_playhead_ms` must equal `cutoff_ms`. Unknown fields, including debug clocks/start offsets, are rejected. Event/player/chain references must match; completed chains require all action/support/key references to exist and be available by the cutoff. No future actions, chain results, final match totals, forecast outcomes or complete raw fixture are returned. Scores are recomputed from visible inferred goal events.

API `matchmind-local-rules/1.1` authorizes session, cutoff and all event/chain references first, then returns `answerability:{status,topic,reason,supported_topics}`. Single-domain passing/crossing/shooting questions receive only the four relevant numeric facts; combinations of supported domains and supported finite player-summary phrases receive an overview of the same three domains (12 numeric facts), without a clarification turn. A missing denominator gives null; incomplete xG gives null and `xg_missing`. Rules answers use the same topic and facts. Physical condition, history, tactics, score, forecasts and cross-player comparisons are explicitly outside this endpoint's question scope. Unsupported metrics or ambiguous identities receive a direct English scope statement including the frozen player/cutoff, empty facts/receipts, `scope_unsupported` / `scope_ambiguous`, and make no model call.

This is a versioned behavior change: API 1.0's unrelated general pass/shot answer is removed. Single-topic `facts` no longer contain unrelated metrics; `xg_method` remains on the pure fact helper but is described in methodology for API answers. HTTP input fields and session/cutoff authorization are unchanged. Ordinary finite summary entry points such as “How is he playing?”, “How has he played?” and “How is this player doing?” remain supported. Routing is finite English keyword/template matching, with a legacy crossing keyword in Chinese; it does not understand arbitrary paraphrases, negations or multilingual conversation.

Receipts (`evidence-receipt/1.1`) add trusted `supported_topics` and `topic_event_ids`, derived only from already visible actions by the selected player as actor. A receiver is not counted as the passer; a teammate's shot cannot support this player's shooting statistics. Shooting anchors select that player's shots. For an explicit `event_id`/`chain_id`, a supported question must match its topic and actor or returns 400 `INVALID_REQUEST`. This addresses conflicting references in one frozen request; it does not prohibit a later query choosing another valid player/topic/cutoff within the same session ceiling. Unsupported questions still undergo the original visibility/reference checks before refusal, so they cannot bypass authorization.

Receipts remain scoped to the issuing session and original cutoff. They contain visible event IDs and a clip ending at or before that cutoff; replay resolution never uses a newer playhead. Clips are bounds/manifests only. Cross-session receipt IDs return 404. In the local Node adapter, sessions expire after two hours; at most 100 sessions and a rolling cache of 200 receipts per session are retained by default. The cache never blocks a new question; it evicts older local replay references. A trusted smaller cache setting is raised to at least three so every receipt of the current complete summary is immediately resolvable. Production D1 uses session TTL rather than this rolling-cache count and has no question/receipt admission quota.

Errors are JSON `{error:{code,message}}`; `ApiError` exposes `status` and `code`. Statuses include 400 `INVALID_REQUEST`, 403 `CUTOFF_NOT_ALLOWED` / `CONTEXT_NOT_VISIBLE` / `ORIGIN_NOT_ALLOWED`, 404 `NOT_FOUND`, 410 `SESSION_EXPIRED`, 413 `PAYLOAD_TOO_LARGE`, 415 `UNSUPPORTED_MEDIA_TYPE`, 429 `CAPACITY_EXCEEDED`. Request bodies are capped at 16 KiB. Unknown routes return 404 and known routes with wrong methods return 405. Default browser origins are rejected; there is no wildcard CORS.

## Independent QA integration

`query-service.mjs` exports `createQueryService`, `queryPlayerFacts`, `summarizePlayerEvents`, `eventAvailableAtMs`, `ApiError`, and `API_VERSION`. `server.mjs` exports `loadSkillCornerFixture` and `createApiServer` (a Node `http.Server`). Importing either file does not start a listener.

Trusted test harnesses can construct `createQueryService({fixture:{demo,chanceChains,sourceVersion}, now, initialCutoffMs, sessionTtlMs, maxSessions, maxReceiptsPerSession, idFactory})`. `chanceChains` accepts an array or `{chains:[]}`; it is optional. The fixture is cloned on construction. The clock and initial offset are code-level dependencies only, never request options. Tests may advance an injected clock instead of waiting in real time. `queryPlayerFacts` is a pure cutoff function without session authorization and is never directly exposed over HTTP.

## Optional prompt path

The pipeline is `rulesService.query` authorization → finite supported-topic/refusal decision → immutable topic fact packet → actual system prompt/schema in a Responses request → local exact-value/topic/reference validation → server-rendered answer. The model never receives the bearer session ID, whole fixture, future events, raw tracking, arbitrary file access, or a tool that advances the cutoff. Every question is independent; this is not a migration of the browser's eight football intents or a conversation-memory implementation.

`prompts/assistant-v2.system.md` (`matchmind-prompt/2.1`) and `output-schema-v2.json` (`matchmind-answer/2.0`) are loaded by `loadPromptBundle`; v1 files are retained as prior versions. A v1 model candidate is rejected. The bundle hash is returned for accepted output. The schema uses Responses `text.format`, as documented by [Microsoft structured outputs](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/structured-outputs) and [official OpenAI documentation](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses). Model capability is separate from account quota, an existing deployment and real request-quality acceptance.

The model must include exactly the packet's `required_fact_keys` once (4 for a single topic, 12 for the limited summary), echo `topic` and scope, select compatible receipt IDs, and choose one of five fixed safe English sentences. Counts, known-outcome denominators, ratios and nulls are compared exactly without rounding. Arbitrary narrative, including “nine goals” or “a hat-trick”, is rejected. Each nonzero domain in trusted `required_evidence_topics` requires at least one compatible chosen receipt, including every observed domain in a player summary; a crossing receipt can also cover passing, but cannot replace shooting evidence. Zero attempts require none. Summary anchors cover those domains with at most three representatives. The local cache always retains the current answer’s complete representative coverage; a tiny legacy cache setting cannot force a topic-selection request or reject the summary. The server formats all quantities. These are finite templates and representative event provenance, **not proof of arbitrary semantic relevance, causal truth, model quality or complete aggregate provenance**.

Display formatting is separate from that contract. `answer-display.mjs` formats the frozen stream clock as `MM:SS` (`600000 -> 10:00`, minutes may exceed 59), and completion as one decimal percent with the known-outcome denominator (`6/7 -> 85.7% (6/7 known outcomes)`). Zero with a valid denominator is `0.0%`; null remains unavailable. Raw facts/candidate values and replay cutoffs are unchanged, and rounded model values are still rejected. Both rules and model display text use the same frozen clock.

Limitations describe each answer's actual path. Unconfigured rules mode says no provider is configured; a configured scope/busy response says no model was called for that question; an attempted but unvalidated model response says that question fell back to rules. A successful response identifies its model/contract path. A rules response never globally asserts that no cloud service is connected simply because a previous question used a different path.

Keep `MATCHMIND_PROVIDER=rules` until a deployment, permissions and budget have been approved. The generic `.env.example` is not a credential store. Existing Node `--env-file=backend/.env` startup remains supported if a secure operator already supplies such an ignored file; this iteration does not create or inspect a real env file. The preferred in-memory startup below avoids persisting credentials.

| Server-only configuration | Accepted values |
|---|---|
| `MATCHMIND_PROVIDER` | `rules` (default), `responses` |
| `MATCHMIND_ENDPOINT_KIND` | `foundry_project`, `foundry_resource`, `azure_openai` |
| `MATCHMIND_MODEL_ENDPOINT` | Project base `https://example-resource.services.ai.azure.com/api/projects/example-project`; Foundry resource root `https://example-resource.services.ai.azure.com`; Azure OpenAI resource root `https://example-resource.openai.azure.com`. Resource roots optionally end `/openai/v1` |
| `MATCHMIND_MODEL_DEPLOYMENT` | Existing deployment name, not a catalog model identifier assumed to be deployed |
| `MATCHMIND_MODEL_PROFILE` | Explicit `gpt-5-mini` or `gpt-5.6-terra`; omitted values preserve legacy Terra behavior |
| `MATCHMIND_AUTH_MODE` | Foundry project: `bearer` only; Foundry resource: `api_key` only in this adapter; Azure OpenAI resource: `bearer` default or `api_key` |
| `MATCHMIND_MODEL_REASONING_EFFORT` | Mini: `minimal` only (default); Terra: `none` default or `low`; incompatible values are rejected |
| `MATCHMIND_ACCESS_TOKEN` | Short-lived Entra token; server-only, never logged |
| `MATCHMIND_API_KEY` | Resource API key when `authMode=api_key`; never accepted for a Foundry project |
| `MATCHMIND_ALLOWED_ORIGINS` | Exact comma-separated localhost/loopback HTTP origins for the local frontend; default empty |

The project endpoint appends `/openai/v1/responses` and uses [Foundry project Responses + Entra authentication](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/responses-api). Trusted code may inject `tokenProvider({signal}) -> Promise<string>` for renewal; this implementation does not install an SDK or automatically sign in. [Microsoft's Entra guidance](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/configure-entra-id) describes token acquisition and scope. Azure OpenAI resource mode uses its [documented Responses resource endpoint with `api-key` or Bearer authentication](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses). An expired static token causes a safe rules fallback; no automatic refresh or retry occurs.

`foundry_resource` preserves the actual `*.services.ai.azure.com` resource hostname and sends the resource key in `api-key`; it does not guess a replacement `openai.azure.com` hostname. [Microsoft endpoint guidance](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/endpoints) accepts both resource hostname formats, and the [official Responses REST authentication reference](https://learn.microsoft.com/en-us/rest/api/microsoft-foundry/azureopenai/responses) documents that header. Root or `/openai/v1` is accepted as configuration; a project path or already-complete `/responses` URL is rejected for this kind. Project authentication remains a separate Entra-only path.

The user selected **Azure GPT-5 mini** for iteration G. Explicitly set its profile; `model` remains the operator's deployment name and is never rewritten or guessed from that name. [Official GPT-5 mini documentation](https://developers.openai.com/api/docs/models/gpt-5-mini) lists Responses and structured outputs, while [Microsoft reasoning guidance](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/reasoning) distinguishes original GPT-5 `minimal` from later models' `none`. Mini requests send `reasoning:{effort:"minimal"}`; `none` is rejected before a transport call. Existing Terra configurations retain `none`/`low` compatibility, including omitted-profile legacy behavior. There is no automatic substitution of other deployments or profiles.

Both profiles retain the current **8-second/700-output-token defaults** initially. Reasoning consumes that output budget, and `incomplete` can occur before a visible answer. Independent real-cloud QA must measure latency, usage, completion and fact/reference acceptance before claiming those caps usable or changing them; a compatible request schema alone proves neither. The profile label in health/answers is trusted configuration metadata, not a general model-identity attestation. No GPT-5 mini cloud quality result is asserted by the developer's mock checks.

## Safe local startup and frontend contract

`backend/launch-local.mjs` exports `startLocalApi({env={},port?,initialCutoffMs=0,fixture?,now?,fetchImpl?,tokenProvider?}) -> Promise<{address,service,close}>`. Importing it reads no environment or secrets, opens no listener and calls no model. The host/operator may pass an existing secure **in-memory** configuration object or trusted short-lived `tokenProvider`; the helper never returns or logs that configuration. Only the returned loopback `address` needs to be shared with QA. Direct `node backend/launch-local.mjs` consumes the process environment when explicitly launched, as does the original server entry point. No dependencies or cloud resources are installed/created by the helper.

```js
// secureConfigAlreadyInMemory is supplied by the operator's existing secure channel.
import { startLocalApi } from './backend/launch-local.mjs';
const local = await startLocalApi({ env: secureConfigAlreadyInMemory, initialCutoffMs: 600000 });
// Share local.address only; inspect /api/health, then later await local.close().
```

`createConfiguredService` is exported from `server.mjs` for a fixture/clock harness without a listener; it accepts the same trusted service configuration. `initialCutoffMs` is code-level startup configuration, not an env-file/request debug clock. For historical local QA it can start at 600000 instead of waiting ten minutes. Health reports `simulation_start_ms` and `simulation_mode=historical_local_1x|historical_local_offset`; every session ceiling then advances at 1× elapsed trusted time. Production authentication and GAP-01 are not established by this local harness. Public create-session/query fields still reject cutoff/clock overrides.

The local frontend should create a session on startup, poll its ceiling via `GET /api/sessions/:id`, then freeze player/event/chain/cutoff at Send. A seek or gap skip beyond that ceiling must display an unavailable/403 state; never silently change an old question's cutoff. Explicit mismatched event/chain context remains 400, so do not silently drop context to retry as if it were the same question. Replay resolves only the original issued receipt. Network/config/provider failures must remain visibly rules/unavailable, with the frozen context intact.

After those authorization checks, the backend also checks explicit known-roster names before topic routing/provider use. `actor-scope.mjs` exports `checkQuestionActor(question,roster,selectedPlayerId)`. Multi-token full/display aliases use normalized accents, case, punctuation/whitespace and whole-token boundaries; the longest explicit alias wins over a contained shorter name. Another named player or several named players receives a clear scope refusal; duplicate aliases or surname-only name contexts receive a direct statement that the identity cannot be established, including the frozen player/cutoff; no clarification is requested. Selected full/display names remain allowed. Bare ordinary words such as “May” in “May I see his passing?” are not treated as identities. Ambiguous names never change the selected player. This is a finite known-roster check, not arbitrary NER; unknown names and unlisted paraphrases remain limitations.

Actual live acceptance is `provider=foundry_project_responses|foundry_resource_responses|azure_openai_responses`, `provider_status=model_validated`, `cloud_connected=true`. The new safe metadata is `model_profile=gpt-5-mini`, `reasoning_effort=minimal`. Injected transport/provider results remain `responses_contract/contract_validated/cloud_connected=false`; failures are rules with `fallback_*`, and out-of-scope requests are `scope_*` without a model call. Live acceptance still means bounded template/fact validation, not free football reasoning. Frontend integration and its visual validation are separate agents' scope.

Destinations must be HTTPS on the supported Azure hostname/path patterns; URL credentials, ports, queries and fragments are rejected. Redirects are disabled. HTTP callers and model output cannot configure endpoints, credentials, tools or deployment names. No request headers, entire prompts, provider error bodies or raw rejected model output are logged/returned.

| Model limit | Default | Allowed range | Environment suffix after `MATCHMIND_MODEL_` |
|---|---:|---:|---|
| Timeout | 8000 ms | 10–15000 | `TIMEOUT_MS` |
| Concurrent calls | 2 | 1–4 | `MAX_CONCURRENT` |
| Output tokens | 700 | 64–1500 | `MAX_OUTPUT_TOKENS` |
| Response body | 65536 bytes | 256–262144 | `MAX_RESPONSE_BYTES` |
| Request body | 32768 bytes | 256–65536 | `MAX_INPUT_BYTES` |
| Attempts per session | unlimited (`null`) | removed; legacy positive integer ignored | `MAX_CALLS_PER_SESSION` (deprecated) |
| Total process attempts | unlimited (`null`) | removed; legacy positive integer ignored | `MAX_TOTAL_CALLS` (deprecated) |
| Remembered budget sessions | unlimited (`null`) | removed; legacy positive integer ignored | `MAX_BUDGET_SESSIONS` (deprecated) |

Technical limits apply before/around one provider attempt per valid question. Timeouts cover token acquisition, fetch and body reads; AbortSignal is forwarded. There are no retries. Busy/oversized/unconfigured requests do not start a provider attempt. Node process attempts and reported usage remain observability counters only: they do not restrict future queries. Health explicitly reports `model_call_limits: unlimited` and the removed legacy fields as `null`. Process restarts reset only local observability, not a product allowance. Production uses the persistent audit/idempotency described above.

`createAssistantService({rulesService,promptBundle,provider?,limits?,configurationError?})` exposes the same methods, but `query(input)` returns a Promise; `createApiServer` awaits it. The original `createQueryService.query` stays synchronous. `getHealth()` adds prompt readiness, provider state, attempt counters and provider-reported usage totals. Validation/cutoff errors still use the original HTTP errors before any provider call. Failures return HTTP 200 with the same topic's rules answer and a safe `fallback_<code>`, including `output_budget_exhausted` for `incomplete_details.reason=max_output_tokens`, or `incomplete_output` for other incomplete responses. There is no raw error detail or retry. Configuration/prompt loading failure keeps rules available.

Attempt responses may include `model_usage:{input_tokens,output_tokens,total_tokens,reasoning_tokens}` (null when absent/invalid) and whitelisted `model_diagnostics` (`http_status`, fixed response/incomplete status, `reasoning_effort`, `model_profile`). Each count is a non-negative safe integer capped at 10 million; missing reasoning usage remains null. Health totals count only reported valid usage and separately track unknown reasoning counts. They are bounded local provider reports, not measured billing or a currency budget; contract usage remains explicitly simulated.

For source provenance, diagnostics may add `upstream_model` from actual response JSON `model` (ASCII alphanumeric/`.`/`_`/`-`, 1–128), `response_id` from JSON `id` (`resp_` plus safe alphanumeric/`_`/`-`, at most 160), and `request_id` from the first valid `x-request-id`, `apim-request-id` or `x-ms-request-id` header (safe ASCII alphanumeric/`.`/`_`/`-`, 1–160). Absent/invalid values are omitted, never filled from configuration. Credential echoes are filtered. HTTP error bodies remain unread/unreturned; a legal header request ID can still be retained. These provider-supplied IDs distinguish configured profile from reported upstream model and aid tracing; they are not AppInsights telemetry or a general identity proof. No endpoint, prompt, key, bearer token, raw error/body or arbitrary diagnostic text is retained.

For independent contract tests, use `createResponsesProvider({config:readProviderConfig(dummyEnv),fetchImpl,tokenProvider?})`; `fetchImpl` receives a legal dummy Azure URL and must return a controlled `Response` without contacting it. Arbitrary trusted providers may implement `generate({bundle,packet,question,signal}) -> Promise<{candidate}>`. `buildFactPacket`, `buildResponsesBody`, `validateModelAnswer`, `renderModelAnswer`, `SAFE_SUMMARIES`, and `NUMERIC_FACT_KEYS` are exported from `prompt-contract.mjs`. There is no public debug clock, provider injection or cancel field.

`question-scope.mjs` exports `ANSWER_TOPICS` (three domains), `SUMMARY_TOPIC`, `TOPIC_FACT_KEYS`, `TOPIC_ATTEMPT_KEY`, `requiredEvidenceTopics`, `classifyQuestion`, `eventTopics`, `eventSupportsTopic`, and `deriveReceiptSupport`. Classifier output is `{status,topic,reason,supported_topics}`. `deriveReceiptSupport(visibleEvents,playerId)` produces `{supported_topics,topic_event_ids}`; the caller remains responsible for availability authorization. `requiredEvidenceTopics(topic,facts)` derives nonzero domains; the fact packet independently checks its source metadata and available evidence, and the candidate validator checks chosen coverage. `sanitizeProviderUsage` and `sanitizeProviderDiagnostics` are exported for controlled tests.

Example candidate (the values must exactly match that specific frozen packet):

```json
{"schema_version":"matchmind-answer/2.0","scope":{"match_id":"example-match","player_id":"example-player","cutoff_ms":0},"topic":"crossing","summary":"Only recorded actions in the frozen snapshot are described.","fact_claims":[{"key":"crosses_attempted","value":0},{"key":"crosses_completed","value":0},{"key":"cross_outcomes_known","value":0},{"key":"cross_completion","value":null}],"receipt_ids":[]}
```

| State | `provider` / `provider_status` | Cloud flag |
|---|---|---|
| Default rules, prompt loaded | `rules` / `deterministic_fallback`, `prompt_ready=true`, `model_configured=false` | false |
| Configured, no call yet (health) | `responses_ready` / `ready_not_called` | false |
| Injected transport/provider accepted | `responses_contract` / `contract_validated` | false |
| Native Azure transport accepted | `foundry_project_responses`, `foundry_resource_responses` or `azure_openai_responses` / `model_validated` | true |
| Model attempt failed | `rules` / `fallback_<code>` | false |
| Unsupported / ambiguous after authorization | `rules` / `scope_unsupported` or `scope_ambiguous`; no attempt | false |

`cloud_connected` describes the latest completed model attempt for health, and that answer's actual path for a query. Contract/stub results never claim live inference. No real-cloud state has been verified in this iteration.

## Remaining limits

The opaque session ID is a local bearer identifier, not production authentication. No persistent sessions, SDK, synthetic adapter, late-revision processing, telemetry exporter, Fabric/Blob, or frontend API connection is implemented. An optional model transport is now implemented; no real model quality, Azure deployment or production integration has been accepted. Explicit event availability (when present in a trusted fixture) is respected, but the current SkillCorner data still uses `max(t, q.endMs)` as simulated availability; provider publication/revision auditing remains GAP-02.

The deployed static site still allows full-match files to be downloaded. The new API's request boundary does not resolve site-wide GAP-01 or provide a production security guarantee. This prototype neither changes hosting configuration nor creates Azure resources.
# S: display team identities and durable data reconciliation

The active display names are Lumen Vale FC (LUM) and Ember Coast United (ECU). The real SkillCorner source/version, stable IDs, observations, quantities and times remain unchanged. `public/team-identities.js` is the canonical display catalog. `backend/team-identity-policy.mjs` contains internal legacy labels used only for controlled migration and provenance. Historical third-party archives and earlier QA records retain their original labels.

`drizzle/0003_boring_magneto.sql` creates only `mm_team_identities` and the private `mm_team_identity_audit` structure. It does not seed or rewrite existing rows. The separate authenticated data operation is `POST /api/admin/team-identities`, JSON `{"action":"status"}` or `{"action":"apply"}`. It requires the existing trusted Sites identity and same-origin guards plus an exact match in `MATCHMIND_ADMIN_OWNER_IDS`, a runtime JSON array of stable **site dispatch owner IDs**. An account ID or browser-supplied identity is not a substitute. Missing/invalid allowlist fails closed with 403. Do not store actual owner IDs in source, documentation or evidence.

Apply seeds the two fixed catalog rows and processes at most five legacy query/receipt/story rows per call. It accepts no caller-selected owner, table, SQL, names or source version. The receipt reports `migration_id`, `batch_limit`, `canonical_seeded`, `complete`, `total_changed`, per-table `scanned/changed/remaining/blocked`, and `model_called:false`. Repeat the bounded operation until `complete:true`; any remaining or blocked row prevents a completion claim. A batch of blocked rows requires review before proceeding. No raw row contents, owner IDs or audit before images are exposed by this endpoint. There is no public audit reader or rollback action.

For each changed row, D1 stores the original serialized value and before/after SHA in the internal audit table, and atomically compares/updates the exact original JSON. Story snapshot integrity and frozen scope are checked before replacing the team labels, then the new complete snapshot is validated and its SHA recomputed. Request hashes, source/story policy versions, query status/reservations/usage/diagnostics, session and receipt/clip/story/share IDs and all numeric values stay unchanged. Unknown model attempts are never resent. Already authorized query replay or private/shared story reads can reconcile exactly their authorized row to bridge a deployment window; this does not grant cross-owner scanning or audit access.

Rollback is a supervised maintenance operation, not an ordinary application feature: restore an audit before image only when the current JSON digest still equals its recorded after digest, and restore its prior story SHA. Roll back fixture/code and active data together. New stories saved after the identity change need the deterministic inverse label conversion and validation against the old fixture before rolling back the code. Never overwrite a concurrent change or delete original audit/usage rows. The audit before images are the explicit protected exception to active-label replacement.

