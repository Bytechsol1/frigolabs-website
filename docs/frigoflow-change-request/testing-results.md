# Testing results — 2026-11-03

- Dependency installation: passed after permitted network access; package-lock.json created. Initial offline install failed ENOTCACHED; restricted network retry failed ECONNREFUSED.
- Production build: passed on Next.js 16.4.4; root route prerendered successfully. Initial restricted build compiled but worker launch failed EPERM; permitted retry completed successfully.
- TypeScript: npm run typecheck passed (tsc --noEmit).
- Production HTTP smoke check: npm run start served HTTP 200 at 127.0.0.1:3000; expected headline, noindex metadata and contact anchor present.
- Source checks: all literal anchor targets exist; no fetch/XMLHttpRequest submission calls. Seven requested content areas represented by header, five main sections and footer.
- Browser QA attempted: browser access host unavailable. Desktop/mobile screenshots, visual layout, keyboard navigation, native form error feedback, mobile menu interaction and reduced-motion rendering have NOT been verified in a browser. Responsive CSS and interaction code exist; manual browser review remains required.
- No lint configuration supplied or lint check executed; TypeScript and production compilation pass.
- No live submission endpoint exists. Native required/email/length validation implemented; real delivery, loading/success/error integration, server validation and spam prevention remain pending backend approval. No fake success or inquiry transmission.
- Application integration, tenant isolation, authentication, portal workflows, audit logging and Tasso tests: NOT RUN; existing application source and verified vendor contract unavailable. No mock or production integration claims.
- No deployment performed. Local smoke-test server stopped after verification. Run instructions are in marketing-prototype/README.md.

Logo-theme update: TypeScript passed; home and login HTTP 200. CSS now uses gold/navy/warm-white palette and responsive existing layouts. Visual browser review still pending.

Typography update: TypeScript passed; both routes returned HTTP 200. Responsive CSS covers desktop/tablet/mobile but no browser rendering checks performed. Original screenshot was not available; exact visual match is unverified. Fonts use external Google Fonts with display=optional and serif/sans fallbacks.
