import { services } from '@/data/services';
import { getServiceContent } from '@/data/serviceContent';
import { industries } from '@/data/industries';
import { projects } from '@/data/projects';
import { sortedBlogPosts } from '@/data/blog';
import { itemListJsonLd } from './seo';
import {
  blogPostSeo,
  projectSeo,
  routeSeo,
  serviceSeo,
  solutionSeo,
  type RouteSeo,
} from './routeSeo';

/**
 * The whole site, assembled.
 *
 * Kept apart from `routeSeo.ts` on purpose: this module touches every content
 * collection on the site, and `routeSeo.ts` is imported by the homepage. Only
 * `scripts/build-seo.mjs` — which runs in Node, where a few hundred kilobytes
 * of content costs nothing — imports this one.
 */

/** The ItemList each index page publishes. The page builds its own copy. */
const serviceListSchema = () =>
  itemListJsonLd(
    'NEXVERR TECHNOLOGIES services',
    services.map((service) => ({ name: service.title, path: `/services/${service.slug}` })),
  );

const solutionListSchema = () =>
  itemListJsonLd(
    'Industries NEXVERR TECHNOLOGIES builds for',
    industries.map((industry) => ({ name: industry.name, path: `/solutions/${industry.slug}` })),
  );

const projectListSchema = () =>
  itemListJsonLd(
    'Projects by NEXVERR TECHNOLOGIES',
    projects.map((project) => ({ name: project.title, path: `/projects/${project.slug}` })),
  );

const blogListSchema = () =>
  itemListJsonLd(
    'Articles by NEXVERR TECHNOLOGIES',
    sortedBlogPosts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
  );

function withSchema(route: RouteSeo, extra: object): RouteSeo {
  return { ...route, schema: [...(route.schema ?? []), extra] };
}

/**
 * Everything that belongs in the sitemap and gets a prerendered HTML file,
 * ordered the way the site is structured — which is also how it reads in the
 * sitemap during a crawl.
 */
export function indexableRoutes(): RouteSeo[] {
  return [
    routeSeo.home,
    withSchema(routeSeo.services, serviceListSchema()),
    ...services.map((service) => serviceSeo(service, getServiceContent(service.slug).faqs ?? [])),
    withSchema(routeSeo.solutions, solutionListSchema()),
    ...industries.map(solutionSeo),
    withSchema(routeSeo.projects, projectListSchema()),
    ...projects.map(projectSeo),
    withSchema(routeSeo.blog, blogListSchema()),
    ...sortedBlogPosts.map(blogPostSeo),
    routeSeo.about,
    routeSeo.contact,
    routeSeo.privacy,
    routeSeo.terms,
  ];
}
