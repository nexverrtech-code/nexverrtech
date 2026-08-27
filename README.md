# NEXVERR TECHNOLOGIES — Website

**IDEATE • BUILD • SCALE** — Turning Ideas Into Digital Innovations.

Corporate site, portfolio and lead-generation front end. Frontend-only: no backend,
no database, no paid APIs. Inquiries are handed off to WhatsApp or the visitor's
email client.

---

## Before you launch — 3 things

### 1. Set your contact details (required)

Edit `.env`:

```
VITE_WHATSAPP_NUMBER=91XXXXXXXXXX     # digits only, with country code
VITE_CONTACT_EMAIL=you@nexverrtech.com
VITE_SITE_URL=https://your-domain.com
```

While these are blank the site **hides** the floating WhatsApp button and tells you
in the form that the channel is unconfigured — deliberately, so no visitor is sent
to a wrong number. Set them and everything activates. They are read in exactly one
place: `src/lib/config.ts`.

### 2. Drop in the real logo

The mark's geometry lives in **`src/components/brand/markGeometry.ts`** — one file,
one source of truth. The hero draws the letterform live from those paths, so the
animation is built out of the real logo structure rather than a picture of it.

To swap in the official logo:

1. Replace the paths in `markGeometry.ts` (`MARK_N_PATH`, the accent, and
   `MARK_CONSTRUCTION` — the single continuous centreline the entrance animation
   draws through the letterform).
2. Regenerate the static files:

```bash
npm run brand
```

That rewrites `public/brand/nexverr-symbol.svg`, `favicon.svg` and
`nexverr-logo.svg` from the same geometry, so the animated mark, favicon, navbar,
footer, preloader and 404 can never drift apart. `nexverr-wordmark.svg` is
text-only and unaffected.

> **OG image:** `public/og/og-default.svg` works for crawlers that accept SVG.
> Export a 1200×630 **PNG** over it (`public/og/og-default.png`) and update
> `ogImage` in `src/lib/config.ts` — X/Facebook do not render SVG previews.

### 3. Add your projects

`src/data/projects.ts` ships with an **empty** `projects` array on purpose — no
invented clients, metrics or case studies. Until you add entries, Selected Work and
`/projects` show an honest "case studies are being prepared" state with a CTA.

Add one object per delivered project and the card grid and `/projects/:slug` detail
pages light up automatically. To preview the templates first, flip
`showSampleProjects` to `true` — sample entries are badged "Sample" in the UI.

---

## SEO

Three things have to agree: the canonical/OG tags a visitor's browser ends up
with, the same tags baked into the static HTML, and the URL list in
`sitemap.xml`. All three are generated from **`src/lib/routeSeo.ts`**, so they
cannot drift apart. They had: every canonical tag, the sitemap and `robots.txt`
once pointed at a domain the company does not own, which kept the site out of
Google's index entirely.

`npm run build` runs `scripts/build-seo.mjs` after `vite build`. It writes:

- **one HTML file per route** (`dist/services/erp-systems/index.html`, and so on)
  carrying that route's own `<title>`, description and canonical *already in the
  markup*. The SPA only fills those in after React runs, and social scrapers and
  AI answer engines never run it.
- **`dist/sitemap.xml`** and **`dist/robots.txt`**, both built from
  `siteConfig.url`.

The build fails loudly if `siteConfig.url` is not a bare `https://` origin.

> **Deploy setting:** the hosting build command must be `npm run build`, not
> `vite build`. The latter skips SEO generation, and the deploy ships with no
> sitemap, no `robots.txt` and identical tags on every URL.

To add a page, add it to `routeSeo.ts` and point that page's `useSeo()` at the
entry. Per-service search copy lives in `src/data/services.ts` as `seoTitle` and
`metaDescription`.

`VITE_SITE_URL` is read in exactly one place, `src/lib/config.ts`. `.env` is
gitignored, so **production reads it from the hosting dashboard** — set wrong
there, it silently overrides the default and the canonical tags go with it.

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Type-check, then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Types only, no build |
| `npm run brand` | Regenerate `public/brand/*` from the mark geometry |

