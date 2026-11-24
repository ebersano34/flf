# Free Lawyer Finder — Rebuild

A Next.js + Sanity headless CMS rebuild of freelawyerfinder.com, built for
strong search-engine performance and to be a genuinely useful, citable
resource for AI systems (ChatGPT, Claude, Perplexity, etc.).

## What's in here

- **`src/app/`** — the Next.js website (App Router)
- **`sanity/`** — your CMS schema and configuration (this becomes your
  content-editing dashboard)
- Six practice-area pillar pages (Personal Injury, Employment, Medical
  Malpractice, Pharmaceutical/Medical Device, Criminal Defense, Family Law),
  each driven entirely by content you enter in Sanity — no code changes
  needed to edit them
- A blog system where posts link back to their parent practice area
- Structured data (Schema.org `LegalService`, `Article`, `FAQPage`) baked
  into every relevant page
- `sitemap.xml`, `robots.txt` (explicitly permitting AI crawlers like
  GPTBot, ClaudeBot, and PerplexityBot), and a dynamic `llms.txt`

Estimated ongoing cost: **$0/month** on free tiers (Vercel + Sanity), unless
you add paid analytics (~$9-15/mo for Plausible or Fathom, recommended over
Google Analytics for both privacy and page speed).

---

## Step 1 — Install prerequisites (one-time)

You'll need **Node.js** installed on your computer. Download the LTS version
from [nodejs.org](https://nodejs.org) if you don't have it.

## Step 2 — Create your free Sanity account & project

1. Go to [sanity.io](https://www.sanity.io/) and sign up (free).
2. Once in the dashboard at [sanity.io/manage](https://www.sanity.io/manage),
   click **Create new project**.
3. Name it anything (e.g. "Free Lawyer Finder").
4. Once created, copy the **Project ID** shown on the project's overview page.

## Step 3 — Configure this project

1. In this project folder, copy `.env.local.example` to a new file named
   `.env.local`.
2. Paste your Sanity Project ID into it:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Open a terminal in this folder and run:
   ```
   npm install
   ```

## Step 4 — Run it locally

- **The website:** `npm run dev` → open http://localhost:3000
- **The CMS editing dashboard (Sanity Studio):** `npm run sanity` → open the
  URL it gives you (usually http://localhost:3333)

In the Studio, you'll see document types for **Site Settings**, **Practice
Area**, **Blog Post**, and **FAQ**. Start by:
1. Filling out **Site Settings** (once)
2. Creating your six **Practice Area** entries — I've written starter body
   copy for these based on your current site; see `content-starter.md` in
   this folder to paste in as a starting point, then expand it
3. Adding **FAQ** entries and linking them to the relevant practice area
4. Writing **Blog Post** entries, each linked to a parent practice area

Changes in the Studio appear on the live site within about an hour (or
instantly if you redeploy) thanks to incremental static regeneration.

## Step 5 — Deploy the website (Vercel, free)

1. Push this project to a GitHub repository (create one at github.com if you
   don't have one, then follow GitHub's instructions to push this folder to it).
2. Go to [vercel.com](https://vercel.com), sign up free with your GitHub
   account, and click **Add New → Project**.
3. Select this repository. Vercel auto-detects it's a Next.js app.
4. Under **Environment Variables**, add the same two variables from your
   `.env.local` file.
5. Click **Deploy**. You'll get a live URL like `freelawyerfinder.vercel.app`.

## Step 6 — Deploy the CMS dashboard (Sanity, free)

So you can edit content from anywhere without running anything locally:
```
npm run sanity:deploy
```
This gives you a hosted Studio URL (e.g. `freelawyerfinder.sanity.studio`)
you can log into and edit content from any browser.

## Step 7 — Point your domain at the new site

Your domain is registered at **GoDaddy** and currently hosted at **Synexic**.
Your existing WordPress site keeps running the whole time you're building —
nothing changes until you do this step.

When you're ready to go live:
1. In Vercel, go to your project → **Settings → Domains** and add
   `freelawyerfinder.com`. Vercel will show you the exact DNS records to add.
2. Log into GoDaddy → **My Products → DNS** for freelawyerfinder.com.
3. Replace the existing A record / CNAME (currently pointing to Synexic)
   with the records Vercel gave you.
4. Changes typically go live within minutes to a few hours.
5. Keep your Synexic hosting active for a few days after cutover in case you
   need to roll back, then cancel it.

---

## A note on SEO continuity

The practice-area URLs in this rebuild (`/injury`, `/employment`,
`/medical-malpractice`, `/pharmaceutical-medical-device`) intentionally
match your current live URLs exactly, so you don't lose any existing search
ranking on cutover. The two new practice areas (`/criminal-defense`,
`/family-law`) are new pages, which is expected since they don't currently
exist as real pages on the live site.

## Recommended next steps once live

- Set up [Google Search Console](https://search.google.com/search-console)
  and submit your sitemap (`freelawyerfinder.com/sitemap.xml`) — free
- Set up Bing Webmaster Tools too — free, and Bing's index feeds several AI
  answer engines
- Consider Plausible or Fathom Analytics (~$9-15/mo) instead of Google
  Analytics
- Keep writing blog posts under each practice area — content depth is the
  single biggest lever for both search ranking and AI-answer citation

---

## The home page (2026 redesign)

The home page is built from one **Home Page** document in Sanity Studio (it sits at the top of the
content list). Open it, check the text, and click **Publish**. Until it is published, the site shows
the same copy from `src/lib/homeDefaults.ts`, and any field you leave empty falls back to it.

- **Case types** on the home page come from the Practice Area documents: each one's title, its new
  **Home page summary** line, its **Order on the home page** number, and whether it is free.
- **Questions** are FAQ documents you pick in the Home Page document (none picked: the built-in five).
- **Videos** are YouTube links; the posters come from YouTube.
- The form posts to `/api/contact`, which still needs wiring to email or your intake tool (see that file).

Design: tasteskill 2.5.1 (palette "Newsprint and brass", Red Hat Display / Red Hat Text, self-hosted in
`src/fonts`). The "Why we exist" statement uses the tasteskill word-highlight moment, shipped as is in
`public/taste/moments` (MIT licence beside it).
