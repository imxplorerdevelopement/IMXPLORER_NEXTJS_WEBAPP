<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Status (2026-04-01)

- Contact route and inquiry flow are active at `/contact`.
- Contact hero has no left-side copy and now allocates more vertical space for globe rendering.
- Globe interaction routing:
  - Dot click routes to mapped destination pages.
  - Polygon click routes for India, UAE, Norway, UK, USA, Japan, Australia.
- Destination routes live:
  - `/destinations/india`
  - `/destinations/dubai`
  - `/destinations/norway`
  - `/destinations/uk`
  - `/destinations/usa`
  - `/destinations/japan`
  - `/destinations/australia`
- Shared destination page builder component:
  - `components/destinations/DestinationHeroPage.tsx`
- Known blocker:
  - ESLint failure in `next.config.ts` from `require()` import style.
