import type { Faq } from './faq';

export interface ServiceUseCase {
  title: string;
  description: string;
}

/**
 * Long-form content for a service page. Every field is optional: a service page
 * renders the sections it has and skips the rest, so nothing is ever padded out
 * to fill a template.
 */
export interface ServiceContent {
  /** What this page exists to answer, in one sentence. Sits under the H1. */
  intro?: string;
  /** The situation a customer is in before they call. */
  problem?: string[];
  /** What we do about it. */
  solution?: string[];
  /** What the business gets. Capability, never a promised number. */
  benefits?: string[];
  /** Who this is for. */
  whoFor?: string[];
  useCases?: ServiceUseCase[];
  faqs?: Faq[];
}

/**
 * Keyed by service slug. Services not listed here fall back to the catalog
 * description and scope list, which is still a complete page.
 */
export const serviceContent: Record<string, ServiceContent> = {
  'website-development': {
    intro:
      'A business website has one job: make a stranger confident enough to make contact. Everything else on the page is either helping with that or getting in the way.',
    problem: [
      'Most business websites fail quietly. They load slowly on a phone, bury the one thing a visitor came for, and read like they were written for a brochure rather than a person deciding whether to call.',
      'The cost is invisible, which is what makes it expensive. Nobody reports a site that did not convince them — they just go back to the search results and pick the next business.',
    ],
    solution: [
      'We start with what the site has to achieve: explain the offer, earn enough trust, and make contact effortless. That decides the page structure before anything is designed.',
      'The build is mobile-first, because that is where most visitors arrive from. Pages are structured so headings describe what is under them, images are sized and compressed for real connections, and the path to contact is never more than a scroll away.',
      'Content, structure and page-level SEO are part of the build rather than something bolted on afterwards — titles, descriptions, headings and internal links are set up so the site can actually be found.',
    ],
    benefits: [
      'A site that loads fast on ordinary mobile connections',
      'Clear structure a first-time visitor can follow',
      'Contact paths that work on a phone in one tap',
      'Page-level SEO and metadata set up from the start',
      'Content you can update without a developer for routine changes',
      'A foundation that extends to a portal or platform later',
    ],
    whoFor: [
      'Businesses in Erode and across Tamil Nadu that customers search for before they call',
      'Companies whose current site is slow, dated or invisible on mobile',
      'Businesses that rely on a directory listing or a social page as their only presence',
      'Firms that need a proper site before they invest in advertising',
    ],
    useCases: [
      {
        title: 'Corporate and business websites',
        description:
          'A credible presence that explains what the business does, who it serves and how to reach it.',
      },
      {
        title: 'Landing pages for campaigns',
        description:
          'A single focused page built around one action, so ad spend is not diluted by a general site.',
      },
      {
        title: 'Customer and partner portals',
        description:
          'A logged-in area where customers or partners can see what concerns them, built when the volume justifies it.',
      },
    ],
    faqs: [
      {
        question: 'How long does a business website take?',
        answer:
          'It depends on how much content exists and how many pages are in scope. A focused business site is a matter of weeks rather than months; the schedule is agreed after the structure is confirmed, not guessed at before it.',
      },
      {
        question: 'Can we update the content ourselves?',
        answer:
          'Routine content updates are handled the way you prefer — either through an editable setup or by sending changes to us under a support arrangement. We agree which parts you will want to change often before the build starts.',
      },
      {
        question: 'Do you handle domain, hosting and SSL?',
        answer:
          'Yes. Domain, DNS, hosting and certificates can all be set up as part of the project, in accounts that belong to you rather than to us.',
      },
      {
        question: 'Will the site be found on Google?',
        answer:
          'The site is built so it can be: correct titles and descriptions, a clean URL structure, a sitemap, fast loading and readable content. Ranking then depends on competition and how the business keeps the site current — no agency can honestly promise a position.',
      },
    ],
  },

  'custom-software-development': {
    intro:
      'Custom software is the right answer when the way you work is the thing that makes you competitive — and no product on the market will bend far enough to fit it.',
    problem: [
      'Ready-made software asks the business to change first. Teams end up keeping a spreadsheet beside the system for the part it does not handle, and within a year the spreadsheet is the real system.',
      'The workarounds are where the cost hides: the same data entered twice, reports rebuilt by hand, and one person who is the only one who knows how it all fits together.',
    ],
    solution: [
      'We map the workflow as it actually runs today — who does what, in what order, and where it stalls — before proposing anything. That map is what the system gets built against.',
      'Then we agree the scope explicitly: what the software must do, what it will not do, and what comes in a later phase. Building in phases keeps the first release small enough to be used and judged rather than waited for.',
      'After launch the work continues — fixes, changes and the features the business asks for once it has lived with the system for a quarter.',
    ],
    benefits: [
      'A system that matches your process instead of replacing it',
      'One source of truth rather than a system plus side spreadsheets',
      'Roles and permissions that match who should see what',
      'Reports built on the questions you actually ask',
      'Room to extend as the business changes',
      'Ownership of the system and its data',
    ],
    whoFor: [
      'Businesses whose process does not fit any off-the-shelf product',
      'Teams running critical operations on spreadsheets that have outgrown them',
      'Companies paying for several tools that still do not talk to each other',
      'Businesses that need a system built around a workflow they own',
    ],
    useCases: [
      {
        title: 'Replacing a spreadsheet that became critical',
        description:
          'The file everyone depends on, rebuilt as a system with proper records, access control and history.',
      },
      {
        title: 'Operations software for a specific process',
        description:
          'A system built around the workflow your business actually runs, rather than a generic module set.',
      },
      {
        title: 'A layer over existing tools',
        description:
          'Where the tools are fine but the gaps between them are not, we build the piece that connects them.',
      },
    ],
    faqs: [
      {
        question: 'Is custom software more expensive than a ready-made product?',
        answer:
          'Up front, usually yes. Over time it depends on what the alternative costs in per-user fees, workarounds and manual work. We are straightforward about this: if a product fits your process, we will tell you to buy it.',
      },
      {
        question: 'What technology will it be built on?',
        answer:
          'That is chosen per project, against what the system has to do, where it will be hosted and who will maintain it — not from a fixed house stack. We explain the choice and the reasoning before the build starts.',
      },
      {
        question: 'Who owns the software?',
        answer:
          'You do. The system and its data belong to your business, and that is agreed in writing at the start of the engagement.',
      },
      {
        question: 'What happens after it goes live?',
        answer:
          'Software is never finished at launch. Fixes, updates and changes continue under a maintenance arrangement, because the first real feedback arrives only once people are using it daily.',
      },
    ],
  },

  'erp-systems': {
    intro:
      'ERP is not a product you install — it is the decision to stop running the business from five disconnected places. What matters is scoping it to what you actually run.',
    problem: [
      'Every department keeps its own version of the truth: stock in one place, purchases in another, accounts in a third, and management asking all three for the same number.',
      'Big-bang ERP rollouts fail for the opposite reason — they arrive with modules nobody asked for, force a process change on everyone at once, and get abandoned within a year.',
    ],
    solution: [
      'We scope an ERP to the modules the business runs today: usually inventory and purchase, sales and billing, accounts, and the approvals that connect them. Anything you do not need is not built.',
      'Data is entered once and visible everywhere it matters, which is the entire point of an ERP and the part most implementations get wrong. Dashboards sit on top of the same records, so management sees the live position rather than a compiled report.',
      'Modules are rolled out in a sequence the team can absorb, with the next phase added once the last one is genuinely in use.',
    ],
    benefits: [
      'One record set shared across operations, purchase, sales and accounts',
      'Stock, purchase and sales cycles connected end to end',
      'Approvals and roles that reflect your reporting lines',
      'Management dashboards from live data, not compiled files',
      'Modules added in phases instead of all at once',
      'A system that matches your industry rather than a generic template',
    ],
    whoFor: [
      'Small and mid-sized businesses in Erode and Tamil Nadu outgrowing separate tools',
      'Manufacturers, distributors and retailers with stock and purchase cycles to connect',
      'Businesses where management cannot get a reliable current position',
      'Companies whose earlier ERP attempt was abandoned for being too heavy',
    ],
    useCases: [
      {
        title: 'Inventory and purchase to sales',
        description:
          'Stock, purchase orders, suppliers, sales and billing in one connected cycle.',
      },
      {
        title: 'Production-linked ERP',
        description:
          'Job orders, material consumption and output tied into the same inventory and costing records.',
      },
      {
        title: 'Multi-location operations',
        description:
          'Branches or outlets running their own operations with a consolidated view for management.',
      },
    ],
    faqs: [
      {
        question: 'Do we have to implement every module at once?',
        answer:
          'No — and you should not. We start with the modules that carry your daily operations, get them genuinely in use, then add the next ones. Phased rollouts are the main reason an ERP survives its first year.',
      },
      {
        question: 'Can it work with our existing accounting software?',
        answer:
          'Yes. Where your accounting package supports import or an API, the ERP hands data across instead of duplicating entry. Replacing accounting is a separate decision, and often not the right one.',
      },
      {
        question: 'How is our existing data brought in?',
        answer:
          'Item masters, suppliers, customers and opening stock are imported from your current files as part of setup, then verified against a physical count or statement before the system goes live.',
      },
    ],
  },

  'billing-inventory-systems': {
    intro:
      'Billing and stock are the same problem seen from two sides. Get them into one system and most of the daily reconciliation disappears.',
    problem: [
      'A bill written in one place and stock recorded in another guarantees the two will disagree. The gap is found weeks later, usually when a customer is waiting for something the system says is in stock.',
      'Manual billing also costs time exactly where a business can least afford it — at the counter, with a queue.',
    ],
    solution: [
      'We build billing around your items, your units, your tax treatment and your discount rules, so the bill is correct without anyone doing mental arithmetic.',
      'Every bill, purchase, return and adjustment moves the same stock record. That single decision removes an entire category of daily reconciliation work.',
      'Reports come off the same data: what sold, what is due, what tax is payable, and what needs reordering — available as a page, not as a request.',
    ],
    benefits: [
      'Correct invoices with your tax and discount rules applied',
      'Stock that reflects sales, purchases and returns as they happen',
      'Supplier and purchase records in the same system',
      'Low-stock and reorder visibility before something runs out',
      'Sales, tax and stock reports available on demand',
      'Faster counter operation for staff and customers',
    ],
    whoFor: [
      'Shops, showrooms and distributors billing every day',
      'Businesses whose stock register and sales records never quite agree',
      'Traders managing supplier purchases and returns manually',
      'Businesses that need GST-compliant invoices produced quickly',
    ],
    useCases: [
      {
        title: 'Counter billing with live stock',
        description: 'Invoice at the counter and have the stock position update in the same action.',
      },
      {
        title: 'Purchase and supplier management',
        description:
          'Purchase entries, supplier records and returns kept against the same items you sell.',
      },
      {
        title: 'Multi-branch stock',
        description:
          'Stock held and moved across locations, with transfers recorded rather than assumed.',
      },
    ],
    faqs: [
      {
        question: 'Does it produce GST-compliant invoices?',
        answer:
          'Invoice format, tax fields and rates are configured to the requirements that apply to your business, and the output is reviewed with you before go-live. We build to your accountant’s requirements rather than guessing at them.',
      },
      {
        question: 'Can it work with a barcode scanner and our printer?',
        answer:
          'Yes, where the hardware supports standard input and printing. Most existing counter setups work without replacement.',
      },
      {
        question: 'Can more than one counter bill at the same time?',
        answer:
          'Yes. Multiple counters or users can bill simultaneously against the same stock, with each bill attributed to the user who raised it.',
      },
    ],
  },

  'restaurant-pos': {
    intro:
      'Restaurant POS software is judged on one thing: whether it slows service down. Everything else — reports, menu tools, dashboards — matters only if it does not.',
    problem: [
      'Orders are taken on paper, relayed by voice and amended mid-service. Something gets missed on the busiest night, and it is always the table that complains loudest.',
      'Meanwhile dine-in, takeaway and delivery are tracked separately, so the day has three versions and none of them reconcile at closing.',
    ],
    solution: [
      'We build the order path to be fast under pressure: a menu laid out the way your staff think about it, modifiers where they are actually needed, and a bill that can be split, merged or edited without hunting through screens.',
      'Orders reach the kitchen as tickets with status, so the floor can see what is fired and what is ready without walking to the pass. Every channel closes into the same day.',
      'At the end of service, sales, item performance and payment modes come off the same records — one report rather than three reconciliations.',
    ],
    benefits: [
      'Order to kitchen to bill without a written ticket in between',
      'Dine-in, takeaway and delivery closing into one day',
      'Menu, modifiers, pricing and taxes configured per outlet',
      'Split, merge and part-payment billing at the table',
      'Item-wise sales visibility for menu decisions',
      'Consolidated view where you run more than one outlet',
    ],
    whoFor: [
      'Restaurants, cafés and cloud kitchens handling volume at peak hours',
      'Outlets running dine-in alongside takeaway and delivery',
      'Owners with more than one branch who need one consolidated view',
      'Restaurants whose billing and kitchen flow are still on paper',
    ],
    useCases: [
      {
        title: 'Dine-in service',
        description:
          'Table-wise orders, running bills, splits and merges handled at the table rather than at a terminal.',
      },
      {
        title: 'Takeaway and delivery',
        description:
          'Counter and delivery orders in the same flow, with status visible to whoever is handing them over.',
      },
      {
        title: 'Kitchen display and tickets',
        description:
          'Orders reaching the kitchen as structured tickets with status, instead of shouted amendments.',
      },
    ],
    faqs: [
      {
        question: 'What happens if the internet goes down mid-service?',
        answer:
          'We agree this requirement before designing. Where service cannot depend on connectivity, the system is built to keep billing locally and sync once the connection is back.',
      },
      {
        question: 'Can waiters take orders on a phone or tablet?',
        answer:
          'Yes, where that suits your floor. Order-taking on a handheld is worth it when the walk between table and terminal is what is actually costing time.',
      },
      {
        question: 'Can we run different menus or prices per outlet?',
        answer:
          'Yes. Menu, pricing and taxes can be set per outlet while reporting rolls up across all of them.',
      },
    ],
  },

  'mobile-app-development': {
    intro:
      'An app earns its place when the phone is genuinely the right tool for the job — not because every business is told it needs one.',
    problem: [
      'Plenty of apps get built that should have been a mobile-friendly web page. They cost more, need store approval for every change, and then sit unopened on a home screen.',
      'The opposite mistake is just as common: field staff entering work into a desktop system hours after the fact, from notes on paper, because nothing works where the job actually happens.',
    ],
    solution: [
      'We start by testing whether an app is the right answer at all. If a responsive web interface does the job, we say so — and build that instead.',
      'Where an app is right, it is built for the conditions it will be used in: one hand, a patchy connection, a screen in sunlight. Offline capture, notifications and device features are scoped to what the work needs.',
      'We handle the full path to release — builds, store submission and the updates that follow.',
    ],
    benefits: [
      'Android and iOS from one agreed scope',
      'Interfaces designed for real field conditions',
      'Offline capture where connectivity cannot be assumed',
      'Push notifications where they serve the user, not the business',
      'Connected to the systems you already run',
      'Store release and update handling',
    ],
    whoFor: [
      'Businesses in Erode and Tamil Nadu with field or delivery teams',
      'Companies with a system that needs a mobile companion',
      'Product teams taking an idea to a first release',
      'Businesses whose customers would genuinely use an app regularly',
    ],
    useCases: [
      {
        title: 'Field and delivery team apps',
        description:
          'Status, capture and proof recorded where the work happens rather than re-entered later.',
      },
      {
        title: 'Customer-facing apps',
        description:
          'Booking, ordering or account access for customers who use the service often enough to install it.',
      },
      {
        title: 'Mobile companion to an existing system',
        description:
          'The few screens that need to be on a phone, connected to the system you already run.',
      },
    ],
    faqs: [
      {
        question: 'Do we need an app or a mobile website?',
        answer:
          'A mobile website is right more often than the industry admits. An app is worth it when you need offline use, device features such as the camera or GPS, notifications, or frequent repeat use.',
      },
      {
        question: 'Android and iOS — both?',
        answer:
          'Usually both, from one codebase where that suits the app. Where the audience is overwhelmingly on one platform, starting there and adding the second later is often the better spend.',
      },
      {
        question: 'Who publishes the app?',
        answer:
          'It is published under your business’s developer accounts, so the listing, the reviews and the ownership stay with you. We handle the submission process.',
      },
    ],
  },

  'business-automation': {
    intro:
      'Automation is not about replacing people. It is about removing the parts of their week that a machine should have been doing all along.',
    problem: [
      'Somebody exports a file, reformats it and pastes it somewhere else. Somebody checks a folder for new documents. Somebody sends the same reminder every Monday. None of it is skilled work, and all of it takes hours.',
      'Worse, manual handovers are where errors enter — and the error is usually found far downstream, long after it was cheap to fix.',
    ],
    solution: [
      'We map the sequence first: every step, who does it, what triggers it, and what it produces. That map usually reveals steps that exist only because of an old constraint.',
      'Then we automate the parts that genuinely can run unattended — data moving between systems, scheduled jobs, notifications, document and report generation — and leave people the judgement calls.',
      'Failure handling is part of the design, not an afterthought. An automation that fails silently is worse than the manual step it replaced.',
    ],
    benefits: [
      'Hours returned from repetitive copying and re-entry',
      'Fewer errors introduced at manual handovers',
      'Data flowing between systems without a person in between',
      'Scheduled jobs and triggers that run without reminders',
      'Documents and reports generated automatically',
      'Alerts when something needs a human decision',
    ],
    whoFor: [
      'Businesses in Erode and Tamil Nadu where staff re-key the same data into two systems',
      'Teams producing the same recurring report by hand',
      'Operations that depend on someone remembering to chase a status',
      'Businesses growing faster than they can add administrative staff',
    ],
    useCases: [
      {
        title: 'Data flow between systems',
        description:
          'Records moving from one tool to another automatically, instead of through an export and a paste.',
      },
      {
        title: 'Scheduled reporting',
        description:
          'Recurring reports generated and delivered on their own schedule from live data.',
      },
      {
        title: 'Notifications and reminders',
        description:
          'Alerts fired by the system when something is due, overdue or outside its expected range.',
      },
    ],
    faqs: [
      {
        question: 'Where should a business start with automation?',
        answer:
          'With the task your team complains about most and does most often. That one usually pays for the work on its own, and it tells you whether the next one is worth doing.',
      },
      {
        question: 'Will automation replace our staff?',
        answer:
          'In our experience it moves them onto work that actually needs a person. The steps worth automating are the ones nobody wanted to be doing in the first place.',
      },
      {
        question: 'What if an automated step fails?',
        answer:
          'It is designed to fail loudly — the job stops, someone is notified, and the record of what happened is kept. Silent failure is the one outcome an automation must never have.',
      },
    ],
  },

  'ecommerce-development': {
    intro:
      'An online store is an operations project wearing a design project’s clothes. The storefront is the easy half.',
    problem: [
      'Stores built on a generic template hit the same wall: the catalog does not fit, pricing rules have to be faked, and every order needs a manual step somewhere to actually get out of the door.',
      'That manual step is fine at five orders a day and impossible at fifty.',
    ],
    solution: [
      'We model the catalog and its rules first — variants, pricing, tax, delivery charges — because every downstream problem starts there.',
      'The storefront is then built to make buying short and honest: clear listings, a total with no surprises, and a checkout that works on a mid-range phone.',
      'Fulfilment gets equal attention: orders, packing, dispatch and returns in one admin view, with payment, shipping and messaging integrated so customers get status without anyone typing it.',
    ],
    benefits: [
      'A catalog that matches how you actually price and sell',
      'Checkout built for mobile completion rates',
      'Payment and delivery integrations in place',
      'One place to run orders, dispatch and returns',
      'Stock that can stay in step with your counter',
      'Reporting on what sells, what is returned and what is stuck',
    ],
    whoFor: [
      'Retailers and distributors selling online alongside a shop',
      'Brands whose pricing or catalog does not fit a template store',
      'Businesses selling B2B with account-specific pricing',
      'Sellers whose order volume has outgrown manual processing',
    ],
    useCases: [
      {
        title: 'Direct-to-customer store',
        description: 'A branded store with your catalog, pricing rules, payments and delivery.',
      },
      {
        title: 'B2B ordering portal',
        description:
          'Account-based ordering with agreed rates, credit terms and repeat-order support.',
      },
      {
        title: 'Store connected to shop stock',
        description: 'One stock position behind both the counter and the website.',
      },
    ],
    faqs: [
      {
        question: 'Can you build on an existing platform instead?',
        answer:
          'Yes, where it fits. If a standard platform handles your catalog and fulfilment, using it is cheaper and faster — we will tell you when that is the case rather than building for the sake of it.',
      },
      {
        question: 'Can we sell on marketplaces as well?',
        answer:
          'Where the marketplace exposes an API for your seller account, orders and stock can be synchronised so you are not managing two inventories.',
      },
      {
        question: 'How are payments handled?',
        answer:
          'Through a payment gateway in your business’s own account. Money moves between your customer and your account — it never passes through us.',
      },
    ],
  },

  'manufacturing-software': {
    intro:
      'Manufacturing software has to survive the floor. If capturing a status takes longer than the task itself, it will not be captured.',
    problem: [
      'Job status lives in a supervisor’s head, material issue in a register, and output in a diary. Every question about a delivery date becomes a walk around the plant.',
      'Costing suffers most: material consumption estimated after the fact turns every job’s margin into an approximation.',
    ],
    solution: [
      'We map the route a job takes — stages, handoffs, who records what — and put capture exactly at the points where work already pauses.',
      'Material issue and consumption are recorded against the job, so costing follows the work rather than the month. Rejections are logged with reasons, which is the only way the same defect stops repeating.',
      'Supervisors get the floor view; management gets output, work-in-progress and efficiency without asking anyone to compile it.',
    ],
    benefits: [
      'Job status visible without walking the floor',
      'Material consumption recorded against the job',
      'Work-in-progress that exists as data, not memory',
      'Quality and rejection logging with reasons',
      'Output and efficiency reporting per machine, batch or operator',
      'Costing based on what was actually consumed',
    ],
    whoFor: [
      'Manufacturing units in Erode, Tiruppur and across Tamil Nadu',
      'Job-work and made-to-order production floors',
      'Units where delivery dates are currently estimated rather than known',
      'Manufacturers whose ERP does not cover what happens on the floor',
    ],
    useCases: [
      {
        title: 'Job order tracking',
        description: 'Each job tracked through its stages, with status captured as work completes.',
      },
      {
        title: 'Material issue and consumption',
        description: 'Raw material issued, consumed and returned against the job that used it.',
      },
      {
        title: 'Quality and rejection logging',
        description:
          'Rejections recorded with cause at the stage they occur, so patterns become visible.',
      },
    ],
    faqs: [
      {
        question: 'Will operators actually use it?',
        answer:
          'Only if entry takes seconds, which is why capture is designed around the pauses that already exist in the work — a stage completion, a material issue, a check. That constraint drives the whole interface.',
      },
      {
        question: 'Can it sit on top of an ERP we already have?',
        answer:
          'Yes. Where the ERP holds inventory and accounts but not the floor, we build the production layer and integrate it rather than replacing what works.',
      },
      {
        question: 'Do we need machines to be connected?',
        answer:
          'No. Manual capture at defined points covers most units. Machine integration is worth considering only where the data volume and value justify it.',
      },
    ],
  },

  crm: {
    whoFor: [
      'Sales teams whose follow-ups live in personal phones and notebooks',
      'Businesses receiving enquiries from several channels at once',
      'Owners who cannot see which enquiries are stalled',
    ],
    faqs: [
      {
        question: 'How is this different from a spreadsheet of leads?',
        answer:
          'A spreadsheet records what happened. A CRM makes what happens next somebody’s responsibility, with a date attached — which is where most enquiries are actually lost.',
      },
      {
        question: 'Can enquiries from our website and WhatsApp come in automatically?',
        answer:
          'Website submissions can, and messaging channels can where the provider exposes an API for your account. Anything that cannot be automated is reduced to a few seconds of entry.',
      },
    ],
  },

  'school-college-management': {
    whoFor: [
      'Schools and colleges running admissions, attendance and fees on separate systems',
      'Institutions where the office absorbs every routine parent question',
      'Managements that cannot see dues and attendance without asking for a report',
    ],
    faqs: [
      {
        question: 'Can it match our fee structure and grading system?',
        answer:
          'Yes — fee heads, instalments, concessions and grading rules are configured to your institution. This is usually the exact point where a ready-made product stops fitting.',
      },
      {
        question: 'Can parents see attendance and dues?',
        answer:
          'Where you want them to. Parent access is scoped to their own child’s records, which takes a large share of routine calls off the office.',
      },
    ],
  },

  'healthcare-clinic-solutions': {
    whoFor: [
      'Clinics and small hospitals managing appointments by phone and register',
      'Practices where patient history is spread across visits',
      'Clinics that need billing and records in one place with controlled access',
    ],
    faqs: [
      {
        question: 'Can patients book appointments online?',
        answer:
          'Yes, where the practice wants it — built to respect the same slot rules the front desk uses, so the on-screen queue matches the waiting room.',
      },
      {
        question: 'How is access to patient records controlled?',
        answer:
          'By role, with record changes traceable. Who can see and change what is agreed with the practice before the system goes live.',
      },
    ],
  },

  'gym-fitness-management': {
    whoFor: [
      'Gyms and studios tracking memberships in a register',
      'Owners who find out about an expiry after the member has gone',
      'Studios running multiple plans, batches and trainers',
    ],
    faqs: [
      {
        question: 'Can renewal reminders go out automatically?',
        answer:
          'Yes, on your timing — before expiry, on the day, and after — through the messaging channel you choose, subject to that provider’s rules.',
      },
      {
        question: 'Can it track personal training and add-ons separately?',
        answer:
          'Yes. Add-ons, packages and trainer allocation are held against the member alongside the base plan.',
      },
    ],
  },

  'admin-dashboards-analytics': {
    whoFor: [
      'Owners who wait for someone to compile numbers before deciding',
      'Teams with data spread across several systems',
      'Managers who need their own view rather than a company-wide report',
    ],
    faqs: [
      {
        question: 'Can a dashboard pull from more than one system?',
        answer:
          'Yes, where each system exposes its data through an API, a database connection or a scheduled export. Bringing the sources together is usually most of the work.',
      },
      {
        question: 'How do we decide what goes on it?',
        answer:
          'By starting from decisions, not metrics. We ask what you do differently depending on the number — anything that fails that test does not earn a place on the screen.',
      },
    ],
  },

  'api-third-party-integrations': {
    whoFor: [
      'Businesses running several tools that do not talk to each other',
      'Teams re-entering the same data into two systems',
      'Products that need payment, messaging or logistics services connected',
    ],
    faqs: [
      {
        question: 'What if a service we use has no API?',
        answer:
          'Then we look at what it does support — scheduled exports, file drops, or a database connection. Where none of that exists, we reduce the manual handover to a single reviewed step instead of pretending it can be automated.',
      },
      {
        question: 'What happens when an integration fails?',
        answer:
          'Retries, error handling and alerting are part of the build. An integration that fails quietly causes more damage than no integration at all.',
      },
    ],
  },

  'ai-ml-solutions': {
    whoFor: [
      'Businesses with a defined, repetitive decision and the data to support it',
      'Teams processing large volumes of documents or text by hand',
      'Companies wanting to know whether an AI use case is feasible before investing',
    ],
    faqs: [
      {
        question: 'Do we have enough data for this?',
        answer:
          'That is the first question we answer, before any model work. If the data cannot support the use case, we will say so — it is cheaper to hear that at the start.',
      },
      {
        question: 'Can AI be added to a system we already run?',
        answer:
          'Often, yes — as a specific capability inside an existing workflow rather than a separate product. That is usually where it pays for itself fastest.',
      },
    ],
  },

  'cloud-deployment-hosting': {
    whoFor: [
      'Businesses whose system is running without backups or monitoring',
      'Teams that need separate testing and live environments',
      'Companies moving off a single server nobody wants to touch',
    ],
    faqs: [
      {
        question: 'Whose cloud account should the system run in?',
        answer:
          'Yours, wherever possible. You keep ownership, billing visibility and access; we set it up and maintain it. A system you cannot reach without your vendor is a risk, not a service.',
      },
      {
        question: 'Are backups included?',
        answer:
          'Backups, restore testing and monitoring are part of the deployment scope. A backup nobody has restored from is not a backup.',
      },
    ],
  },

  'maintenance-technical-support': {
    whoFor: [
      'Businesses running software built by someone who is no longer available',
      'Teams that need fixes and updates without hiring in-house',
      'Companies whose system needs to keep changing as the business does',
    ],
    faqs: [
      {
        question: 'Can you maintain software your team did not build?',
        answer:
          'Often, yes. It starts with a review of the code, the hosting and the data, after which we are straightforward about what can be supported and what would be better rebuilt.',
      },
      {
        question: 'What does support actually cover?',
        answer:
          'Agreed in writing at the start: fixes, security and dependency updates, monitoring, and an agreed allowance for changes. No vague retainers.',
      },
    ],
  },

  'ui-ux-design': {
    whoFor: [
      'Products where users abandon a task partway through',
      'Teams building something new that needs structure before visual design',
      'Businesses whose internal tools are slowing their own staff down',
    ],
    faqs: [
      {
        question: 'Is design worth it for an internal tool?',
        answer:
          'Usually more than for a public site. Staff use internal tools every day, so every extra click is paid for repeatedly — and unlike customers, they cannot leave.',
      },
      {
        question: 'Do you design before building, or together?',
        answer:
          'Structure and flow come first, then the visual layer, then build. Doing it in that order is what stops a beautiful interface from being unusable once real data arrives.',
      },
    ],
  },

  'saas-product-development': {
    whoFor: [
      'Founders taking a product idea to a first release',
      'Businesses turning an internal system into a sellable product',
      'Teams that need multi-tenancy and subscriptions done properly',
    ],
    faqs: [
      {
        question: 'What should a first release include?',
        answer:
          'The smallest set of features that solves the problem end to end for one kind of customer. Everything else waits for evidence rather than opinion.',
      },
      {
        question: 'Can an internal system become a SaaS product?',
        answer:
          'Sometimes. It needs multi-tenancy, subscription handling, onboarding and support tooling on top of the core — and an honest look at whether other businesses share the problem closely enough.',
      },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent {
  return serviceContent[slug] ?? {};
}
