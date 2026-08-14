import { siteConfig } from './config';

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
  const url = `${siteConfig.url}${path === '/' ? '' : path}`;
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

/** JSON-LD for the organisation. Only facts from the company profile. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    slogan: siteConfig.statement,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Erode',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  };
}
