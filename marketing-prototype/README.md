# Frigo Flow local review prototype

Isolated Next.js / React / TypeScript marketing prototype. No application portals, authentication, database, or production integration code was available or modified. Do not deploy without Chris's explicit approval.

## Run

From marketing-prototype:

    npm install
    npm run dev

Open http://127.0.0.1:3000. Verify with npm run build and npm run typecheck. Dependencies are locked by package-lock.json once installation succeeds.

## Configuration and review gates

Optional public environment variables: NEXT_PUBLIC_LOGIN_URL, NEXT_PUBLIC_PRIVACY_URL, NEXT_PUBLIC_TERMS_URL. Leave blank until destinations are approved; the UI displays pending labels. Never place secrets in NEXT_PUBLIC variables. Restart after configuration changes.

The form performs native required/email/length validation. It never sends or persists any data, and explicitly reports pending integration on submit. There is deliberately no success claim, live submission loading state, server endpoint, or operational spam protection. A honeypot field is prepared for future integration. Before enabling delivery: approve fields/recipients/storage/retention; implement backend validation, request size limits, rate limiting, bot controls, consent requirements, loading/error/success handling, and test actual delivery. Do not collect patient data.

Branding is provisional: typographic wordmark, blue/navy palette, DM Sans with system fallbacks. No official logo or assets were supplied. Font uses Google Fonts; approve external font loading or self-host an approved font before publication. Capabilities and conceptual illustrations are visibly marked for product verification. No certifications, live integrations, laboratory login, or medical testing services are claimed.

Components: app/layout.tsx (metadata, noindex), app/page.tsx (Brand, Icon, Login, seven sections and interaction state), app/globals.css (responsive styling, focus states, reduced motion), config.ts (pending destinations).

Rollback: stop the local server and remove this isolated prototype directory if unwanted. No database migrations or deployment changes exist.

Root-directory convenience commands: run npm install then npm run dev from FRIGO FLOW NEW. Root scripts delegate to the isolated marketing-prototype project.

Login now defaults to /login, a local design preview. NEXT_PUBLIC_LOGIN_URL still overrides it when approved. The preview does not send or store credentials or authenticate users; use fictional inputs. Real sign-in requires the existing backend. Header/footer logo now uses the user-supplied logo.jpg.

Typography now follows the requested fallback system: Cormorant Garamond display + Inter UI/body. Existing screenshot/source fonts were unavailable. Google Fonts display=optional reduces late swaps; approve external font delivery or self-host before publication.
