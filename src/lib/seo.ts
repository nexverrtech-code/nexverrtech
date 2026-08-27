import { contactConfig, siteConfig } from './config';

export interface SeoInput {
  title: string;
  description: string;
  /** Path beginning with `/`, e.g. `/services`. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * Minimal head manager. A dedicated head library would be another dependency for
 * something this small, so tags are written directly and marked `data-nx-seo` so
 * they can be reconciled on every route change.
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

export function applySeo({ title, description, path, image, type = 'website', noIndex }: SeoInput) {
  const url = `${siteConfig.url}${path === '/' ? '/' : path}`;
  const ogImage = `${siteConfig.url}${image ?? siteConfig.ogImage}`;

  document.title = title;

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
  upsertLink('canonical', url);

  upsertMeta('property', 'og:site_name', siteConfig.name);
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', ogImage);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', ogImage);
}

/** Stable node id so other schema on the site can point back at the company. */
const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

const AREA_SERVED = [
  { '@type': 'City', name: 'Erode' },
  { '@type': 'State', name: 'Tamil Nadu' },
  { '@type': 'Country', name: 'India' },
];

/**
 * JSON-LD for the organisation. Only facts from the company profile.
 *
 * Typed as `ProfessionalService` as well as `Organization`: that is the
 * LocalBusiness subtype for a services firm trading from one place, and it is
 * what makes the business describable to Google as a local result rather than
 * only a website. Contact rows are omitted entirely when unconfigured — an
 * empty `telephone` is worse than no `telephone`.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/nexverr-symbol.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    slogan: siteConfig.statement,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Erode',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    areaServed: AREA_SERVED,
    ...(contactConfig.isEmailConfigured ? { email: contactConfig.email } : {}),
    ...(contactConfig.isWhatsAppConfigured
      ? { telephone: `+${contactConfig.whatsappNumber}` }
      : {}),
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

/**
 * One service offering. The provider is inlined rather than referenced by id
 * alone, because the organisation node itself is only rendered on the homepage.
 */
export function serviceJsonLd({ name, description, path, category }: ServiceJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${siteConfig.url}${path}`,
    ...(category ? { serviceType: category } : {}),
    provider: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: AREA_SERVED,
  };
}

export interface Crumb {
  name: string;
  /** Path beginning with `/`. */
  path: string;
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
      item: `${siteConfig.url}${crumb.path === '/' ? '/' : crumb.path}`,
    })),
  };
}
