import { contactConfig, siteConfig } from './config';

export interface Crumb {
  name: string;
  /** Path beginning with `/`. */
  path: string;
}

export interface SeoInput {
  title: string;
  description: string;
  /** Path beginning with `/`, e.g. `/services`. */
  path: string;
  /** Path under the site root, e.g. `/og/erp.png`. Defaults to the site card. */
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  /** JSON-LD blocks for this page. Must describe what the page actually shows. */
  schema?: object[];
  /** ISO dates, articles only. */
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Minimal head manager. A dedicated head library would be another dependency
 * for something this small, so tags are written directly and marked
 * `data-nx-seo` so they can be reconciled on every route change.
 *
 * The same attribute is used by `scripts/build-seo.mjs`, which bakes these tags
 * into the static HTML for each route. Reusing the marker means the build-time
 * tags are *replaced* here rather than duplicated once React takes over.
 */
const MANAGED = 'data-nx-seo';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Replaces every managed JSON-LD block with the ones this page declares. */
function applyJsonLd(blocks: object[]) {
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`)
    .forEach((node) => node.remove());

  for (const block of blocks) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(MANAGED, '');
    // Nothing user-supplied reaches this, but `<` is escaped anyway so a stray
    // value can never close the script tag early.
    script.textContent = JSON.stringify(block).replace(/</g, '\\u003c');
    document.head.appendChild(script);
  }
}

export function applySeo({
  title,
  description,
  path,
  image,
  type = 'website',
  noIndex,
  schema,
  publishedTime,
  modifiedTime,
}: SeoInput) {
  const url = absoluteUrl(path);
  const ogImage = `${siteConfig.url}${image ?? siteConfig.ogImage}`;

  document.title = title;

  upsertMeta('name', 'description', description);
  upsertMeta(
    'name',
    'robots',
    noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  );
  upsertLink('canonical', url);

  upsertMeta('property', 'og:site_name', siteConfig.name);
  upsertMeta('property', 'og:locale', 'en_IN');
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', ogImage);
  upsertMeta('property', 'og:image:alt', `${title} — ${siteConfig.name}`);

  if (type === 'article' && publishedTime) {
    upsertMeta('property', 'article:published_time', publishedTime);
    upsertMeta('property', 'article:modified_time', modifiedTime ?? publishedTime);
  } else {
    removeMeta('property', 'article:published_time');
    removeMeta('property', 'article:modified_time');
  }

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', ogImage);

  applyJsonLd(schema ?? []);
}

/** Absolute, canonical URL for an in-site path. No trailing slash except root. */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${siteConfig.url}/`;
  return `${siteConfig.url}${path.replace(/\/+$/, '')}`;
}

/* --------------------------------------------------------------- schema.org */

/** Stable node id so every other block on the site can point back at the company. */
export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

const AREA_SERVED = [
  { '@type': 'City', name: 'Erode' },
  { '@type': 'State', name: 'Tamil Nadu' },
  { '@type': 'Country', name: 'India' },
];

const PROVIDER_REF = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: siteConfig.name,
  url: siteConfig.url,
};

/**
 * The organisation. Only facts from the company profile.
 *
 * Typed as `ProfessionalService` as well as `Organization`: that is the
 * LocalBusiness subtype for a services firm trading from one place, and it is
 * what makes the business describable to Google as a local result rather than
 * only a website. Contact rows are omitted entirely when unconfigured — an
 * empty `telephone` is worse than no `telephone`. No rating, review, award or
 * price appears here, because none has been verified.
 */
export function organizationJsonLd() {
  const telephone = contactConfig.isPhoneConfigured
    ? contactConfig.phone
    : contactConfig.isWhatsAppConfigured
      ? `+${contactConfig.whatsappNumber}`
      : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANIZATION_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/nexverr-symbol.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    slogan: siteConfig.statement,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: 'IN',
    },
    areaServed: AREA_SERVED,
    knowsAbout: [
      'Custom software development',
      'Website development',
      'ERP systems',
      'Billing and inventory software',
      'Mobile app development',
      'Business process automation',
    ],
    ...(telephone ? { telephone } : {}),
    ...(contactConfig.isEmailConfigured ? { email: contactConfig.email } : {}),
    ...(siteConfig.socialProfiles.length > 0
      ? { sameAs: siteConfig.socialProfiles.map((profile) => profile.url) }
      : {}),
  };
}

/** The site itself. Kept minimal — no SearchAction, because there is no search. */
export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en-IN',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export interface ServiceJsonLdInput {
  name: string;
  description: string;
  /** Path beginning with `/`, e.g. `/services/erp-systems`. */
  path: string;
  /** The capability group the service belongs to. */
  category?: string;
}

/** One service offering. */
export function serviceJsonLd({ name, description, path, category }: ServiceJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    ...(category ? { serviceType: category } : {}),
    provider: PROVIDER_REF,
    areaServed: AREA_SERVED,
  };
}

/** Trail from the site root down to the current page, in order. */
export function breadcrumbJsonLd(trail: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export interface ArticleJsonLdInput {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

/** A published article. Only emitted for pages that really are articles. */
export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: `${siteConfig.url}${image ?? siteConfig.ogImage}`,
    author: PROVIDER_REF,
    publisher: PROVIDER_REF,
    inLanguage: 'en-IN',
  };
}

export interface ProjectJsonLdInput {
  name: string;
  description: string;
  path: string;
  /** The client the work was delivered for. */
  client: string;
  about: string;
  image?: string;
}

/**
 * A delivered project. `CreativeWork` rather than `Article`, because the page
 * documents a piece of work rather than publishing an opinion — and no date,
 * rating or result is asserted, since none has been verified.
 */
export function projectJsonLd({
  name,
  description,
  path,
  client,
  about,
  image,
}: ProjectJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: absoluteUrl(path),
    creator: PROVIDER_REF,
    about,
    locationCreated: { '@type': 'Place', name: 'Erode, Tamil Nadu, India' },
    sourceOrganization: { '@type': 'Organization', name: client },
    ...(image ? { image: `${siteConfig.url}${image}` } : {}),
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * FAQ structured data. Only ever called with questions and answers that are
 * visible on the page itself — schema that does not match the page is a
 * manual-action waiting to happen.
 */
export function faqJsonLd(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

/** A list of items shown on an index page, e.g. the services catalog. */
export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
