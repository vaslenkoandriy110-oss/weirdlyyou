# AI Knows Too Much — Viral Weird Facts Site

A static viral personality generator for GitHub Pages, Netlify, or any static hosting.

## Run locally

### Windows PowerShell

```powershell
npx serve . -l 5173
```

Then open:

```text
http://localhost:5173
```

If `serve` asks to install, type `y` and press Enter.

### Python fallback

```powershell
py -m http.server 5173
```

or:

```powershell
python -m http.server 5173
```

## Upload to GitHub Pages

Upload these files directly to the root of your repository:

- `index.html`
- `styles.css`
- `app.js`
- `privacy.html`
- `terms.html`
- `README.md`
- `package.json`

Then enable:

```text
Settings → Pages → Deploy from a branch → main → /root → Save
```

## Change donation link

Open `app.js` and replace:

```js
donationUrl: "https://www.buymeacoffee.com/yourname"
```

with your real donation link.

## Donor Spotlight feature

The site now includes a **Donor Spotlight** section:

- visitor donates $1 using your donation button;
- visitor writes a short public message;
- message appears in the live spotlight for 30 seconds;
- messages wait in a queue;
- basic spam/link filtering is included.

### Important

On GitHub Pages this feature is currently **local demo mode**. That means messages are saved in the visitor's browser with `localStorage`. They are not global and other users will not see them.

For a real public version where everybody sees the same paid messages, you need:

1. a payment provider such as Stripe, PayPal, Ko-fi, Buy Me a Coffee, etc.;
2. a webhook/serverless function that receives successful payment events;
3. a database table for approved messages;
4. frontend code that reads approved messages from the database.

Suggested real architecture:

```text
GitHub Pages frontend
        ↓
Donation/payment checkout
        ↓
Webhook confirms payment
        ↓
Serverless function validates + filters message
        ↓
Database stores message with duration and status
        ↓
Frontend reads queue and displays messages for 30 seconds
```

Do not rely only on a redirect/success page to verify payment. Use a payment webhook for real automation.

## Safe ad usage

There are ad placeholders in the HTML. Add real ad code only after approval by your ad network. Do not ask users to click ads and do not reward ad clicks.

## Privacy

The current static version does not send form data to a server. The leaderboard and donor wall demo use browser localStorage.
