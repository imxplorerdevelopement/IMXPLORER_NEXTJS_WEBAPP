@AGENTS.md

## Session Handoff (2026-03-31)

### Routing and Nav
- `Enquire` in `components/Nav.tsx` now routes to `/contact` (not `/#contact`).
- Desktop and mobile nav both share this route target.

### Contact Page
- Route file: `app/contact/page.tsx`
- Main UI: `components/contact/ContactPageClient.tsx`
- Multi-step inquiry flow is dynamic by inquiry type (`luxury`, `study`, `corporate`, `visa`).
- Email submission uses EmailJS public env vars:
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### Globe and Contact Hero Tuning
- Globe was moved left and scaled up for stronger hero composition.
- Contact hero left text was nudged left/down.
- Content below the globe was pushed down to prevent overlap.

### Homepage Spacing and Readability
- Navbar text/logo sizing reduced for tighter visual balance at 100% browser zoom.
- Services section received additional height/spacing so cards are not visually clipped.
- Journey section length increased and cards enlarged for readability.

## Session Handoff (2026-04-01)

### Contact + Globe
- Contact hero left-side text was removed.
- Contact hero minimum height was increased so the larger globe is less likely to clip at the bottom.
- Globe was centered and enlarged further.
- Globe background visuals were upgraded with layered animated effects.
- Point clicks route to destination pages using per-location routes.
- Polygon click routing now includes India, UAE, Norway, UK, USA, Japan, and Australia.

### Destination Pages
- Added destination pages with rotating hero backgrounds for:
  - India
  - Dubai
  - Norway
  - United Kingdom
  - United States
  - Japan
  - Australia
- Added shared destination UI component:
  - `components/destinations/DestinationHeroPage.tsx`

### Current Risk / Blocker
- Lint still fails due to `next.config.ts` using `require()` import style (`@typescript-eslint/no-require-imports`).
