import type { IconName } from './icons';
import type { Faq } from './faq';

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  icon: IconName;
  /** What this kind of business typically needs software for. One line, used on cards. */
  focus: string;

  /** Page H1. */
  headline: string;
  /** Lead paragraph under the H1. */
  intro: string;
  /** What usually goes wrong in this industry before a system exists. */
  challenges: IndustryChallenge[];
  /** How the work is approached. Two or three paragraphs. */
  approach: string[];
  /** Capability list — what a system for this industry usually has to do. */
  capabilities: string[];
  /** Service slugs from `services.ts` that genuinely apply here. */
  services: string[];
  faqs: Faq[];

  seoTitle: string;
  metaDescription: string;
  ogImage?: string;
}

/**
 * Industries NEXVERR builds for, and the landing page content for each.
 *
 * These describe capability and how the work is approached — not client
 * history. A case study appears on an industry page only when a real project in
 * `projects.ts` is tagged to it.
 */
export const industries: Industry[] = [
  {
    slug: 'retail',
    name: 'Retail',
    icon: 'Store',
    focus: 'Billing, stock and counter operations.',
    headline: 'Retail software that keeps the counter moving',
    intro:
      'Retail runs on two things being right at the same time: the bill in front of the customer and the stock behind the shop. Software for a shop or showroom has to serve both without adding a single step to the sale.',
    challenges: [
      {
        title: 'Stock on paper, stock on the shelf',
        description:
          'Counts drift the moment sales, returns and damages are recorded in different places — or not recorded at all. Nobody notices until an order cannot be fulfilled.',
      },
      {
        title: 'Billing that slows the queue',
        description:
          'Searching for an item, applying the right price and adding tax by hand costs seconds per line, and those seconds are paid for in front of a waiting customer.',
      },
      {
        title: 'Reordering by memory',
        description:
          'Without a live view of what is moving, purchase decisions are made from instinct: fast sellers run out while slow stock sits and ties up money.',
      },
      {
        title: 'No usable picture of the month',
        description:
          'Sales, tax and margin data exist as a pile of bills. Pulling a straight answer out of it is a weekend job, so it never quite happens.',
      },
    ],
    approach: [
      'We start at the counter, because that is where the system either works or gets abandoned. The billing screen is built around the items you actually sell and the way your staff already work — keyboard-first where speed matters, with tax, discounts and units configured to your rules rather than a generic template.',
      'Behind it, every sale, purchase and adjustment moves the same stock record, so the shelf and the screen agree. Reports come off that same data, which means the month-end view is a page you open, not a file somebody has to build.',
    ],
    capabilities: [
      'Fast billing and invoice generation at the counter',
      'Live stock levels with stock-in, stock-out and adjustments',
      'Supplier, purchase and return records',
      'Low-stock visibility and reorder support',
      'Barcode and item-code driven item lookup',
      'Daily, monthly, tax and item-wise sales reporting',
    ],
    services: [
      'billing-inventory-systems',
      'erp-systems',
      'custom-software-development',
      'admin-dashboards-analytics',
      'website-development',
    ],
    faqs: [
      {
        question: 'Can a retail system be built for the way our shop already prices things?',
        answer:
          'Yes — that is the point of building rather than buying. Units, slabs, customer-specific rates, tax treatment and discount rules are configured to match what you do today, so nobody has to change their habits to satisfy the software.',
      },
      {
        question: 'Do we need new hardware at the counter?',
        answer:
          'Usually not. Systems are built to run in a browser on the machine you already use, and to work with the printer and barcode scanner you already own wherever those are supported.',
      },
      {
        question: 'What happens to the stock data we already have?',
        answer:
          'Existing item, price and stock lists are imported during setup when they are available as a spreadsheet or an export from your current tool, so you do not start from an empty system.',
      },
    ],
    seoTitle: 'Retail Billing & Inventory Software Solutions | NEXVERR',
    metaDescription:
      'Retail software for shops and showrooms — fast billing at the counter, live stock levels, supplier and purchase records, and reports that show what actually sells.',
  },
  {
    slug: 'ecommerce',
    name: 'E-Commerce',
    icon: 'ShoppingCart',
    focus: 'Catalog, checkout and order fulfilment.',
    headline: 'E-commerce built around your catalog, not a template',
    intro:
      'An online store is only as good as the rules underneath it — how you price, tax, pack and ship. We build the storefront around those rules instead of bending the business to fit a theme.',
    challenges: [
      {
        title: 'A catalog that does not fit the platform',
        description:
          'Variants, bundles, minimum quantities and slab pricing are where generic stores stop being generic, and where most of the manual workarounds begin.',
      },
      {
        title: 'Checkout drop-off',
        description:
          'Every extra field, redirect and surprise charge costs orders. Checkout has to be short, honest about the total, and reliable on a mid-range phone.',
      },
      {
        title: 'Orders managed in messages',
        description:
          'When order status lives in chat threads and notebooks, packing, dispatch and returns depend on whoever remembers. Customers feel it first.',
      },
      {
        title: 'Two versions of inventory',
        description:
          'A store that does not share stock with the counter oversells. Keeping both in one place removes an entire class of apology.',
      },
    ],
    approach: [
      'We model the catalog first — products, variants, pricing rules, tax and delivery charges — because everything visible downstream is decided there. The storefront is then built to make finding and buying short: clear listings, honest totals, and a checkout that asks only for what is needed to fulfil the order.',
      'Operations get the same attention as the shopfront. Orders, packing status, dispatch and returns run through one admin view, and payment, shipping and messaging services are integrated so status reaches the customer without anyone typing it out.',
    ],
    capabilities: [
      'Product catalog with variants, pricing and tax rules',
      'Cart and checkout tuned for mobile',
      'Payment gateway integration',
      'Order, packing, dispatch and returns workflow',
      'Customer accounts and order history',
      'Admin dashboard for daily operations',
    ],
    services: [
      'ecommerce-development',
      'website-development',
      'billing-inventory-systems',
      'api-third-party-integrations',
      'ui-ux-design',
    ],
    faqs: [
      {
        question: 'Should we build a store or use a ready-made platform?',
        answer:
          'If your catalog, pricing and fulfilment fit a standard platform, use it — we will say so. Building makes sense when the rules are the business: unusual pricing, B2B accounts, or a store that has to share stock and billing with systems you already run.',
      },
      {
        question: 'Can the store share stock with our shop counter?',
        answer:
          'Yes, when both sides are in scope. Either the store and the counter write to one stock record, or the two systems are integrated so levels stay in step.',
      },
      {
        question: 'Which payment gateways can be integrated?',
        answer:
          'Any gateway that publishes an API and is available to your business. The right choice usually comes down to settlement time, charges and the payment modes your customers actually use.',
      },
    ],
    seoTitle: 'E-Commerce Solutions — Catalog, Checkout & Orders | NEXVERR',
    metaDescription:
      'E-commerce solutions covering catalog and pricing rules, mobile checkout and payments, order and delivery workflows, and the admin tools your team runs the store from.',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    icon: 'UtensilsCrossed',
    focus: 'Orders, tables, kitchen flow and billing.',
    headline: 'Restaurant software built for the speed of service',
    intro:
      'A restaurant system is judged during the rush, not during a demo. It has to take an order, get it to the kitchen and close the bill without anyone waiting on the software.',
    challenges: [
      {
        title: 'Orders lost between floor and kitchen',
        description:
          'Handwritten tickets, shouted amendments and three order channels at once are how the wrong dish reaches the wrong table on the busiest night.',
      },
      {
        title: 'Billing that holds up the table',
        description:
          'Split bills, item-level edits, tax and service charges have to be handled in seconds — with the next party already waiting at the door.',
      },
      {
        title: 'Dine-in, takeaway and delivery as separate worlds',
        description:
          'Three channels running on three systems means three versions of the day, and no single number anyone trusts at closing time.',
      },
      {
        title: 'No read on what is actually profitable',
        description:
          'Without item-level sales and consumption, menu decisions are made on impression — which dishes feel popular rather than which ones pay.',
      },
    ],
    approach: [
      'We design the order path first: how an order is taken, how it reaches the kitchen, and how it becomes a bill. That path is built to be fast with one hand on a screen and a queue waiting, because that is the real operating condition.',
      'Menu, pricing, taxes and modifiers are configured to your outlet, and every channel — dine-in, takeaway, delivery — closes into the same day. At the end of service, sales, item performance and payment modes are one report rather than three reconciliations.',
    ],
    capabilities: [
      'Table, takeaway and delivery order handling',
      'Kitchen order tickets and order status',
      'Menu, modifier, pricing and tax configuration',
      'Split, merge and part-payment billing',
      'Daily sales, item-wise and payment-mode reports',
      'Multi-outlet views where more than one branch runs',
    ],
    services: [
      'restaurant-pos',
      'billing-inventory-systems',
      'custom-software-development',
      'mobile-app-development',
      'admin-dashboards-analytics',
    ],
    faqs: [
      {
        question: 'Does the POS work if the internet drops during service?',
        answer:
          'That requirement is agreed up front, because it shapes the architecture. Where service cannot depend on connectivity, the system is designed to keep billing locally and sync when the connection returns.',
      },
      {
        question: 'Can it handle more than one outlet?',
        answer:
          'Yes. Each outlet runs its own service with its own menu and pricing where needed, while owners get a consolidated view across all of them.',
      },
      {
        question: 'Can delivery platform orders come into the same system?',
        answer:
          'Where the platform exposes an integration for your account, those orders can be pulled into the same order flow. Where it does not, the system is designed so entering them by hand takes seconds rather than interrupting service.',
      },
    ],
    seoTitle: 'Restaurant POS & Management Software Solutions | NEXVERR',
    metaDescription:
      'Restaurant software built for service speed — dine-in, takeaway and delivery orders, kitchen tickets, menu and tax setup, fast billing and daily sales reports.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: 'Factory',
    focus: 'Production, materials and job tracking.',
    headline: 'Manufacturing software that makes the floor visible',
    intro:
      'Most production problems are visibility problems. When job status, material consumption and output are only assembled at month end, decisions are always made a month late.',
    challenges: [
      {
        title: 'Job status nobody can answer quickly',
        description:
          'Where a job is, what is holding it up and when it will ship are questions that get answered by walking the floor and asking three people.',
      },
      {
        title: 'Material consumption reconstructed afterwards',
        description:
          'Issued quantities recorded in registers and estimated later make costing an approximation — and approximations compound across a year.',
      },
      {
        title: 'Work-in-progress that only exists in people',
        description:
          'Half-finished work sitting between stages is real value and real risk, and it is usually the least documented thing in the plant.',
      },
      {
        title: 'Quality data that never comes back',
        description:
          'Rejections are recorded as a number, not as a cause, so the same defect is paid for repeatedly.',
      },
    ],
    approach: [
      'We map the actual route a job takes through the floor — stages, handoffs, who records what, and where the paper currently is. The system is then built to capture status at those same points, in the few seconds an operator or supervisor can spare.',
      'Material issue, consumption and returns are recorded against the job rather than the month, so costing follows the work. Output, work-in-progress, rejections and reasons roll up into views that a supervisor and an owner can each read for their own decisions.',
    ],
    capabilities: [
      'Job and production order tracking through each stage',
      'Raw material issue, consumption and return records',
      'Work-in-progress visibility across the floor',
      'Quality checks, rejection logging and reasons',
      'Machine, batch or operator-wise output records',
      'Production, efficiency and costing reports',
    ],
    services: [
      'manufacturing-software',
      'erp-systems',
      'custom-software-development',
      'business-automation',
      'admin-dashboards-analytics',
    ],
    faqs: [
      {
        question: 'Our process is unusual. Will standard ERP modules fit it?',
        answer:
          'Often not, and forcing it is how ERP projects fail. We map your route first and build to it — using standard modules where they genuinely fit and custom work where your process is the thing that makes you competitive.',
      },
      {
        question: 'How does data get entered on the floor?',
        answer:
          'At the points where work already stops: a stage completion, a material issue, a quality check. Entry is designed to be a few taps on a shared screen or phone, because anything longer will not survive a busy shift.',
      },
      {
        question: 'Can it work alongside our accounting software?',
        answer:
          'Yes. Where your accounting tool supports import or an API, production and material data can be handed over instead of being typed twice.',
      },
    ],
    seoTitle: 'Software Solutions for Manufacturing Businesses | NEXVERR',
    metaDescription:
      'Manufacturing solutions that make the floor visible — job orders, material consumption, work-in-progress, quality logging and output reporting as work happens.',
  },
  {
    slug: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    focus: 'Admissions, attendance, academics and fees.',
    headline: 'Software for schools and colleges that runs the academic year',
    intro:
      'An institution runs on a calendar that does not move. Admissions, attendance, examinations and fees all have deadlines, and the administrative load peaks at exactly the same moments every year.',
    challenges: [
      {
        title: 'Admissions spread across registers and spreadsheets',
        description:
          'Applications, documents and follow-ups in separate places mean duplicated records and enquiries nobody is clearly responsible for.',
      },
      {
        title: 'Attendance that takes a period to compile',
        description:
          'Collected on paper and consolidated later, attendance is never current when someone actually needs it.',
      },
      {
        title: 'Fees and dues chased manually',
        description:
          'Working out who has paid what, and reminding the rest, is a recurring administrative task that grows with every batch.',
      },
      {
        title: 'Parents and staff asking the office for everything',
        description:
          'Routine questions — marks, attendance, dues, timetable — become phone calls because there is nowhere else to look.',
      },
    ],
    approach: [
      'We build around the academic calendar rather than a generic database: admissions to enrolment, attendance to academics, examinations to results, and fees to receipts and dues. Each role — office staff, faculty, management — gets the view their work needs and nothing they do not.',
      'Routine questions are moved off the office desk by giving students and parents controlled access to their own information. Access is scoped tightly, because in an institution most of what the system holds is about minors.',
    ],
    capabilities: [
      'Admissions, enquiries and student records',
      'Attendance capture and shortfall visibility',
      'Timetable, subject and faculty allocation',
      'Examinations, marks and result processing',
      'Fee structures, collection, receipts and dues',
      'Role-based access for staff, students and parents',
    ],
    services: [
      'school-college-management',
      'custom-software-development',
      'mobile-app-development',
      'website-development',
      'admin-dashboards-analytics',
    ],
    faqs: [
      {
        question: 'Can it handle our own fee structure and exam pattern?',
        answer:
          'Yes. Fee heads, instalments, concessions, grading schemes and result rules are configured to your institution — they are usually the part a ready-made product cannot bend far enough to fit.',
      },
      {
        question: 'Do parents need an app?',
        answer:
          'Only if it earns its place. A mobile-friendly portal covers most institutions; an app is worth building when notifications and daily use justify it.',
      },
      {
        question: 'How is student data protected?',
        answer:
          'Access is role-based, so each person sees only the records their role requires, and changes to sensitive records are traceable. Hosting, backups and retention are agreed with the institution before launch.',
      },
    ],
    seoTitle: 'Software Solutions for Schools & Colleges | NEXVERR',
    metaDescription:
      'Education solutions for schools and colleges — admissions and student records, attendance, timetables, examinations, fee collection, dues and parent access.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: 'HeartPulse',
    focus: 'Appointments, patient records and billing.',
    headline: 'Clinic and healthcare software built around patient flow',
    intro:
      'In a clinic the software is standing between a patient and their consultation. It has to be quick at the front desk, quiet in the consultation room, and careful with everything it stores.',
    challenges: [
      {
        title: 'A waiting room that does not match the book',
        description:
          'Appointments taken by phone, by message and in person drift apart from the actual queue, and the front desk absorbs the difference.',
      },
      {
        title: 'History scattered across visits',
        description:
          'When previous consultations, prescriptions and reports are not in one place, the patient is asked to remember them.',
      },
      {
        title: 'Billing separated from the visit',
        description:
          'Consultation, procedures and pharmacy recorded separately means reconciliation at the end of every day, and disputes that are hard to settle.',
      },
      {
        title: 'Sensitive records with open access',
        description:
          'Shared logins make it impossible to say who saw or changed what — exactly the question that matters most if it is ever asked.',
      },
    ],
    approach: [
      'We design around the visit: booking, arrival, consultation, prescription, billing and follow-up. Each screen is built for the person using it at that moment — a front desk that can register and bill quickly, a consultation view that shows history without hunting.',
      'Access is role-based from the start, and record changes are traceable. Hosting, backup and retention decisions are made deliberately with the practice, not left to a default.',
    ],
    capabilities: [
      'Appointment scheduling and queue visibility',
      'Patient registration, records and visit history',
      'Consultation notes, prescriptions and report attachments',
      'Billing for consultation, procedures and pharmacy',
      'Role-based access with traceable record changes',
      'Follow-up and recall reminders',
    ],
    services: [
      'healthcare-clinic-solutions',
      'custom-software-development',
      'billing-inventory-systems',
      'mobile-app-development',
      'cloud-deployment-hosting',
    ],
    faqs: [
      {
        question: 'Can patients book online?',
        answer:
          'Yes, where the practice wants it. Online booking is built to respect the same slot rules the front desk uses, so the queue on screen is the queue in the waiting room.',
      },
      {
        question: 'Will it suit a single-doctor clinic?',
        answer:
          'Scope is matched to the practice. A single-doctor clinic usually needs appointments, records and billing done well rather than a hospital-scale system, and that is what gets built.',
      },
      {
        question: 'Where is patient data stored?',
        answer:
          'Wherever the practice decides — your own cloud account, or hosting arranged as part of the project. Storage location, backups and who can access what are agreed in writing before the system goes live.',
      },
    ],
    seoTitle: 'Software Solutions for Clinics & Healthcare | NEXVERR',
    metaDescription:
      'Healthcare solutions built around patient flow — appointments, patient records and visit history, prescriptions, billing, and controlled access to sensitive data.',
  },
  {
    slug: 'fitness',
    name: 'Fitness',
    icon: 'Dumbbell',
    focus: 'Memberships, plans and renewals.',
    headline: 'Gym and studio software that protects renewals',
    intro:
      'A fitness business lives on renewals, and renewals are lost quietly — a membership expires, nobody notices for three weeks, and the member has already stopped coming.',
    challenges: [
      {
        title: 'Expiries discovered too late',
        description:
          'When membership end dates live in a register, the reminder goes out after the member has already drifted away.',
      },
      {
        title: 'Attendance nobody records',
        description:
          'Without check-in data there is no way to see who has stopped turning up — the earliest and clearest signal of a cancellation.',
      },
      {
        title: 'Plans that have quietly multiplied',
        description:
          'Offers, referral rates and personal-training add-ons accumulate until nobody can say with confidence what a given member is actually paying for.',
      },
      {
        title: 'Dues tracked from memory',
        description:
          'Instalments and part payments recorded informally turn into awkward conversations and money that is never collected.',
      },
    ],
    approach: [
      'We put membership state at the centre: who is active, on what plan, until when, and what they owe. Everything else — check-in, renewals, reminders, dues — is built around keeping that state true without extra work at the desk.',
      'Check-in is designed to take a second, because data that costs more than that will not be collected. From it, the system surfaces the two lists that matter: members expiring soon, and members who have stopped showing up.',
    ],
    capabilities: [
      'Member registration, profiles and documents',
      'Plans, packages, add-ons and pricing',
      'Check-in and attendance records',
      'Renewal, expiry and lapsed-member visibility',
      'Payments, instalments and dues tracking',
      'Trainer and batch allocation where required',
    ],
    services: [
      'gym-fitness-management',
      'custom-software-development',
      'mobile-app-development',
      'website-development',
      'business-automation',
    ],
    faqs: [
      {
        question: 'Can members be reminded automatically before expiry?',
        answer:
          'Yes. Reminder rules are set to your timing — a set number of days before expiry, on the day, and after — and sent through the channel your members actually read, subject to what the messaging provider you choose allows.',
      },
      {
        question: 'Do we need biometric or card check-in?',
        answer:
          'Only if you want it. Check-in can be a search by name or phone number at the desk; biometric or card readers are integrated when the hardware supports it and the volume justifies it.',
      },
      {
        question: 'Can it run more than one branch?',
        answer:
          'Yes — members, plans and attendance can be scoped per branch, with a combined view for the owner.',
      },
    ],
    seoTitle: 'Gym & Fitness Studio Software Solutions | NEXVERR',
    metaDescription:
      'Fitness solutions for gyms and studios — member profiles, plans and packages, check-in and attendance, renewal and expiry tracking, and dues reporting.',
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    icon: 'Truck',
    focus: 'Dispatch, tracking and delivery records.',
    headline: 'Logistics software for dispatch, delivery and proof',
    intro:
      'Logistics is a chain of small commitments, each of which has to be recorded somewhere. When the record lives in phone calls, every dispute becomes one person’s word against another’s.',
    challenges: [
      {
        title: 'Status by phone call',
        description:
          'Where a consignment is, and whether it was delivered, is established by ringing a driver — repeatedly, and usually while a customer waits on another line.',
      },
      {
        title: 'Proof of delivery on paper',
        description:
          'Signed slips that travel back with the vehicle get lost, delayed or damaged, and billing waits on them.',
      },
      {
        title: 'Trips planned without a full picture',
        description:
          'Vehicle availability, driver assignment and load are held in different heads, so capacity is wasted and the same vehicle is promised twice.',
      },
      {
        title: 'Costs that only surface later',
        description:
          'Fuel, tolls, maintenance and driver expenses recorded loosely make per-trip profitability an estimate rather than a fact.',
      },
    ],
    approach: [
      'We build the consignment and the trip as first-class records, so every status change has a place to live: booked, assigned, picked up, in transit, delivered. Updates are captured from a phone in a few taps, because that is what a driver can realistically do.',
      'Proof of delivery is captured digitally at the point of handover, which unblocks billing the same day. Trip costs are recorded against the trip, so profitability is a report rather than an argument.',
    ],
    capabilities: [
      'Consignment and trip records with status history',
      'Vehicle and driver assignment',
      'Mobile status updates from the field',
      'Digital proof of delivery capture',
      'Trip cost, fuel and expense records',
      'Delivery performance and cost reporting',
    ],
    services: [
      'custom-software-development',
      'mobile-app-development',
      'business-automation',
      'api-third-party-integrations',
      'admin-dashboards-analytics',
    ],
    faqs: [
      {
        question: 'Do drivers need a smartphone app?',
        answer:
          'Usually a light mobile interface is enough — status updates and proof of delivery. A full app is worth building when offline capture, navigation or scanning become part of the job.',
      },
      {
        question: 'Can customers track their own consignment?',
        answer:
          'Yes, where you want that. A tracking view can be exposed against a consignment number, showing only the status information you choose to share.',
      },
      {
        question: 'Can it work with the systems our clients already use?',
        answer:
          'Where those systems expose an API or accept structured files, bookings and status can be exchanged automatically instead of being re-keyed at both ends.',
      },
    ],
    seoTitle: 'Logistics & Delivery Management Software | NEXVERR',
    metaDescription:
      'Logistics solutions for dispatch and delivery — consignment and trip records, driver and vehicle assignment, live status, digital proof of delivery and costing.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: 'Building2',
    focus: 'Listings, enquiries and client follow-up.',
    headline: 'Real estate software for listings and follow-up',
    intro:
      'Property is a long sales cycle with a short memory. Most of what is lost is not lost to a competitor — it is lost to a follow-up that never happened.',
    challenges: [
      {
        title: 'Enquiries scattered across channels',
        description:
          'Calls, portal leads, messages and walk-ins arrive in four places, and only some of them are written down anywhere.',
      },
      {
        title: 'Follow-up that depends on one person',
        description:
          'When the next conversation lives in an agent’s head or phone, it leaves with them — along with the client relationship.',
      },
      {
        title: 'Listings out of date the moment they change',
        description:
          'Availability, price and status updated in one place but not another means showing a client something that is already sold.',
      },
      {
        title: 'No view of the pipeline',
        description:
          'Without stages, there is no way to tell a slow month from a stalled one until the quarter has already gone.',
      },
    ],
    approach: [
      'We keep two records straight: the property and the enquiry. Properties carry their own media, specification, price and availability; enquiries carry their source, the person, the properties shown and the next action with a date on it.',
      'From there the pipeline becomes visible — what stage each enquiry is at, what is overdue, and which sources are actually producing business. Agents get their own list; management gets the whole board.',
    ],
    capabilities: [
      'Property listings with media, specification and availability',
      'Enquiry capture with source tracking',
      'Site visits, follow-ups and reminders',
      'Agent assignment and ownership',
      'Pipeline stages and conversion reporting',
      'Public listing website or portal',
    ],
    services: [
      'crm',
      'website-development',
      'custom-software-development',
      'mobile-app-development',
      'admin-dashboards-analytics',
    ],
    faqs: [
      {
        question: 'Can enquiries from our website come straight in?',
        answer:
          'Yes, when the website is part of the scope or exposes its submissions. The enquiry lands as a record with its source attached rather than as another email to sort.',
      },
      {
        question: 'Can agents use it on a phone?',
        answer:
          'They have to — most of this work happens at a site, not a desk. Interfaces for enquiry and visit capture are designed mobile-first.',
      },
      {
        question: 'Is this a CRM or a listing site?',
        answer:
          'It can be either or both. Many businesses start with the public listing site and add the enquiry pipeline once the volume makes manual follow-up expensive.',
      },
    ],
    seoTitle: 'Software Solutions for Real Estate Businesses | NEXVERR',
    metaDescription:
      'Real estate solutions for listings and enquiries — property records with media, site-visit and follow-up tracking, agent assignment and pipeline reporting.',
  },
  {
    slug: 'finance',
    name: 'Finance',
    icon: 'Landmark',
    focus: 'Records, reporting and process automation.',
    headline: 'Software for finance and accounts operations',
    intro:
      'Finance teams lose most of their week to work that is necessary but not skilled: re-entering the same figures, chasing approvals, and assembling the same report from the same four sources.',
    challenges: [
      {
        title: 'The same data entered twice',
        description:
          'Figures copied between a billing tool, a spreadsheet and an accounting package introduce differences that someone then has to find.',
      },
      {
        title: 'Approvals by message',
        description:
          'When a sanction is a chat reply, there is no record of who approved what, when, or against which limit.',
      },
      {
        title: 'Reconciliation as a monthly event',
        description:
          'Left to month end, differences are old, cold and expensive to trace back to the transaction that caused them.',
      },
      {
        title: 'Reports rebuilt by hand',
        description:
          'A recurring report assembled manually every cycle is a recurring cost, and it is wrong the moment a source changes.',
      },
    ],
    approach: [
      'We start with the documents and the movements: what is raised, what is approved, what is received and what is recorded. Then we remove the re-entry between them, either by holding the record in one place or by integrating the systems that already hold it.',
      'Approvals get structure — limits, sequence and an audit trail — and recurring reports are generated on a schedule from live data instead of being rebuilt each cycle. We stay inside operations and reporting; we do not advise on accounting treatment.',
    ],
    capabilities: [
      'Structured records for transactions and documents',
      'Approval workflows with limits and audit trail',
      'Integration with existing accounting tools',
      'Reconciliation support and exception lists',
      'Scheduled and on-demand reporting',
      'Role-based access to financial data',
    ],
    services: [
      'business-automation',
      'custom-software-development',
      'api-third-party-integrations',
      'admin-dashboards-analytics',
      'erp-systems',
    ],
    faqs: [
      {
        question: 'Does this replace our accounting software?',
        answer:
          'No. Accounting packages do their job well. We build the operational layer around them and remove the manual handover between your systems and theirs.',
      },
      {
        question: 'Can it integrate with the accounting tool we use?',
        answer:
          'Where that tool exposes an API or supports structured import and export, yes. Where it does not, we reduce the handover to a single reviewed step instead of manual re-entry.',
      },
      {
        question: 'Who can see financial data?',
        answer:
          'Only the roles you specify. Access is defined per role, and actions on sensitive records are logged so any change can be traced.',
      },
    ],
    seoTitle: 'Software Solutions for Finance & Accounts Teams | NEXVERR',
    metaDescription:
      'Finance and accounts solutions — structured records, approvals with audit trails, reconciliation support, scheduled reporting and automation of repetitive entry.',
  },
];

export const industryMap = Object.fromEntries(
  industries.map((industry) => [industry.slug, industry]),
) as Record<string, Industry>;

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industryMap[slug];
}

/** Industries that list this service — powers the "Where it is used" block. */
export function getIndustriesForService(serviceSlug: string): Industry[] {
  return industries.filter((industry) => industry.services.includes(serviceSlug));
}
