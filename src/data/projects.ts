export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  industry: string;
  /** One or two lines, used on cards. */
  summary: string;
  tags: string[];
  /** Path under `public/projects/`. Falls back to the brand panel when absent. */
  image?: string;
  featured?: boolean;
  /** Marks preview-only content so it can never be mistaken for real work. */
  isSample?: boolean;

  // Detail page
  overview?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  technology?: string[];
  screenshots?: { src: string; alt: string }[];
  results?: ProjectResult[];
}

/**
 * REAL PROJECTS GO HERE.
 *
 * This array is intentionally empty. Add an entry per delivered project, with
 * only facts that can be stood behind — no invented client names, metrics or
 * outcomes. The Selected Work section and /projects render an honest empty
 * state until this has content, and start rendering cards the moment it does.
 */
export const projects: Project[] = [];

/**
 * Preview-only data so the card grid and the /projects/:slug detail template can
 * be reviewed before real case studies are written. Every entry is badged
 * "Sample" in the UI. Leave `showSampleProjects` false for production.
 */
export const showSampleProjects = false;

export const sampleProjects: Project[] = [
  {
    slug: 'sample-restaurant-platform',
    title: 'Sample — Restaurant Operations Platform',
    industry: 'Hospitality',
    summary:
      'Placeholder case study showing how a POS and kitchen-flow project would be presented.',
    tags: ['POS', 'Billing', 'Dashboard'],
    featured: true,
    isSample: true,
    overview: 'Replace this with a short description of what was delivered.',
    challenge: 'Replace this with the business problem the client came with.',
    solution: 'Replace this with the solution that was designed and built.',
    features: ['Feature one', 'Feature two', 'Feature three'],
    technology: ['React', 'TypeScript', 'Node.js'],
    results: [{ label: 'Metric', value: 'Add only verified figures' }],
  },
  {
    slug: 'sample-inventory-system',
    title: 'Sample — Billing & Inventory System',
    industry: 'Retail',
    summary: 'Placeholder case study for a billing and stock-control engagement.',
    tags: ['Billing', 'Inventory', 'Reports'],
    featured: true,
    isSample: true,
    overview: 'Replace this with a short description of what was delivered.',
    challenge: 'Replace this with the business problem the client came with.',
    solution: 'Replace this with the solution that was designed and built.',
    features: ['Feature one', 'Feature two', 'Feature three'],
    technology: ['React', 'TypeScript', 'PostgreSQL'],
  },
  {
    slug: 'sample-institution-portal',
    title: 'Sample — Institution Management Portal',
    industry: 'Education',
    summary: 'Placeholder case study for an admissions and academics platform.',
    tags: ['Portal', 'Admin', 'Reporting'],
    featured: true,
    isSample: true,
    overview: 'Replace this with a short description of what was delivered.',
    challenge: 'Replace this with the business problem the client came with.',
    solution: 'Replace this with the solution that was designed and built.',
    features: ['Feature one', 'Feature two', 'Feature three'],
    technology: ['React', 'TypeScript', 'REST API'],
  },
];

/** What the UI actually renders. */
export const visibleProjects: Project[] = showSampleProjects ? sampleProjects : projects;

export const featuredProjects: Project[] = visibleProjects
  .filter((project) => project.featured)
  .slice(0, 4);

export function getProjectBySlug(slug: string): Project | undefined {
  return visibleProjects.find((project) => project.slug === slug);
}

export const hasProjects = visibleProjects.length > 0;
