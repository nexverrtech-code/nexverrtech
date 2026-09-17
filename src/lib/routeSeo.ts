import type { Service } from '@/data/services';
import type { Industry } from '@/data/industries';
import type { Project } from '@/data/projects';
import type { BlogPost } from '@/data/blog';
import type { Faq } from '@/data/faq';
import { solutionGroupMap } from '@/data/solutions';
import { ogImage, serviceOgCards } from './ogCards';
import { siteConfig } from './config';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  projectJsonLd,
  serviceJsonLd,
  webSiteJsonLd,
  type Crumb,
  type SeoInput,
} from './seo';

/**
 * Every crawlable route, and the metadata search engines should see for it.
 *
 * This is the single source of truth for four things that must agree: the
 * `<title>`, description, canonical and structured data a visitor's browser
 * ends up with; the same tags baked into the static HTML at build time; the
 * visible breadcrumb trail; and the URL list in `sitemap.xml`.
 * `scripts/build-seo.mjs` generates the static pages and the sitemap from the
 * list in `siteRoutes.ts`, which is assembled out of this file, so a sitemap can
 * never again point somewhere the canonical tags do not.
 *
 * Nothing here imports a content collection at module scope — only types. The
 * homepage imports this module, and pulling every article, industry page and
 * service FAQ into the first chunk a visitor downloads would be a strange price
 * to pay for a `<title>`. Content-derived schema is assembled by the page that
 * already has that data, or by `siteRoutes.ts` at build time.
 *
 * To add a page: add it here, add it to `siteRoutes.ts`, and point the page
 * component's `useSeo()` at the entry. It then appears in the prerender, the
 * sitemap and the breadcrumbs together.
 */
export interface RouteSeo extends SeoInput {
  /** Sitemap priority, 0.0-1.0. Relative weight within this site only. */
  priority: number;
  /** ISO date for `<lastmod>`. */
  lastmod?: string;
  /** Visible breadcrumb trail, and the source of the BreadcrumbList schema. */
  breadcrumbs?: Crumb[];
}

/**
 * Bump when page copy changes materially. Used as `lastmod` for pages that do
 * not carry their own date — a build timestamp on every URL is noise, and
 * search engines learn to ignore it.
 */
export const CONTENT_UPDATED = '2026-09-16';

const HOME_CRUMB: Crumb = { name: 'Home', path: '/' };

function trail(...crumbs: Crumb[]): Crumb[] {
  return [HOME_CRUMB, ...crumbs];
}

/* ------------------------------------------------------------ static routes */

export const routeSeo = {
  home: {
    title: 'Software Development Company in Erode | NEXVERR TECHNOLOGIES',
    description: siteConfig.description,
    path: '/',
    image: ogImage('og-default'),
    priority: 1.0,
    lastmod: CONTENT_UPDATED,
    schema: [organizationJsonLd(), webSiteJsonLd()],
  },

  services: {
    title: 'Services — Custom Software, ERP & Mobile Apps | NEXVERR',
    description:
      'The full NEXVERR service catalog: websites and e-commerce, ERP, CRM, POS and billing systems, mobile apps, automation, AI/ML, cloud, UI/UX and SaaS product development.',
    path: '/services',
    image: ogImage('services'),
    priority: 0.9,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'Services', path: '/services' }),
    schema: [breadcrumbJsonLd(trail({ name: 'Services', path: '/services' }))],
  },

  solutions: {
    title: 'Industry Solutions — Retail, Restaurants, Manufacturing | NEXVERR',
    description:
      'Software solutions by industry — retail, e-commerce, restaurants, manufacturing, education, healthcare, fitness, logistics, real estate and finance operations.',
    path: '/solutions',
    image: ogImage('solutions'),
    priority: 0.8,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'Solutions', path: '/solutions' }),
    schema: [breadcrumbJsonLd(trail({ name: 'Solutions', path: '/solutions' }))],
  },

  projects: {
    title: 'Projects — Client Work by NEXVERR TECHNOLOGIES, Erode',
    description:
      'Selected digital projects built by NEXVERR TECHNOLOGIES around real business requirements, including work delivered for businesses in Erode, Tamil Nadu.',
    path: '/projects',
    image: ogImage('projects'),
    priority: 0.8,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'Projects', path: '/projects' }),
    schema: [breadcrumbJsonLd(trail({ name: 'Projects', path: '/projects' }))],
  },

  blog: {
    title: 'Insights — Practical Notes on Business Software | NEXVERR',
    description:
      'Straight answers to the questions businesses ask before buying software — custom versus ready-made, choosing billing software, how restaurant POS works, and ERP.',
    path: '/blog',
    image: ogImage('blog'),
    priority: 0.6,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'Insights', path: '/blog' }),
    schema: [breadcrumbJsonLd(trail({ name: 'Insights', path: '/blog' }))],
  },

  about: {
    title: 'About NEXVERR TECHNOLOGIES — Software Company in Erode',
    description:
      'NEXVERR TECHNOLOGIES is a technology company in Erode, Tamil Nadu working on business digitalization and custom software built around how a business actually works.',
    path: '/about',
    image: ogImage('about'),
    priority: 0.7,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'About', path: '/about' }),
    schema: [
      breadcrumbJsonLd(trail({ name: 'About', path: '/about' })),
      organizationJsonLd(),
    ],
  },

  contact: {
    title: 'Contact — Start a Project with NEXVERR TECHNOLOGIES',
    description:
      'Tell NEXVERR TECHNOLOGIES what you are building. Send your requirement over WhatsApp or email from Erode, Tamil Nadu, and we will come back with the right approach.',
    path: '/contact',
    image: ogImage('contact'),
    priority: 0.9,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'Contact', path: '/contact' }),
    schema: [
      breadcrumbJsonLd(trail({ name: 'Contact', path: '/contact' })),
      organizationJsonLd(),
    ],
  },

  privacy: {
    title: 'Privacy Policy | NEXVERR TECHNOLOGIES',
    description:
      'How NEXVERR TECHNOLOGIES handles information on this website: what the inquiry form does, the analytics and third-party services used, cookies, and your choices.',
    path: '/privacy-policy',
    priority: 0.3,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'Privacy Policy', path: '/privacy-policy' }),
    schema: [breadcrumbJsonLd(trail({ name: 'Privacy Policy', path: '/privacy-policy' }))],
  },

  terms: {
    title: 'Terms & Conditions | NEXVERR TECHNOLOGIES',
    description:
      'The terms that apply to the use of the NEXVERR TECHNOLOGIES website — the scope of the content published here, intellectual property, third-party links and liability.',
    path: '/terms-and-conditions',
    priority: 0.3,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: trail({ name: 'Terms & Conditions', path: '/terms-and-conditions' }),
    schema: [
      breadcrumbJsonLd(trail({ name: 'Terms & Conditions', path: '/terms-and-conditions' })),
    ],
  },
} satisfies Record<string, RouteSeo>;

