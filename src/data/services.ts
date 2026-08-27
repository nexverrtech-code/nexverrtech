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
  /** Search-result title. Leads with the keyword this page targets, ~60 chars. */
  seoTitle: string;
  /** Search-result snippet. Unique per service, 145-160 characters. */
  metaDescription: string;
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
    seoTitle: 'Website Development Company in Erode | NEXVERR',
    metaDescription:
      'Corporate websites, landing pages and customer portals built in Erode, Tamil Nadu — fast to load, right on every screen size and simple to keep updated.',
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
    seoTitle: 'E-Commerce Website Development Company India | NEXVERR',
    metaDescription:
      'E-commerce website development in India: product catalog, checkout, payment gateways, orders and inventory set up around your real pricing and delivery rules.',
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
    seoTitle: 'Custom Software Development Company in Erode | NEXVERR',
    metaDescription:
      'Custom software development company in Erode, Tamil Nadu. We map how your business already works, then build and maintain a system shaped around that workflow.',
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
    seoTitle: 'ERP Software for Small Business in India | NEXVERR',
    metaDescription:
      'Affordable ERP software for small and mid-sized businesses in India. Inventory, purchase, sales, accounts and dashboards in one system, scoped to what you run.',
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
    seoTitle: 'Restaurant POS & Billing Software India | NEXVERR',
    metaDescription:
      'Restaurant POS and billing software for India: table, takeaway and delivery orders, kitchen tickets, menu and tax setup, and daily sales reports in one system.',
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
    seoTitle: 'Billing & Inventory Software for Business | NEXVERR',
    metaDescription:
      'Billing and inventory software built around your tax rules and how your counter works — invoices, stock in and out, supplier records, reorder alerts, reports.',
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
    seoTitle: 'CRM Software for Small Business in India | NEXVERR',
    metaDescription:
      'CRM software matched to your real sales process: lead capture and assignment, pipeline stages, follow-up reminders, customer history and conversion reporting.',
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
    seoTitle: 'School & College Management Software India | NEXVERR',
    metaDescription:
      'School and college management software for India: admissions, attendance, timetables, examinations, fee collection, and staff, student and parent access levels.',
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
    seoTitle: 'Clinic & Hospital Management Software India | NEXVERR',
    metaDescription:
      'Clinic and hospital management software for India — appointment scheduling, patient records, prescriptions, billing and role-based access to sensitive data.',
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
    seoTitle: 'Gym & Fitness Management Software India | NEXVERR',
    metaDescription:
      'Gym and fitness studio management software: member profiles, plans and pricing, check-in and attendance, renewal and expiry tracking, and dues reporting.',
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
    seoTitle: 'Manufacturing Software & Production ERP | NEXVERR',
    metaDescription:
      'Manufacturing software for production floors in Tamil Nadu: job order tracking, raw material consumption, work-in-progress visibility, quality logs and output.',
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
    seoTitle: 'Mobile App Development Company in Erode | NEXVERR',
    metaDescription:
      'Android and iOS app development in Erode, Tamil Nadu — customer-facing apps, field team tools and mobile companions to the systems you already run today.',
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
    seoTitle: 'Admin Dashboards & Business Analytics | NEXVERR',
    metaDescription:
      'Admin dashboards and analytics designed around the decisions they support — role-specific views, filters and drill-downs, exports and scheduled reporting.',
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
    seoTitle: 'Business Process Automation Services India | NEXVERR',
    metaDescription:
      'Business process automation in India: we map where staff re-enter data or chase a status, then automate that flow with scheduled jobs, alerts and documents.',
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
    seoTitle: 'API & Third-Party Integration Services | NEXVERR',
    metaDescription:
      'API development and third-party integration services — payment, messaging, accounting and logistics gateways, data sync between systems, webhooks and retries.',
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
    seoTitle: 'AI & Machine Learning Development Company India | NEXVERR',
    metaDescription:
      'AI development company in India applying machine learning to a defined business problem — classification, prediction and document handling your data supports.',
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
    seoTitle: 'Cloud Deployment & Hosting Services | NEXVERR',
    metaDescription:
      'Cloud deployment and hosting: environments, domain, DNS and SSL setup, build and release pipelines, backups and recovery, plus monitoring and scaling headroom.',
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
    seoTitle: 'Software Maintenance & Technical Support | NEXVERR',
    metaDescription:
      'Software maintenance and technical support after launch: bug fixes, security and dependency updates, feature changes, performance monitoring and team support.',
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
    seoTitle: 'UI/UX Design Services for Web & Mobile Apps | NEXVERR',
    metaDescription:
      'UI/UX design for web and mobile: user flows and information architecture, wireframes and prototypes, interface design, and accessible responsive layouts.',
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
    seoTitle: 'SaaS Product Development Company India | NEXVERR',
    metaDescription:
      'SaaS product development in India: multi-tenant data design, subscription and plan management, onboarding and admin tooling, plus release and iteration support.',
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