> **Windows note:** if `npm install` fails with `ERR_INVALID_ARG_TYPE`, your shell
> is missing `ComSpec`. Run `set ComSpec=C:\Windows\System32\cmd.exe` (cmd) or
> `$env:ComSpec="C:\Windows\System32\cmd.exe"` (PowerShell) first.

---

## Where things live

```
src/
├── components/
│   ├── hero/         Transformation-engine hero (11 modules)
│   ├── sections/     Homepage + shared page sections
│   ├── cards/        Service, solution, project, team cards
│   ├── forms/        Inquiry form, modal, Zod schema
│   ├── navigation/   Navbar, mobile menu, footer
│   ├── effects/      Reveal, ambient glow, floating WhatsApp
│   └── ui/           Button, Modal, Container, Logo, Preloader…
├── data/             ALL CONTENT LIVES HERE — edit these, not JSX
├── lib/              config, whatsapp, email, seo, utils
├── hooks/            media queries, reduced motion, parallax, viewport
├── pages/            One file per route
├── routes/           Route table (lazy-loaded)
└── styles/           tokens · globals · animations · responsive
```

**To change content, edit `src/data/`.** Services, industries, team, branches,
navigation and the approach steps are all data-driven; components just map over them.

---

## Editing content

| What | File |
| --- | --- |
| Services (20) | `src/data/services.ts` |
| Homepage capability groups (6) | `src/data/solutions.ts` |
| Industries | `src/data/industries.ts` |
| Projects / case studies | `src/data/projects.ts` |
| Founding team | `src/data/team.ts` |
| Office locations (incl. the hero location pill) | `src/data/branches.ts` |
| Mark geometry — hero animation + brand files | `src/components/brand/markGeometry.ts` |
| Client logos | `src/data/companies.ts` (empty — strip appears when filled) |
| Nav + footer links | `src/data/navigation.ts` |
| Understand → Design → Build → Support | `src/data/approach.ts` |
| Brand name, tagline, URL, OG image | `src/lib/config.ts` |
| Colours, spacing, motion timings | `src/styles/tokens.css` |

---

## Images

Put files under `public/` and reference them by absolute path (`/projects/foo.webp`):

`brand/` · `projects/` · `team/` · `services/` · `branches/` · `companies/` · `og/`

Use **SVG** for logos and **WebP/AVIF** for photographs. Project and team images
are lazy-loaded; cards fall back to a branded panel when no image is set.

---

## Deploying

Static build — any CDN host works.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA routing:** already configured. `public/_redirects` covers Netlify and
  Cloudflare Pages; `vercel.json` covers Vercel. On other hosts, rewrite all paths
  to `/index.html`.

Set the same three environment variables in your host's dashboard — Vite inlines
them at build time, so a change needs a rebuild.

After first deploy, update the domain in `public/robots.txt` and
`public/sitemap.xml`, and set `VITE_SITE_URL` so canonical and OpenGraph URLs are
correct.

---

## Notes on how it is built

- **No invented content.** Client names, project results, statistics, testimonials,
  ratings, phone numbers and addresses are absent by design. Empty data renders an
  honest empty state, never filler.
- **No false confirmations.** With no backend, the form says your inquiry is
  *ready to send* and hands it to WhatsApp/email. It never claims receipt.
- **Performance.** Route-level code splitting, vendor chunks split for caching,
  animation restricted to `transform`/`opacity`, hero idle loops paused off-screen,
  no canvas/WebGL/video.
- **Accessibility.** Semantic landmarks, skip link, focus-trapped modal with ESC,
  labelled fields with `aria-invalid` + `role="alert"` errors, 44px touch targets,
  and full `prefers-reduced-motion` support (particles, parallax and choreography
  drop to simple fades).
- **Ready for v2.** The inquiry pipeline is abstracted behind `src/lib/whatsapp.ts`
  and `src/lib/email.ts` against the shared `InquiryData` type in `src/lib/inquiry.ts`.
  Adding an API, CRM or admin dashboard means swapping those implementations — the
  UI does not change.
