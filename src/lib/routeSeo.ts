import { services, type Service } from '@/data/services';
import { siteConfig } from './config';
import type { SeoInput } from './seo';

/**
 * Every crawlable route and the metadata search engines should see for it.
 *
 * This is the single source of truth for three things that must agree, and
 * previously did not: the `<title>`/description/canonical a visitor's browser
 * ends up with, the same tags baked into the static HTML at build time, and the
 * URL list in `sitemap.xml`. `scripts/build-seo.mjs` generates the last two from
 * this file, so a sitemap can never again point somewhere the canonical tags do
 * not.
 */
export interface RouteSeo extends SeoInput {
  /** Sitemap priority, 0.0-1.0. Relative weight within this site only. */
  priority: number;
}

export const routeSeo = {
  home: {
    title: 'NEXVERR TECHNOLOGIES — Turn Business Challenges Into Digital Solutions',
    description: siteConfig.description,
    path: '/',
    priority: 1.0,
  },
  services: {
    title: 'Services — Custom Software, ERP, Mobile & AI | NEXVERR TECHNOLOGIES',
    description:
      'The full NEXVERR service catalog: websites and e-commerce, ERP, CRM, POS and billing systems, mobile apps, automation, AI/ML, cloud, UI/UX and SaaS product development.',
    path: '/services',
    priority: 0.9,
  },
  solutions: {
    title: 'Solutions by Industry — Retail, Education, Healthcare | NEXVERR TECHNOLOGIES',
    description:
      'Solutions built around how your business works — retail, e-commerce, education, healthcare, hospitality, manufacturing, real estate, fitness, logistics and finance.',
    path: '/solutions',
    priority: 0.8,
  },
  projects: {
    title: 'Projects — Work by NEXVERR TECHNOLOGIES',
    description:
      'Systems NEXVERR TECHNOLOGIES has designed, built, deployed and continues to support for businesses across retail, education, healthcare, hospitality and manufacturing.',
    path: '/projects',
    priority: 0.8,
  },
  about: {
    title: 'About — NEXVERR TECHNOLOGIES, Erode',
    description:
      'NEXVERR TECHNOLOGIES is a technology company based in Erode, Tamil Nadu, focused on business digitalization and custom software built around how a business actually works.',
    path: '/about',
    priority: 0.7,
  },
  contact: {
    title: 'Contact — Start a Project with NEXVERR TECHNOLOGIES',
    description:
      'Tell NEXVERR TECHNOLOGIES what you are building. Send your project requirement over WhatsApp or email and we will come back with the right approach.',
    path: '/contact',
    priority: 0.9,
  },
} satisfies Record<string, RouteSeo>;

/** Per-service metadata, written once in `services.ts` and used everywhere. */
export function serviceSeo(service: Service): RouteSeo {
  return {
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    priority: 0.6,
  };
}

/**
 * Everything that belongs in the sitemap and gets a prerendered HTML file.
 *
 * Project detail pages are deliberately absent: `projects.ts` is empty until
 * real case studies exist, so there is nothing to index yet.
 */
export function indexableRoutes(): RouteSeo[] {
  return [
    routeSeo.home,
    routeSeo.services,
    routeSeo.solutions,
    routeSeo.projects,
    routeSeo.about,
    routeSeo.contact,
    ...services.map(serviceSeo),
  ];
}
