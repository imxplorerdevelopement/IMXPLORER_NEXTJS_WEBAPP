<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Status (2026-04-02)

- Checkpoint commit: pending (see below)
- Push status: not pushed from this workspace

### Active routes
- `/contact` — multi-step inquiry flow (EmailJS)
- `/blogs` — blog listing with day/night toggle
- `/destinations/india`, `/destinations/dubai`, `/destinations/norway`, `/destinations/uk`, `/destinations/usa`, `/destinations/japan`, `/destinations/australia`

### Key files added this session
- `lib/data/blog-posts.ts` — single source of truth for all blog post data (`BlogPost` interface + `posts` array)
- `components/blogs/BlogsPageClient.tsx` — client component powering `/blogs` with theme toggle
- `components/destinations/DestinationHeroPage.tsx` — shared destination page builder

### Theme system (blogs page only)
- `data-blog-theme="light"|"dark"` attribute on `<body>` drives nav color overrides in `globals.css`
- Overrides scoped to `body[data-blog-theme="light"]` — no impact on other pages

### Known blockers
- ESLint failure: `next.config.ts` uses `require()` (`@typescript-eslint/no-require-imports`)
- `app/blogs/[slug]/page.tsx` not yet created — post detail links 404
- Newsletter form submit is a no-op placeholder
