/**
 * Post-build SEO generation.
 *
 * The site is a client-rendered SPA, so without this every URL is served the
 * same `index.html`: one title, one description, and a canonical tag that only
 * becomes correct after React runs. Social scrapers and AI answer engines never
 * run it, and Google defers rendering, which is slow for a domain with no
 * history.
 *
 * So after `vite build` this writes one real HTML file per route, with that
 * route's own `<title>`, description, canonical, social card and JSON-LD
 * already in the markup, plus `sitemap.xml`, `robots.txt` and a `404.html` the
 * host can serve with a real 404 status. Every URL comes from `siteConfig.url`,
 * the same value the canonical tags use, so the sitemap cannot drift onto a
 * domain the site does not own.
 *
 * The injected tags carry `data-nx-seo`, the same marker `src/lib/seo.ts` uses
 * at runtime, so React replaces them on navigation instead of duplicating them.
 *
 * Route metadata lives in `src/lib/routeSeo.ts`. Add a route there, not here.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const SEO_START = '<!-- nx-seo:start -->';
const SEO_END = '<!-- nx-seo:end -->';

/** Escape for use inside a double-quoted HTML attribute. */
function attr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escape for use as XML text content. */
function xml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function absoluteUrl(origin, path) {
  if (path === '/') return `${origin}/`;
  return `${origin}${path.replace(/\/+$/, '')}`;
}

/**
 * The replacement for everything between the fence markers. Joined with the
 * same four-space indent the surrounding `<head>` uses, so the generated file
 * stays readable when someone views source.
 */
function headBlock({ title, description, url, image, noIndex, type, publishedTime, modifiedTime, schema }) {
  const t = attr(title);
  const d = attr(description);
  const u = attr(url);
  const i = attr(image);
  const ogType = type === 'article' ? 'article' : 'website';

  const tags = [
    SEO_START,
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    }" />`,
    `<link rel="canonical" href="${u}" />`,
    `<meta property="og:site_name" content="NEXVERR TECHNOLOGIES" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${u}" />`,
    `<meta property="og:image" content="${i}" />`,
    `<meta property="og:image:alt" content="${t} — NEXVERR TECHNOLOGIES" />`,
  ];

  if (ogType === 'article' && publishedTime) {
    tags.push(`<meta property="article:published_time" content="${attr(publishedTime)}" />`);
    tags.push(
      `<meta property="article:modified_time" content="${attr(modifiedTime ?? publishedTime)}" />`,
    );
  }

  tags.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${i}" />`,
  );

  for (const block of schema ?? []) {
    const json = JSON.stringify(block).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" data-nx-seo>${json}</script>`);
  }

  tags.push(SEO_END);
  return tags.join('\n    ');
}

/** Load the app's own TypeScript config + route data, path aliases and all. */
async function loadAppModules() {
  const server = await createServer({
    root,
    mode: 'production',
    logLevel: 'warn',
    appType: 'custom',
    server: { middlewareMode: true },
    // Nothing is served from this instance — it exists only to evaluate the
    // app's TypeScript modules. Skipping dependency discovery avoids a scan
    // that would still be running when the server closes.
    optimizeDeps: { noDiscovery: true, include: [] },
  });

  try {
    const [{ siteConfig }, { notFoundSeo }, { indexableRoutes }] = await Promise.all([
      server.ssrLoadModule('/src/lib/config.ts'),
      server.ssrLoadModule('/src/lib/routeSeo.ts'),
      server.ssrLoadModule('/src/lib/siteRoutes.ts'),
    ]);
    return { siteConfig, routes: indexableRoutes(), notFound: notFoundSeo };
  } finally {
    await server.close();
  }
}

async function main() {
  const { siteConfig, routes, notFound } = await loadAppModules();
  const origin = siteConfig.url;

  // A wrong origin here is the exact failure that kept this site out of Google.
  // Fail the build rather than ship another set of canonicals pointing nowhere.
  if (!/^https:\/\/[^/]+$/.test(origin)) {
    throw new Error(
      `siteConfig.url must be an https origin with no trailing slash. Got: ${origin}\n` +
        'Check VITE_SITE_URL in .env and in the hosting dashboard.',
    );
  }

  const template = await readFile(join(dist, 'index.html'), 'utf8');
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);

  if (start === -1 || end === -1) {
    throw new Error(
      `Could not find ${SEO_START} / ${SEO_END} in dist/index.html. ` +
        'The fence in index.html was removed or renamed.',
    );
  }

  const before = template.slice(0, start);
  const after = template.slice(end + SEO_END.length);

  const render = (route) => {
    const url = absoluteUrl(origin, route.path);
    const image = `${origin}${route.image ?? siteConfig.ogImage}`;
    return before + headBlock({ ...route, url, image }) + after;
  };

  const seen = new Map();

  for (const route of routes) {
    if (seen.has(route.path)) {
      throw new Error(`Two routes share the path ${route.path}. Check routeSeo.ts.`);
    }
    seen.set(route.path, route);

    const target =
      route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html');

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, render(route), 'utf8');
  }

  // Duplicate titles and descriptions are the most common self-inflicted SEO
  // problem on a site like this, so the build refuses to ship them.
  for (const field of ['title', 'description']) {
    const byValue = new Map();
    for (const route of routes) {
      const value = route[field];
      byValue.set(value, [...(byValue.get(value) ?? []), route.path]);
    }
    const clashes = [...byValue.entries()].filter(([, paths]) => paths.length > 1);
    if (clashes.length > 0) {
      throw new Error(
        `Duplicate ${field} across routes:\n` +
          clashes.map(([value, paths]) => `  "${value}"\n    ${paths.join('\n    ')}`).join('\n'),
      );
    }
  }

  // The host serves this for any URL that does not exist, with a real 404
  // status. Without it an unknown URL would be answered by the homepage at 200,
  // which search engines treat as a soft 404.
  await writeFile(join(dist, '404.html'), render(notFound), 'utf8');

  const urls = routes
    .filter((route) => !route.noIndex)
    .map((route) => {
      const lastmod = route.lastmod ? `<lastmod>${xml(route.lastmod)}</lastmod>` : '';
      return (
        `  <url><loc>${xml(absoluteUrl(origin, route.path))}</loc>` +
        `${lastmod}<priority>${route.priority.toFixed(1)}</priority></url>`
      );
    })
    .join('\n');

  await writeFile(
    join(dist, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8',
  );

  // Everything public is crawlable, including the CSS and JS needed to render
  // it. Only the error page is kept out of the index.
  await writeFile(
    join(dist, 'robots.txt'),
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /404',
      '',
      `Sitemap: ${origin}/sitemap.xml`,
      '',
    ].join('\n'),
    'utf8',
  );

  console.log(
    `SEO: ${routes.length} prerendered pages + 404.html, sitemap.xml and robots.txt written for ${origin}`,
  );
}

main().catch((error) => {
  console.error(`\nSEO generation failed:\n${error.message}\n`);
  process.exit(1);
});
