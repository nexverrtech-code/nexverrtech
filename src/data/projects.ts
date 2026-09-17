/**
 * Delivered client work.
 *
 * Rules for this file, without exception: client names, locations, industries
 * and project types are recorded exactly as the company stated them. Features,
 * technology, screenshots and outcomes are only ever filled in from verified
 * material — an unknown stays `undefined`, the page drops that section, and
 * nothing is padded out with plausible-sounding filler.
 */

export interface ProjectOutcome {
  label: string;
  value: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  /** Short line shown under the image. */
  caption?: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  /** The client's business name, as they write it. */
  client: string;
  /** Card and hero title. */
  title: string;
  location: string;
  industry: string;
  /** What was delivered, in three or four words. */
  projectType: string;
  /** One or two lines, used on cards. */
  summary: string;
  tags: string[];
  featured?: boolean;

  /** Case-study body. Sections render only when the field is present. */
  about: string;
  challenge?: string[];
  solution?: string[];
  experience?: string[];

  /** Verified only. Left undefined until the delivered scope is confirmed. */
  features?: string[];
  technology?: string[];
  screenshots?: ProjectScreenshot[];
  outcome?: ProjectOutcome[];

  /** Slugs from `services.ts` — genuine relationships only. */
  relatedServices: string[];
  /** Slug from `industries.ts`. */
  relatedIndustry?: string;

  seoTitle: string;
  metaDescription: string;
  /** Path under `public/og/`. Falls back to the default card when absent. */
  ogImage?: string;
}

export const projects: Project[] = [
  {
    slug: 'sri-aadhi-kumaran-batteries',
    client: 'Sri Aadhi Kumaran Batteries',
    title: 'Sri Aadhi Kumaran Batteries',
    location: 'Erode, Tamil Nadu',
    industry: 'Battery / Automotive',
    projectType: 'Business Website',
    summary:
      'A business website and digital presence for a battery and automotive business in Erode.',
    tags: ['Business Website', 'Digital Presence', 'Responsive'],
    featured: true,

    about:
      'Sri Aadhi Kumaran Batteries is a battery and automotive business operating in Erode, Tamil Nadu. NEXVERR TECHNOLOGIES designed and built the business website that carries its presence online.',

    challenge: [
      'A business like this is chosen close to home, and the decision is usually made on a phone — while someone is standing next to a vehicle that will not start. Whatever they find at that moment is the business, as far as they are concerned.',
      'So the brief was narrow and unforgiving: the site had to load quickly on a mobile connection, say plainly what the business does and where it is, and make getting in touch the easiest thing on the page. Anything that got between those three things was scope to be cut.',
    ],

    solution: [
      'We structured the site around that one path — understand the business, then reach it — and designed the pages so a visitor arriving on any of them can do both without scrolling to hunt for it.',
      'The build is responsive by default rather than adapted afterwards: the phone layout was designed first, because that is where the site is actually used. Content is written in plain language, headings describe what is under them, and contact details sit where a thumb already is.',
    ],

    experience: [
      'We started where we always start — with how the business actually operates and what a customer needs from it — before a single page was designed.',
      'From there the work ran through design, build, testing across real devices, and deployment, with the site reviewed against how it is used rather than how it looks in a mockup. It remains supported after launch.',
    ],

    relatedServices: ['website-development', 'ui-ux-design', 'maintenance-technical-support'],
    relatedIndustry: 'retail',

    seoTitle: 'Sri Aadhi Kumaran Batteries Website Project | NEXVERR',
    metaDescription:
      'Explore the website project developed by NEXVERR TECHNOLOGIES for Sri Aadhi Kumaran Batteries in Erode, Tamil Nadu.',
    ogImage: '/og/sri-aadhi-kumaran-batteries.png',
  },
  {
    slug: 'kongu-nila-matrimony',
    client: 'Kongu Nila Matrimony',
    title: 'Kongu Nila Matrimony',
    location: 'Erode, Tamil Nadu',
    industry: 'Matrimony',
    projectType: 'Digital Platform',
    summary:
      'A matrimony website and digital platform for a matrimony service based in Erode.',
    tags: ['Digital Platform', 'Matrimony', 'Responsive'],
    featured: true,

    about:
      'Kongu Nila Matrimony is a matrimony service based in Erode, Tamil Nadu. NEXVERR TECHNOLOGIES developed its matrimony website and digital platform.',

    challenge: [
      'Matrimony is a trust category before it is a technology category. Families are handing over something personal, often on behalf of someone else, and they decide whether a service is serious within a few seconds of landing on it.',
      'That put the weight of the project on clarity and composure: the platform had to present the service properly, be unambiguous about how to make contact, and hold up on the mid-range phones most of its visitors use.',
    ],

    solution: [
      'We designed the platform around how a family actually approaches a matrimony service — read, judge, then reach out — and kept the interface calm enough that nothing on screen competes with that.',
      'Layout, typography and spacing carry the credibility here, so the design work went into restraint rather than decoration. The build is responsive throughout and structured so pages stay fast on ordinary mobile connections.',
    ],

    experience: [
      'The engagement began with the service itself: who uses it, what they are trying to do, and what a family needs to see before it makes contact.',
      'Design, build, testing and deployment followed from that, reviewed at each stage against real usage rather than a specification written up front. The platform continues to be supported after launch.',
    ],

    relatedServices: ['website-development', 'ui-ux-design', 'custom-software-development'],

    seoTitle: 'Kongu Nila Matrimony Website Project | NEXVERR',
    metaDescription:
      'Explore the digital platform project developed by NEXVERR TECHNOLOGIES for Kongu Nila Matrimony in Erode, Tamil Nadu.',
    ogImage: '/og/kongu-nila-matrimony.png',
  },
];

export const projectMap = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, Project>;

export const featuredProjects: Project[] = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projectMap[slug];
}

/** Projects that name this service as related — powers "Related work" blocks. */
export function getProjectsForService(serviceSlug: string): Project[] {
  return projects.filter((project) => project.relatedServices.includes(serviceSlug));
}

export function getProjectsForIndustry(industrySlug: string): Project[] {
  return projects.filter((project) => project.relatedIndustry === industrySlug);
}

export const hasProjects = projects.length > 0;
