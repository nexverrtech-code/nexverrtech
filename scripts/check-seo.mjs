/**
 * Audits the built site.
 *
 *   npm run build && npm run seo:check
 *
 * Reads `dist/` the way a crawler would — no app code, no assumptions — and
 * fails on the things that quietly cost a site its rankings: a missing or
 * duplicated title, a canonical pointing at the wrong URL, a social card that
 * was never rendered, structured data that does not parse, or a page in the
 * sitemap that has no HTML file behind it.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const TITLE_MAX = 65;
const DESCRIPTION_MIN = 80;
const DESCRIPTION_MAX = 170;

const problems = [];
const warnings = [];

const fail = (message) => problems.push(message);
const warn = (message) => warnings.push(message);

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

const pick = (html, pattern) => html.match(pattern)?.[1];

/** `dist/services/erp-systems/index.html` → `/services/erp-systems` */
function routeOf(file) {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404';
  return `/${rel.replace(/\/index\.html$/, '')}`;
}

async function main() {
  if (!existsSync(dist)) {
    console.error('\nNo dist/ directory. Run `npm run build` first.\n');
    process.exit(1);
  }

  const files = (await htmlFiles(dist)).sort();
  const titles = new Map();
  const descriptions = new Map();
  const pages = [];

  for (const file of files) {
    const route = routeOf(file);
    const html = await readFile(file, 'utf8');

    const title = pick(html, /<title>([^<]*)<\/title>/);
    const description = pick(html, /<meta name="description" content="([^"]*)"/);
    const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
    const robots = pick(html, /<meta name="robots" content="([^"]*)"/);
    const ogImage = pick(html, /<meta property="og:image" content="([^"]*)"/);
    const ogTitle = pick(html, /<meta property="og:title" content="([^"]*)"/);
    const noIndex = robots?.includes('noindex') ?? false;

    pages.push({ route, noIndex });

    if (!title) fail(`${route}: no <title>`);
    if (!description) fail(`${route}: no meta description`);
    if (!canonical) fail(`${route}: no canonical`);
    if (!ogTitle) fail(`${route}: no og:title`);
    if (!ogImage) fail(`${route}: no og:image`);
    if (!robots) fail(`${route}: no robots directive`);

    if (canonical && !/^https:\/\//.test(canonical)) {
      fail(`${route}: canonical is not an https URL (${canonical})`);
    }
    if (canonical && route !== '/' && canonical.endsWith('/')) {
      fail(`${route}: canonical has a trailing slash (${canonical})`);
    }
    if (canonical && !canonical.endsWith(route === '/' ? '/' : route) && !noIndex) {
      fail(`${route}: canonical points elsewhere (${canonical})`);
    }

    if (title && title.length > TITLE_MAX) {
      warn(`${route}: title is ${title.length} chars, over ${TITLE_MAX} (may be truncated)`);
    }
    if (description && description.length > DESCRIPTION_MAX) {
      warn(`${route}: description is ${description.length} chars, over ${DESCRIPTION_MAX}`);
    }
    if (description && description.length < DESCRIPTION_MIN && !noIndex) {
      warn(`${route}: description is only ${description.length} chars`);
    }

    // The social card has to be a file that exists, not just a URL.
    if (ogImage) {
      const path = ogImage.replace(/^https?:\/\/[^/]+/, '');
      if (!existsSync(join(dist, path))) fail(`${route}: og:image missing from dist (${path})`);
      else {
        const { size } = await stat(join(dist, path));
        if (size > 1_000_000) warn(`${route}: og:image is ${(size / 1024).toFixed(0)} kB`);
      }
    }

    for (const [, json] of html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    )) {
      try {
        const data = JSON.parse(json);
        if (!data['@type']) fail(`${route}: JSON-LD block without @type`);
      } catch {
        fail(`${route}: JSON-LD does not parse`);
      }
    }

    if (!noIndex) {
      titles.set(title, [...(titles.get(title) ?? []), route]);
      descriptions.set(description, [...(descriptions.get(description) ?? []), route]);
    }
  }

  for (const [value, routes] of titles) {
    if (routes.length > 1) fail(`Duplicate title "${value}" on: ${routes.join(', ')}`);
  }
  for (const [value, routes] of descriptions) {
    if (routes.length > 1) fail(`Duplicate description on: ${routes.join(', ')}`);
  }

  // Sitemap and prerendered pages have to describe the same site.
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  const sitemapRoutes = new Set(
    [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(([, path]) => path || '/'),
  );

  const indexable = pages.filter((page) => !page.noIndex).map((page) => page.route);

  for (const route of indexable) {
    if (!sitemapRoutes.has(route)) fail(`${route} is indexable but missing from sitemap.xml`);
  }
  for (const route of sitemapRoutes) {
    if (!indexable.includes(route)) fail(`sitemap.xml lists ${route}, which has no indexable page`);
  }

  const robotsTxt = await readFile(join(dist, 'robots.txt'), 'utf8');
  if (!robotsTxt.includes('Sitemap:')) fail('robots.txt does not reference the sitemap');
  if (!existsSync(join(dist, '404.html'))) fail('dist/404.html is missing');

  const notFound = await readFile(join(dist, '404.html'), 'utf8');
  if (!notFound.includes('noindex')) fail('404.html is not noindex');

  console.log(`\nChecked ${files.length} pages, ${sitemapRoutes.size} sitemap URLs.`);

  for (const warning of warnings) console.log(`  warn  ${warning}`);
  for (const problem of problems) console.log(`  FAIL  ${problem}`);

  if (problems.length > 0) {
    console.error(`\n${problems.length} problem(s) found.\n`);
    process.exit(1);
  }

  console.log(`\nNo problems. ${warnings.length} warning(s).\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
