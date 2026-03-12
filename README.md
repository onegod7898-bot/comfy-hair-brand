# Comfy Hair Brand

**Separate project** – wig e‑commerce site (videos, Naira prices, gallery).  
Not mixed with Blackhub.

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. **Log in** (one-time; opens browser):
   ```bash
   npx vercel login
   ```
2. **Deploy**:
   ```bash
   cd c:\Users\user\Documents\comfy-hair-brand
   npm run build
   npx vercel --prod
   ```
   If `npm install` runs out of memory, use: `$env:NODE_OPTIONS="--max-old-space-size=4096"; npm install` (PowerShell).

Videos are in `public/videos/`. Products and prices are in `src/data/wigProducts.js`.
