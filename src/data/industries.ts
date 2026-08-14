import type { IconName } from './icons';

export interface Industry {
  slug: string;
  name: string;
  icon: IconName;
  /** What this kind of business typically needs software for. */
  focus: string;
}

/**
 * Industries NEXVERR builds for. These describe capability, not client history —
 * case studies only appear here once real project data exists in `projects.ts`.
 */
export const industries: Industry[] = [
  { slug: 'retail', name: 'Retail', icon: 'Store', focus: 'Billing, stock and counter operations.' },
  {
    slug: 'ecommerce',
    name: 'E-Commerce',
    icon: 'ShoppingCart',
    focus: 'Catalog, checkout and order fulfilment.',
  },
  {
    slug: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    focus: 'Admissions, attendance, academics and fees.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: 'HeartPulse',
    focus: 'Appointments, patient records and billing.',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    icon: 'Hotel',
    focus: 'Orders, tables, kitchen flow and billing.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: 'Factory',
    focus: 'Production, materials and job tracking.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: 'Building2',
    focus: 'Listings, enquiries and client follow-up.',
  },
  {
    slug: 'fitness',
    name: 'Fitness',
    icon: 'Dumbbell',
    focus: 'Memberships, plans and renewals.',
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    icon: 'Truck',
    focus: 'Dispatch, tracking and delivery records.',
  },
  {
    slug: 'finance',
    name: 'Finance',
    icon: 'Landmark',
    focus: 'Records, reporting and process automation.',
  },
];
