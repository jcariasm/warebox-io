# warebox.io

Herramientas para viajeros mexicanos en USA — FIFA World Cup 2026.

## Tools

- **/tallas** — Size converter MX ↔ USA (shoes, clothing, FIFA jerseys)
- **/propinas** — Tip calculator for USA

## Tech Stack

- Next.js 14 (App Router, static export)
- Tailwind CSS
- TypeScript

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub
2. Import in [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Deploy — done

Or use the Vercel CLI:

```bash
npx vercel
```

## Build for Static Export

```bash
npm run build
```

Output goes to `out/` directory (configured via `output: 'export'` in next.config.js). Can be deployed to any static host.

## AdSense

Replace `ca-pub-XXXXXXXXXX` in `app/layout.tsx` with your real AdSense publisher ID. Ad placeholder slots are already in place on every page (3 per page).
