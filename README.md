# sniperduels.net

SEO funnel site for [sniperduels.shop](https://sniperduels.shop). Captures organic Google traffic for Sniper Duels (Roblox) keywords and pushes buyers toward the shop + Discord.

## Stack
- Next.js 14 (App Router, SSG)
- Tailwind CSS
- Built-time data fetch from `sniperduels.com/api` (SDValues)
- No database, no auth — pure static content

## Pages
- `/` — homepage
- `/gems`, `/cheap-gems` — gem-buying landing pages
- `/skins`, `/supplies` — inventory we sell on .shop
- `/values`, `/values/[slug]` — 122+ weapon value pages (auto-gen from SDValues)
- `/middleman` — free MM service positioning
- `/safe-trading` — trust + anti-scam guide
- `/codes` — Sniper Duels code roundup (auto-dated)

## Local dev
```bash
npm install
npm run dev      # auto-runs predev → fetches SDValues data
```

## Deploy
Coolify auto-builds from `Dockerfile`. Set `NEXT_PUBLIC_SITE_URL` to the public URL when domain is final.
