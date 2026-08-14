import type { IconName } from './icons';

/**
 * The six capability groups shown on the homepage. Every individual service in
 * `services.ts` belongs to exactly one of these, so the homepage stays short
 * while the Services page carries the full catalog.
 */
export type SolutionGroupId =
  | 'web-ecommerce'
  | 'business-software'
  | 'mobile'
  | 'automation-ai'
  | 'cloud-integrations'
  | 'design-saas';

export interface SolutionGroup {
  id: SolutionGroupId;
  title: string;
  summary: string;
  icon: IconName;
}

export const solutionGroups: SolutionGroup[] = [
  {
    id: 'web-ecommerce',
    title: 'Web & E-Commerce',
    summary: 'Websites, e-commerce platforms and digital portals.',
    icon: 'Globe',
  },
  {
    id: 'business-software',
    title: 'Business Software',
    summary: 'ERP, CRM, POS, billing, inventory and custom business systems.',
    icon: 'Boxes',
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    summary: 'Mobile application development for Android and iOS.',
    icon: 'Smartphone',
  },
  {
    id: 'automation-ai',
    title: 'Automation & AI',
    summary: 'Business automation and AI/ML solutions.',
    icon: 'BrainCircuit',
  },
  {
    id: 'cloud-integrations',
    title: 'Cloud & Integrations',
    summary: 'Cloud deployment, APIs and third-party integrations.',
    icon: 'Cloud',
  },
  {
    id: 'design-saas',
    title: 'UI/UX & SaaS',
    summary: 'UI/UX design and SaaS product development.',
    icon: 'Layers',
  },
];

export const solutionGroupMap = Object.fromEntries(
  solutionGroups.map((group) => [group.id, group]),
) as Record<SolutionGroupId, SolutionGroup>;
