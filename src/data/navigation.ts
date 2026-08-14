export interface NavLink {
  label: string;
  to: string;
}

/** Desktop navigation — deliberately five items plus one action. */
export const primaryNav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
];

/** Mobile menu adds Contact, since there is room for it in the drawer. */
export const mobileNav: NavLink[] = [...primaryNav, { label: 'Contact', to: '/contact' }];

export const footerServiceLinks: NavLink[] = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Custom Software', to: '/services/custom-software-development' },
  { label: 'ERP Systems', to: '/services/erp-systems' },
  { label: 'Mobile Apps', to: '/services/mobile-app-development' },
  { label: 'AI/ML Solutions', to: '/services/ai-ml-solutions' },
];
