# Project Memory

## Contact + Globe Status (2026-04-01)

### Resolved

- Dot click routing now uses each point route from `LOCATIONS`.
- Polygon click routing now supports:
  - India
  - United Arab Emirates (`/destinations/dubai`)
  - Norway
  - United Kingdom
  - United States of America
  - Japan
  - Australia
- Contact hero left text block removed.
- Contact hero vertical space increased to reduce globe bottom clipping.
- Globe repositioned to center and scaled up.
- Globe background visuals are now more dynamic (animated layered effects).
- Destination pages now exist for all countries connected by India arcs:
  - `/destinations/india`
  - `/destinations/dubai`
  - `/destinations/norway`
  - `/destinations/uk`
  - `/destinations/usa`
  - `/destinations/japan`
  - `/destinations/australia`
- Shared destination page component added:
  - `components/destinations/DestinationHeroPage.tsx`

### Open

- Globe uses external CDN assets (`unpkg`) for topology/textures; may fail under strict CSP/network limits.
- Tooltip positioning is not viewport-clamped and can overflow near screen edges.
- `components/GlobeComponent.jsx` remains untyped in a TypeScript codebase.

### Known Blocker

- `npm run lint` fails on `next.config.ts` due to `require()` import style (`@typescript-eslint/no-require-imports`).
