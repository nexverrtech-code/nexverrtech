/**
 * Social preview cards.
 *
 * One definition per card drives two things that must agree: the PNG written to
 * `public/og/` by `scripts/build-og-assets.mjs`, and the `og:image` URL the
 * matching route points at. Referencing a card that is not in this list is a
 * type error, so a route can never advertise an image that was never rendered.
 */
export type OgTone = 'cyan' | 'blue' | 'violet';

export interface OgCard {
  /** File name under `public/og/`, without the extension. */
  key: string;
  /** Small label above the title. */
  eyebrow: string;
  /** Title lines. Kept short — anything past ~22 characters a line gets small. */
  lines: string[];
  /** Optional line under the title, e.g. a location. */
  footnote?: string;
  tone: OgTone;
}

export const ogCards = [
  {
    key: 'og-default',
    eyebrow: 'NEXVERR TECHNOLOGIES',
    lines: ['BUSINESS', 'DIGITALIZATION'],
    footnote: 'IDEATE / BUILD / SCALE',
    tone: 'blue',
  },
  {
    key: 'services',
    eyebrow: 'SERVICES',
    lines: ['SOFTWARE BUILT', 'FOR HOW YOU WORK'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'cyan',
  },
  {
    key: 'solutions',
    eyebrow: 'SOLUTIONS',
    lines: ['BUILT AROUND', 'YOUR INDUSTRY'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'violet',
  },
  {
    key: 'projects',
    eyebrow: 'PROJECTS',
    lines: ['REAL BUSINESSES', 'REAL SOLUTIONS'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'blue',
  },
  {
    key: 'blog',
    eyebrow: 'INSIGHTS',
    lines: ['NOTES ON', 'BUSINESS SOFTWARE'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'cyan',
  },
  {
    key: 'about',
    eyebrow: 'ABOUT',
    lines: ['A TECHNOLOGY', 'PARTNER IN ERODE'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'violet',
  },
  {
    key: 'contact',
    eyebrow: 'CONTACT',
    lines: ['START A PROJECT', 'WITH NEXVERR'],
    footnote: 'ERODE / TAMIL NADU',
    tone: 'blue',
  },
  {
    key: 'website-development',
    eyebrow: 'SERVICE',
    lines: ['WEBSITE', 'DEVELOPMENT'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'cyan',
  },
  {
    key: 'custom-software',
    eyebrow: 'SERVICE',
    lines: ['CUSTOM SOFTWARE', 'DEVELOPMENT'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'blue',
  },
  {
    key: 'erp',
    eyebrow: 'SERVICE',
    lines: ['ERP SYSTEMS'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'violet',
  },
  {
    key: 'billing-software',
    eyebrow: 'SERVICE',
    lines: ['BILLING AND', 'INVENTORY SYSTEMS'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'cyan',
  },
  {
    key: 'restaurant-pos',
    eyebrow: 'SERVICE',
    lines: ['RESTAURANT POS', 'AND BILLING'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'blue',
  },
  {
    key: 'manufacturing',
    eyebrow: 'SERVICE',
    lines: ['MANUFACTURING', 'SOFTWARE'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'violet',
  },
  {
    key: 'mobile-apps',
    eyebrow: 'SERVICE',
    lines: ['MOBILE APP', 'DEVELOPMENT'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'cyan',
  },
  {
    key: 'business-automation',
    eyebrow: 'SERVICE',
    lines: ['BUSINESS', 'AUTOMATION'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'blue',
  },
  {
    key: 'ecommerce',
    eyebrow: 'SERVICE',
    lines: ['E-COMMERCE', 'DEVELOPMENT'],
    footnote: 'NEXVERR TECHNOLOGIES',
    tone: 'violet',
  },
  {
    key: 'sri-aadhi-kumaran-batteries',
    eyebrow: 'PROJECT',
    lines: ['SRI AADHI KUMARAN', 'BATTERIES'],
    footnote: 'ERODE / TAMIL NADU',
    tone: 'blue',
  },
  {
    key: 'kongu-nila-matrimony',
    eyebrow: 'PROJECT',
    lines: ['KONGU NILA', 'MATRIMONY'],
    footnote: 'ERODE / TAMIL NADU',
    tone: 'violet',
  },
] as const satisfies readonly OgCard[];

export type OgCardKey = (typeof ogCards)[number]['key'];

/** `/og/<key>.png` for a card that exists. */
export function ogImage(key: OgCardKey): string {
  return `/og/${key}.png`;
}

/** Service slugs that have their own card. Everything else uses the default. */
export const serviceOgCards: Record<string, OgCardKey> = {
  'website-development': 'website-development',
  'custom-software-development': 'custom-software',
  'erp-systems': 'erp',
  'billing-inventory-systems': 'billing-software',
  'restaurant-pos': 'restaurant-pos',
  'manufacturing-software': 'manufacturing',
  'mobile-app-development': 'mobile-apps',
  'business-automation': 'business-automation',
  'ecommerce-development': 'ecommerce',
};
