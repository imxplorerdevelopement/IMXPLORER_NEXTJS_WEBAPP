This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Notes (Session Handoff)

Last updated: 2026-04-01
Checkpoint commit: `63fa069`
Working tree status at checkpoint: clean
Remote push status: not pushed from this workspace

- Contact route: `/contact` (navbar `Enquire` points here).
- Contact page files:
  - `app/contact/page.tsx`
  - `components/contact/ContactPageClient.tsx`
- Contact hero updates:
  - left-side hero copy removed
  - hero height increased to avoid globe clipping
- Globe updates (`components/GlobeComponent.jsx`):
  - centered and scaled up
  - layered animated background effects added
  - point click routes to destination pages
  - polygon click routes for mapped countries
- Destination routes now available:
  - `/destinations/india`
  - `/destinations/dubai`
  - `/destinations/norway`
  - `/destinations/uk`
  - `/destinations/usa`
  - `/destinations/japan`
  - `/destinations/australia`
- Shared destination UI:
  - `components/destinations/DestinationHeroPage.tsx`
  - rotating hero backgrounds + consistent card layout
- Current known blocker:
  - `npm run lint` fails on `next.config.ts` because `require()` import style violates `@typescript-eslint/no-require-imports`.
