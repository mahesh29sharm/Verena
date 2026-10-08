# Verena homepage redesign

React + Vite implementation of the Verena take-home homepage redesign.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Push this folder to GitHub or import it directly into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`

The project includes three no-index safeguards for the assignment:
- `<meta name="robots" content="noindex,nofollow,noarchive">`
- `public/robots.txt`
- `X-Robots-Tag` header in `vercel.json`

## Design system

- Neutral white / off-white surfaces carry most of the page.
- Verena blue is reserved for primary action and product intelligence.
- Purple is a secondary accent for +Human / judgment handoff.
- Red, amber and green only communicate state, never decoration.
- Visual metaphor: a website can look complete at the surface while compliance gaps exist underneath. Verena reveals those gaps and gives the next step.
