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
 * route's own `<title>`, description and canonical already in the markup, plus
 * a `sitemap.xml` and `robots.txt` generated from the same data. That last part
 * matters: the sitemap used to be hand-maintained, and had drifted onto a
 * domain the site does not own. Now it cannot — every URL here comes from
 * `siteConfig.url`, the same value the canonical tags use.
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
  return `${origin}${path === '/' ? '/' : path}`;
}

/**
 * The replacement for everything between the fence markers. Joined with the
 * same four-space indent the surrounding `<head>` uses, so the generated file
 * stays readable when someone views source.
 */
function headBlock({ title, description, url, image, noIndex }) {
  const t = attr(title);
  const d = attr(description);
  const u = attr(url);
  const i = attr(image);

  return [
    SEO_START,
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${noIndex ? 'noindex, nofollow' : 'index, follow'}" />`,
    `<link rel="canonical" href="${u}" />`,
    `<meta property="og:site_name" content="NEXVERR TECHNOLOGIES" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${u}" />`,
    `<meta property="og:image" content="${i}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${i}" />`,
    SEO_END,
  ].join('\n    ');
}

/** Load the app's own TypeScript config + route data, path aliases and all. */
async function loadAppModules() {
  const server = await createServer({
    root,
    mode: 'production',
    logLevel: 'warn',
    appType: 'custom',
    server: { middlewareMode: true },
  });

  try {
    const [{ siteConfig }, { indexableRoutes }] = await Promise.all([
      server.ssrLoadModule('/src/lib/config.ts'),
      server.ssrLoadModule('/src/lib/routeSeo.ts'),
    ]);
    return { siteConfig, routes: indexableRoutes() };
  } finally {
    await server.close();
  }
}

async function main() {
  const { siteConfig, routes } = await loadAppModules();
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
  const image = `${origin}${siteConfig.ogImage}`;

  for (const route of routes) {
    const url = absoluteUrl(origin, route.path);
    const html = before + headBlock({ ...route, url, image }) + after;

    const target =
      route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html');

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
  }

  const urls = routes
    .map(
      (route) =>
        `  <url><loc>${xml(absoluteUrl(origin, route.path))}</loc>` +
        `<priority>${route.priority.toFixed(1)}</priority></url>`,
    )
    .join('\n');

  await writeFile(
    join(dist, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8',
  );

  await writeFile(
    join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
    'utf8',
  );

  console.log(
    `SEO: ${routes.length} prerendered pages, sitemap.xml and robots.txt written for ${origin}`,
  );
}

main().catch((error) => {
  console.error(`\nSEO generation failed:\n${error.message}\n`);
  process.exit(1);
});
