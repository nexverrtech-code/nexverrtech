export interface NavLink {
  label: string;
  to: string;
}

/** Desktop navigation. Six destinations plus the primary action. */
export const primaryNav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/** The mobile drawer has room for the insights section too. */
export const mobileNav: NavLink[] = [
  ...primaryNav.slice(0, 5),
  { label: 'Insights', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

/** Footer column: the services people arrive looking for. */
export const footerServiceLinks: NavLink[] = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Custom Software', to: '/services/custom-software-development' },
  { label: 'ERP Systems', to: '/services/erp-systems' },
  { label: 'Billing & Inventory', to: '/services/billing-inventory-systems' },
  { label: 'Restaurant POS', to: '/services/restaurant-pos' },
  { label: 'Mobile Apps', to: '/services/mobile-app-development' },
];

/** Footer column: industry landing pages. */
export const footerSolutionLinks: NavLink[] = [
  { label: 'Retail', to: '/solutions/retail' },
  { label: 'Restaurants', to: '/solutions/restaurants' },
  { label: 'Manufacturing', to: '/solutions/manufacturing' },
  { label: 'Education', to: '/solutions/education' },
  { label: 'Healthcare', to: '/solutions/healthcare' },
  { label: 'All industries', to: '/solutions' },
];

/** Footer column: the company itself. */
export const footerCompanyLinks: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Insights', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
];