/** Written to `dist/404.html` and used by the in-app not-found page. */
export const notFoundSeo: RouteSeo = {
  title: 'Page Not Found | NEXVERR TECHNOLOGIES',
  description: 'The page you were looking for does not exist, or it has moved.',
  path: '/404',
  priority: 0,
  noIndex: true,
};

/* ----------------------------------------------------------- dynamic routes */

/**
 * Per-service metadata, written once in `services.ts` and used everywhere.
 * FAQs are passed in rather than looked up, so this module never has to import
 * the long-form service content.
 */
export function serviceSeo(service: Service, faqs: Faq[] = []): RouteSeo {
  const path = `/services/${service.slug}`;
  const crumbs = trail({ name: 'Services', path: '/services' }, { name: service.title, path });
  const card = serviceOgCards[service.slug];

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    path,
    image: card ? ogImage(card) : ogImage('services'),
    priority: 0.7,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: crumbs,
    schema: [
      serviceJsonLd({
        name: service.title,
        description: service.description,
        path,
        category: solutionGroupMap[service.group].title,
      }),
      breadcrumbJsonLd(crumbs),
      ...(faqs.length > 0 ? [faqJsonLd(faqs)] : []),
    ],
  };
}

/** Per-industry solution page. */
export function solutionSeo(industry: Industry): RouteSeo {
  const path = `/solutions/${industry.slug}`;
  const crumbs = trail({ name: 'Solutions', path: '/solutions' }, { name: industry.name, path });

  return {
    title: industry.seoTitle,
    description: industry.metaDescription,
    path,
    image: industry.ogImage ?? ogImage('solutions'),
    priority: 0.7,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: crumbs,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${industry.name} software solutions`,
        description: industry.metaDescription,
        url: `${siteConfig.url}${path}`,
        serviceType: `${industry.name} software`,
        audience: { '@type': 'BusinessAudience', name: industry.name },
        provider: {
          '@type': 'Organization',
          '@id': `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
      breadcrumbJsonLd(crumbs),
      ...(industry.faqs.length > 0 ? [faqJsonLd(industry.faqs)] : []),
    ],
  };
}

/** Per-project case study. */
export function projectSeo(project: Project): RouteSeo {
  const path = `/projects/${project.slug}`;
  const crumbs = trail({ name: 'Projects', path: '/projects' }, { name: project.title, path });

  return {
    title: project.seoTitle,
    description: project.metaDescription,
    path,
    image: project.ogImage ?? ogImage('projects'),
    priority: 0.8,
    lastmod: CONTENT_UPDATED,
    breadcrumbs: crumbs,
    schema: [
      projectJsonLd({
        name: `${project.client} — ${project.projectType}`,
        description: project.metaDescription,
        path,
        client: project.client,
        about: project.industry,
        image: project.ogImage,
      }),
      breadcrumbJsonLd(crumbs),
    ],
  };
}

/** Per-article metadata. */
export function blogPostSeo(post: BlogPost): RouteSeo {
  const path = `/blog/${post.slug}`;
  const crumbs = trail({ name: 'Insights', path: '/blog' }, { name: post.title, path });
  const image = post.ogImage ?? ogImage('blog');

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    path,
    image,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    priority: 0.6,
    lastmod: post.updatedAt ?? post.publishedAt,
    breadcrumbs: crumbs,
    schema: [
      articleJsonLd({
        headline: post.title,
        description: post.excerpt,
        path,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        image,
      }),
      breadcrumbJsonLd(crumbs),
      ...(post.faqs && post.faqs.length > 0 ? [faqJsonLd(post.faqs)] : []),
    ],
  };
}
