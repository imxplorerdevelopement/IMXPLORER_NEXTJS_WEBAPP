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

### Checkpoint
- Latest local commit: `63fa069`
- Working tree at checkpoint: clean
- Push status from this workspace: not pushed

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

## Session Handoff (2026-04-02)

### Blogs Page — Day/Night Theme Toggle

- Blogs page refactored into server + client split:
  - `app/blogs/page.tsx` — server component, holds `metadata` export + JSON-LD structured data
  - `components/blogs/BlogsPageClient.tsx` — client component, owns `isDark` toggle state
- Toggle button (sun/moon icon) lives in the masthead top-right, next to "Plan your trip"
- Day mode: warm white background (`#fdf6f4`) with reddish-rose accent palette
- Night mode: original dark design (`#0c0c0e`) preserved exactly
- Theme propagated to `document.body` via `data-blog-theme="light"|"dark"` attribute (set in `useEffect`, cleaned up on unmount)
- Nav adapts to day mode via CSS selectors in `globals.css` (`body[data-blog-theme="light"] #navbar ...`)
  - Nav text, links, CTA button, hamburger lines, back-to-top all switch to dark tones in day mode
- `NewsletterForm` accepts `isDark?: boolean` prop (default `true`) — input/button colors adapt accordingly

### Blog Data — Shared Source of Truth

- All blog post data extracted to `lib/data/blog-posts.ts` (`BlogPost` interface + `posts` array)
- Both `page.tsx` (JSON-LD) and `BlogsPageClient.tsx` (UI) import from this single source
- `isoDate` field added to each post (used for `datePublished` in JSON-LD — was previously using human-readable string)

### Known Gaps (not blocking)
- `app/blogs/[slug]/page.tsx` does not exist yet — "Read article" links will 404 until individual post pages are built
- Newsletter form `onSubmit` is a no-op placeholder — needs EmailJS wiring or API route
- Category filter pills are visual-only — no filter logic wired

## Session Handoff (2026-04-02 — Services Page)

### Services Page Rebuild

- `app/services/page.tsx` fully rewritten — same ambient particle background, elevated layout
- Structure: hero with stats row → five-pillar accordion-style list → bespoke CTA strip
- Each pillar has: code, icon, tagline, body, and a grid of sub-service cards
- **New services added** (all under Holidays & Leisure pillar):
  - International Holidays
  - Domestic Holidays
  - Multi-Country Itineraries
  - Honeymoon & Romantic Getaways
  - Senior Citizen Friendly Travel
  - Golf Tourism
- Sub-service cards have hover accent colors derived from their parent pillar
- Page remains a pure server component (no client state needed)
