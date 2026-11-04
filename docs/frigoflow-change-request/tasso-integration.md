# Tasso integration — blocked, not implemented

Official website inspected on 2026-11-03: https://www.tassoinc.com/ . Public search did not establish an official API contract. This does not establish that a private API is unavailable. No endpoints, credentials, authentication method or production behavior have been invented.

All of the following require vendor documentation and account-specific confirmation: authentication/scopes, kit/order operations, shipment creation, outbound status/tracking, collection/returns, webhooks or polling, report shipping/delivery, rate limits, errors and sandbox access. No API behavior has been verified. Tasso is treated only as a proposed logistics provider; no clinical processing or report generation is attributed to it.

Proposed internal interface, to adapt to the existing language and services after source review:

- capabilities(): explicit supported operation flags, default false.
- requestKit(orderReference, approvedPayload, idempotencyKey): only if vendor supports creation.
- getLogistics(providerReference): only if retrieval is documented.
- normalizeVerifiedEvent(payload): provider-specific mapping preserving raw status and stable order references.

This is an interface design, not runnable or verified integration code. Unsupported operations must return an explicit unavailable result without simulated fulfillment. Webhooks require documented verification, replay controls and event uniqueness; otherwise enable documented polling with bounded concurrency. Use finite timeouts; retry transient reads with bounded exponential backoff/jitter and documented rate-limit handling; retry creates only with supported idempotency or reconciliation. Redact credentials and PHI from logs. Quarantine unknown events rather than mark milestones complete.

Environment variable names must follow the verified auth contract and existing configuration. Keep credentials server-only in approved secret storage; do not add guessed Tasso secret variables to the marketing prototype. Preserve historical Terra data, IDs and provider attribution, while disabling only new Terra initiation after reviewed cutover.
