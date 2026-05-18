# AI Knows Too Much — Weird Viral Personality Generator

A ready-to-run static website. No backend, no database, no build tools required.

## Run locally

Open a terminal inside this folder and run:

```bash
python3 -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

On Windows, if `python3` does not work, try:

```bash
py -m http.server 5173
```

You can also open `index.html` directly in a browser, but running a local server is better.

## Files

- `index.html` — main page
- `styles.css` — design and responsive layout
- `app.js` — generator logic, share/copy, local leaderboard
- `privacy.html` — simple privacy page
- `terms.html` — simple terms page
- `package.json` — optional npm shortcuts

## Customize donation button

Open `app.js` and change:

```js
const CONFIG = {
  donationUrl: "https://www.buymeacoffee.com/yourname",
  siteName: "AI Knows Too Much",
};
```

Replace the donation URL with your real Buy Me a Coffee, PayPal, Monobank, Patreon, or other link.

## Ad slots

The site includes placeholder blocks for ads. Replace the placeholder HTML with your ad network code only after the site is approved by the ad provider.

Important: do not ask people to click ads. Do not reward ad clicks. Do not use bots or traffic exchanges.

## Leaderboard

The leaderboard is local only. It uses browser `localStorage`, so each user sees their own local ranking.

For a real global leaderboard, you need a backend such as Supabase, Firebase, or your own server.

## Launch tips

1. Buy a short memorable domain.
2. Upload the files to Netlify, Vercel, Cloudflare Pages, or any static hosting.
3. Make 20–50 short videos showing funny results.
4. Post to TikTok, YouTube Shorts, Reddit, X/Twitter, and Discord.
5. Add ads only after you have real traffic and your site follows the ad network rules.
