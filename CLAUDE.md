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
