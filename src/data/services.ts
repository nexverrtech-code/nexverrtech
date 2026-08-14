import type { IconName } from './icons';
import type { SolutionGroupId } from './solutions';

export interface Service {
  slug: string;
  title: string;
  group: SolutionGroupId;
  icon: IconName;
  /** One line, used on cards. */
  summary: string;
  /** Two to three sentences, used on the service detail page. */
  description: string;
  /** What the engagement typically covers. Capability scope, not past results. */
  covers: string[];
}

/**
 * The full service catalog from the company profile. Nothing here is invented —
 * add new entries only when the company actually offers them.
 */
export const services: Service[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    group: 'web-ecommerce',
    icon: 'Globe',
    summary: 'Corporate websites, landing pages and digital portals.',
    description:
      'Websites built around what the business needs the site to do — explain the offer, capture enquiries, or serve as a portal for customers and staff. Built to load fast, work on every screen size and stay easy to update.',
    covers: [
      'Corporate and business websites',
      'Landing pages and campaign sites',
      'Customer and partner portals',
      'Content structure and page-level SEO',
      'Performance and responsive implementation',
    ],
  },
  {
    slug: 'ecommerce-development',
    title: 'E-commerce Development',
    group: 'web-ecommerce',
    icon: 'ShoppingCart',
    summary: 'Online stores with catalog, checkout and order management.',
    description:
      'Online selling platforms covering the full path from product catalog to checkout to fulfilment. Configured around your actual pricing, tax, delivery and inventory rules rather than a generic store template.',
    covers: [
      'Product catalog and variant management',
      'Cart, checkout and payment gateway integration',
      'Order, shipping and returns workflows',
      'Customer accounts and order history',
      'Admin dashboard for day-to-day operations',
    ],
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    group: 'business-software',
    icon: 'Code2',
    summary: 'Software shaped around a workflow no off-the-shelf tool fits.',
    description:
      'When an existing product forces the business to change how it works, custom software does the opposite. We map the current workflow, agree what the system has to do, then build and maintain it.',
    covers: [
      'Workflow and requirement mapping',
      'System and database design',
      'Role-based access and permissions',
      'Reporting and exports',
      'Deployment and ongoing maintenance',
    ],
  },
  {
    slug: 'erp-systems',
    title: 'ERP Systems',
    group: 'business-software',
    icon: 'Boxes',
    summary: 'Connected modules for operations, inventory, finance and staff.',
    description:
      'An ERP ties the separate parts of an operation into one system so data is entered once and visible everywhere. Modules are scoped to what the business runs today, with room to add more later.',
    covers: [
      'Inventory and stock movement',
      'Purchase and sales cycles',
      'Accounts and financial reporting',
      'Staff, roles and approvals',
      'Management dashboards',
    ],
  },
  {
    slug: 'restaurant-pos',
    title: 'Restaurant Management / POS',
    group: 'business-software',
    icon: 'UtensilsCrossed',
    summary: 'Billing, orders, tables and kitchen flow in one system.',
    description:
      'Point-of-sale and restaurant operations built for service speed — taking an order, getting it to the kitchen and closing the bill without friction at the counter.',
    covers: [
      'Table, takeaway and delivery orders',
      'Kitchen order tickets',
      'Menu, pricing and tax configuration',
      'Billing and payment modes',
      'Daily sales and item reports',
    ],
  },
  {
    slug: 'billing-inventory-systems',
    title: 'Billing & Inventory Systems',
    group: 'business-software',
    icon: 'Receipt',
    summary: 'Invoicing, stock control and reporting for daily operations.',
    description:
      'Billing and stock systems for businesses that need accurate invoices and a live view of what is on hand. Built around your tax rules, units, and the way your counter actually operates.',
    covers: [
      'Invoice and receipt generation',
      'Stock in, stock out and adjustments',
      'Supplier and purchase records',
      'Low-stock and reorder visibility',
      'Sales, tax and stock reports',
    ],
  },
  {
    slug: 'crm',
    title: 'CRM',
    group: 'business-software',
    icon: 'Users',
    summary: 'Lead, customer and follow-up tracking in one place.',
    description:
      'A CRM that reflects your real sales process rather than a generic pipeline. Leads, conversations and follow-ups stay in one system so nothing depends on someone remembering.',
    covers: [
      'Lead capture and assignment',
      'Pipeline stages matched to your process',
      'Follow-up reminders and activity history',
      'Customer records and notes',
      'Conversion and performance reporting',
    ],
  },
  {
    slug: 'school-college-management',
    title: 'School / College Management Systems',
    group: 'business-software',
    icon: 'GraduationCap',
    summary: 'Admissions, attendance, academics and fee management.',
    description:
      'Institution management covering the administrative load of running an academic year — from admission through attendance, examinations and fees — with the right view for staff, students and parents.',
    covers: [
      'Admissions and student records',
      'Attendance tracking',
      'Timetable and academic records',
      'Fee collection and dues',
      'Staff, student and parent access',
    ],
  },
  {
    slug: 'healthcare-clinic-solutions',
    title: 'Healthcare / Clinic Solutions',
    group: 'business-software',
    icon: 'HeartPulse',
    summary: 'Appointments, patient records and clinic billing.',
    description:
      'Clinic and healthcare systems built around patient flow — booking, consultation records and billing — with controlled access to sensitive information.',
    covers: [
      'Appointment scheduling',
      'Patient records and visit history',
      'Prescriptions and reports',
      'Billing and payment tracking',
      'Role-based access control',
    ],
  },
  {
    slug: 'gym-fitness-management',
    title: 'Gym / Fitness Management',
    group: 'business-software',
    icon: 'Dumbbell',
    summary: 'Memberships, plans, attendance and renewals.',
    description:
      'Membership operations for gyms and fitness studios: who is active, what plan they are on, when it expires and who needs to be reminded.',
    covers: [
      'Member registration and profiles',
      'Plans, packages and pricing',
      'Attendance and check-in',
      'Renewal and expiry tracking',
      'Payment and dues reporting',
    ],
  },
  {
    slug: 'manufacturing-software',
    title: 'Manufacturing Software',
    group: 'business-software',
    icon: 'Factory',
    summary: 'Production, materials and job tracking on the floor.',
    description:
      'Systems for production environments where material, job status and output need to be visible as work moves through the floor rather than reconstructed at the end of the month.',
    covers: [
      'Production and job order tracking',
      'Raw material and consumption records',
      'Work-in-progress visibility',
      'Quality and rejection logging',
      'Output and efficiency reporting',
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    group: 'mobile',
    icon: 'Smartphone',
    summary: 'Android and iOS applications for customers or field teams.',
    description:
      'Mobile applications for the cases where a phone is the right place for the work — customer-facing apps, field staff tools, or a mobile companion to an existing system.',
    covers: [
      'Android and iOS delivery',
      'Customer-facing and internal apps',
      'Backend and API connectivity',
      'Push notifications',
      'Store release and updates',
    ],
  },
  {
    slug: 'admin-dashboards-analytics',
    title: 'Admin Dashboards & Analytics',
    group: 'business-software',
    icon: 'LayoutDashboard',
    summary: 'Operational dashboards that answer real questions.',
    description:
      'Dashboards designed around the decisions they support, so the numbers on screen are the ones the business actually acts on — not every metric a database can produce.',
    covers: [
      'Role-specific dashboard views',
      'Operational and sales metrics',
      'Filters, date ranges and drill-downs',
      'Exports and scheduled reports',
      'Data visualisation',
    ],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    group: 'automation-ai',
    icon: 'Workflow',
    summary: 'Remove the repetitive manual steps from a workflow.',
    description:
      'Automation applied where a person is currently copying data, re-entering it, or chasing a status. We map the sequence, identify what can run on its own, and automate that part.',
    covers: [
      'Workflow analysis and mapping',
      'Automated data flow between systems',
      'Scheduled jobs and triggers',
      'Notification and alert rules',
      'Document and report generation',
    ],
  },
  {
    slug: 'api-third-party-integrations',
    title: 'API & Third-Party Integrations',
    group: 'cloud-integrations',
    icon: 'Plug',
    summary: 'Connect the systems that currently do not talk to each other.',
    description:
      'Integration work that lets existing tools exchange data — payments, messaging, accounting, logistics or an internal system — including the APIs your own products expose.',
    covers: [
      'Third-party service integration',
      'REST API design and development',
      'Payment and messaging gateways',
      'Data synchronisation between systems',
      'Webhooks and error handling',
    ],
  },
  {
    slug: 'ai-ml-solutions',
    title: 'AI/ML Solutions',
    group: 'automation-ai',
    icon: 'BrainCircuit',
    summary: 'Applied AI where it measurably improves a process.',
    description:
      'AI and machine learning applied to a defined business problem — classification, prediction, document handling or assistance — scoped to what the available data can actually support.',
    covers: [
      'Use-case assessment and feasibility',
      'Data preparation',
      'Model integration into your product',
      'Document and text processing',
      'Ongoing evaluation',
    ],
  },
  {
    slug: 'cloud-deployment-hosting',
    title: 'Cloud Deployment & Hosting',
    group: 'cloud-integrations',
    icon: 'Cloud',
    summary: 'Deploy, host and scale without surprises.',
    description:
      'Getting the product onto infrastructure that stays up and can grow — deployment setup, environments, domains, certificates, backups and monitoring.',
    covers: [
      'Cloud deployment and environments',
      'Domain, DNS and SSL setup',
      'Build and release pipelines',
      'Backups and recovery',
      'Monitoring and scaling',
    ],
  },
  {
    slug: 'maintenance-technical-support',
    title: 'Maintenance & Technical Support',
    group: 'cloud-integrations',
    icon: 'LifeBuoy',
    summary: 'Support after launch, not just up to it.',
    description:
      'Continued ownership after deployment: fixes, updates, security patches and the changes a system needs as the business evolves.',
    covers: [
      'Bug fixes and issue resolution',
      'Security and dependency updates',
      'Feature changes and enhancements',
      'Performance monitoring',
      'Technical support for your team',
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    group: 'design-saas',
    icon: 'PenTool',
    summary: 'Interfaces designed to be used, not just looked at.',
    description:
      'Design work that starts with the task the user is trying to finish. Structure and flow first, then the visual layer — so the interface holds up once real data and real users arrive.',
    covers: [
      'User flow and information architecture',
      'Wireframes and prototypes',
      'Interface and visual design',
      'Design systems and components',
      'Responsive and accessible layouts',
    ],
  },
  {
    slug: 'saas-product-development',
    title: 'SaaS Product Development',
    group: 'design-saas',
    icon: 'Layers',
    summary: 'Multi-tenant products built to be sold as a subscription.',
    description:
      'Product development for software sold as a service — the multi-tenancy, subscription and administration layers a SaaS needs on top of its core features.',
    covers: [
      'Product scoping and architecture',
      'Multi-tenant data design',
      'Subscription and plan management',
      'Onboarding and admin tooling',
      'Release and iteration support',
    ],
  },
];

export const serviceMap = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, Service>;

export function getServicesByGroup(group: SolutionGroupId): Service[] {
  return services.filter((service) => service.group === group);
}

/** Options for the inquiry form's service field. */
export const serviceOptions: string[] = [
  ...services.map((service) => service.title),
  'Not sure yet — need advice',
];
