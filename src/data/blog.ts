import type { Faq } from './faq';

export interface BlogSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Card and meta-description-length summary. */
  excerpt: string;
  category: string;
  /** ISO date, used for the article schema and the sitemap. */
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  /** Opening paragraphs, before the first heading. */
  intro: string[];
  sections: BlogSection[];
  /** The short version, for readers who scroll to the end first. */
  takeaways?: string[];
  faqs?: Faq[];
  /** Service slugs this article should link to. Genuine relevance only. */
  relatedServices: string[];
  /** Industry slugs from `industries.ts`. */
  relatedSolutions?: string[];
  seoTitle: string;
  metaDescription: string;
  ogImage?: string;
}

/**
 * Articles are written to answer a question a customer actually asks before
 * buying. They are not published to fill a content calendar — this list grows
 * slowly and deliberately.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'custom-software-vs-ready-made-software',
    title: 'Custom Software vs Ready-Made Software: How to Decide',
    excerpt:
      'Neither option is better in general. What matters is whether your process is the thing that makes you competitive — and how much the workarounds are already costing.',
    category: 'Buying software',
    publishedAt: '2026-09-16',
    readingMinutes: 7,
    intro: [
      'Almost every business we talk to has already tried a ready-made product. Sometimes it worked. More often it sits alongside two spreadsheets and a WhatsApp group that quietly do the parts it could not handle.',
      'The decision between buying and building is not a question of budget or ambition. It is a question about one thing: whether the way you work is a detail or the whole point.',
    ],
    sections: [
      {
        heading: 'Start with the workflow, not the feature list',
        paragraphs: [
          'Feature comparisons are the wrong tool for this decision. Every product has a long feature list, and almost all of the features overlap. What separates them is how they assume you work.',
          'Write down the sequence your business actually follows for its core operation — an order, a job, a patient, a student. Include the approvals, the exceptions and the steps that only exist because of a customer who has been with you for fifteen years. That sequence is what you are really buying software for.',
        ],
      },
      {
        heading: 'When ready-made is the right answer',
        paragraphs: [
          'If your process is close to how everybody else in your category works, buy. You will pay less, start sooner, and get updates you did not have to ask for.',
        ],
        bullets: [
          'Your process is standard and you are willing to keep it that way',
          'The work is a support function — accounting, payroll, email — rather than the thing customers pay you for',
          'You need to be running this month, not next quarter',
          'The product’s data can be exported if you ever leave',
        ],
      },
      {
        heading: 'When building is the right answer',
        paragraphs: [
          'Custom software makes sense when the process is the competitive advantage, or when the gap between the product and your reality has grown expensive enough to measure.',
        ],
        bullets: [
          'Staff maintain a spreadsheet beside the software to handle what it cannot',
          'The same data is entered into two systems because neither covers the whole job',
          'You pay per user for a product where most users touch two screens',
          'A rule that matters to your customers cannot be expressed in the product at all',
          'Your best process — the reason customers stay — has to be abandoned to fit the tool',
        ],
      },
      {
        heading: 'Count the cost honestly, on both sides',
        paragraphs: [
          'Custom software costs more up front. That much is not in dispute. The comparison people skip is what the alternative costs over the same period.',
          'Add up the subscription across the number of users you will have in three years. Add the hours spent on the manual steps the product forced on you, at what those hours are worth. Add the cost of decisions made late because the report was not available. Then compare that total against building — including the maintenance that any real system needs after launch.',
          'Sometimes the answer is still to buy. We have told businesses exactly that. But the comparison should be complete before it is made.',
        ],
      },
      {
        heading: 'The middle path most businesses miss',
        paragraphs: [
          'It is rarely all or nothing. Keep the accounting package that works. Keep the payroll tool. Build only the operational layer that no product fits, and integrate the two so data is not entered twice.',
          'This is where most of our work sits, and it is usually the cheapest version of the right answer: a small, well-scoped system around the part of the business that makes it distinctive, connected to the products already doing their job.',
        ],
      },
      {
        heading: 'Questions to ask before you commit either way',
        bullets: [
          'If we buy: what will we have to stop doing, and what will that cost us?',
          'If we buy: can we get our data out, in a usable form, without their help?',
          'If we build: what is the smallest first version that is genuinely usable?',
          'If we build: who maintains it in year two, and what does that cost?',
          'Either way: who owns the data, and where does it live?',
        ],
      },
    ],
    takeaways: [
      'Compare workflows, not feature lists.',
      'Buy when the process is standard; build when the process is the advantage.',
      'Count the workarounds — they are the real cost of a product that nearly fits.',
      'A small custom layer around existing tools often beats replacing everything.',
    ],
    faqs: [
      {
        question: 'Is custom software always more expensive?',
        answer:
          'Up front, usually. Over three to five years it depends on user licence counts, the cost of the manual steps a product forces on you, and how much the business changes. Run both numbers before deciding.',
      },
      {
        question: 'Can we start with a ready-made product and build later?',
        answer:
          'Yes, and it is often sensible. Make sure you can export your data in a usable form, because that export is what makes the later move possible.',
      },
    ],
    relatedServices: ['custom-software-development', 'erp-systems', 'business-automation'],
    relatedSolutions: ['retail', 'manufacturing'],
    seoTitle: 'Custom Software vs Ready-Made Software: How to Decide | NEXVERR',
    metaDescription:
      'A practical way to decide between custom and ready-made software: compare workflows rather than feature lists, and count what the workarounds already cost you.',
  },
  {
    slug: 'how-to-choose-billing-software-for-small-business',
    title: 'How to Choose Billing Software for a Small Business',
    excerpt:
      'Most billing software demos look identical. These are the questions that actually separate a system your counter will use from one it will quietly abandon.',
    category: 'Buying software',
    publishedAt: '2026-09-16',
    readingMinutes: 6,
    intro: [
      'Billing software is bought in an afternoon and lived with for years. The demo always looks fine, because every demo bills one item to one customer with one tax rate.',
      'What separates systems is what happens on a Saturday evening with six people waiting, a part-payment, a return from last week and an item that is priced differently for this particular customer.',
    ],
    sections: [
      {
        heading: 'Speed at the counter beats every other feature',
        paragraphs: [
          'Time one full bill in the demo, with your own items and your own edge cases. Count the keystrokes and the mouse movements. Then multiply by the number of bills you raise on a busy day.',
          'A system that takes fifteen seconds longer per bill costs you real time every week — and it is the one thing staff will quietly work around, usually by going back to a paper pad at peak hours.',
        ],
      },
      {
        heading: 'Check it against your pricing, not the demo’s',
        bullets: [
          'Customer-specific or slab-based rates, if you use them',
          'Discounts — per line, per bill, and who is allowed to give them',
          'Multiple units for the same item, and conversion between them',
          'Tax treatment that matches what your accountant expects',
          'Part payments, credit sales and outstanding balances',
          'Returns and exchanges against an old bill',
        ],
      },
      {
        heading: 'Insist that billing and stock be one system',
        paragraphs: [
          'The single biggest improvement is not faster billing — it is billing that moves stock in the same action. When they are separate, someone reconciles them, and the reconciliation is always behind.',
          'Ask directly: when I raise this bill, does the stock figure change? If the answer involves a sync, a schedule or an export, you will be doing that reconciliation for the life of the system.',
        ],
      },
      {
        heading: 'Ask where your data lives and how you get it out',
        paragraphs: [
          'Your item list, customer list and sales history are the business. Before buying, ask two questions and get the answers in writing: where is this stored, and can I export all of it in a standard format whenever I want?',
          'A vendor who cannot answer that plainly is telling you something about how difficult leaving will be.',
        ],
      },
      {
        heading: 'Work out the real cost over three years',
        bullets: [
          'Licence or subscription, multiplied by the counters and users you will actually have',
          'Charges for additional users, branches or features you will need later',
          'Annual maintenance or support charges',
          'Cost of the hardware it requires — if it requires any',
          'What support costs when something breaks during business hours',
        ],
      },
      {
        heading: 'When it is worth building instead',
        paragraphs: [
          'For most shops, a good ready-made billing package is the right answer. Building starts to make sense when the pricing rules are unusual, when billing has to connect to production or a delivery operation, or when per-user charges have grown past what a one-time build would cost.',
          'If you are unsure, the honest test is this: how many things does your team currently do outside the software to make a bill correct? One or two is normal. Five or more means the software is not fitting the business.',
        ],
      },
    ],
    takeaways: [
      'Time a real bill with your own items — speed at the counter is the deciding feature.',
      'Billing and stock should move in one action, not sync afterwards.',
      'Get the data-export answer in writing before you buy.',
      'Cost it over three years, including users and branches you will add.',
    ],
    faqs: [
      {
        question: 'Do we need billing software that works offline?',
        answer:
          'If a connectivity drop would stop you billing, yes. Decide this before choosing, because it is an architectural question rather than a setting someone can switch on later.',
      },
      {
        question: 'Can existing item and customer data be moved into a new system?',
        answer:
          'Usually, if you can export it as a spreadsheet from your current tool. Ask for the import to be part of the setup rather than something you do yourself afterwards.',
      },
    ],
    relatedServices: ['billing-inventory-systems', 'erp-systems', 'restaurant-pos'],
    relatedSolutions: ['retail', 'ecommerce'],
    seoTitle: 'How to Choose Billing Software for a Small Business | NEXVERR',
    metaDescription:
      'Practical questions for choosing billing software: counter speed with your own pricing rules, billing that moves stock, data ownership and three-year cost.',
  },
  {
    slug: 'how-restaurant-pos-software-works',
    title: 'How Restaurant POS Software Works, End to End',
    excerpt:
      'From an order taken at the table to the day’s closing report — what a restaurant POS actually does at each step, and where most of them fall down.',
    category: 'How it works',
    publishedAt: '2026-09-16',
    readingMinutes: 7,
    intro: [
      'A restaurant POS is often described as billing software. That is the last five seconds of what it does. Most of its value is in the minutes before, when an order has to travel from a table to a kitchen without being misheard.',
      'Here is the full path, step by step, and what to look at in each one.',
    ],
    sections: [
      {
        heading: '1. The order is taken',
        paragraphs: [
          'An order is opened against a table, a takeaway counter or a delivery. The menu appears the way the staff think about it — by course or by station, not alphabetically — and modifiers such as spice level or portion size are attached to the item rather than typed as a note.',
          'This is where speed is won or lost. If a server has to search for a common item, the system will be abandoned at the worst moment.',
        ],
      },
      {
        heading: '2. It reaches the kitchen',
        paragraphs: [
          'Once confirmed, the order becomes a ticket at the kitchen — printed, or on a screen. Items can be routed to different sections so the grill and the beverage counter each see only their own work.',
          'Amendments matter more than the first order. When a table changes its mind, the kitchen has to see the change, not a second ticket that contradicts the first.',
        ],
      },
      {
        heading: '3. The floor tracks status',
        paragraphs: [
          'Each item moves through states: fired, preparing, ready, served. The floor can tell what is coming without walking to the pass, which is most of what a good service feels like from a guest’s side.',
        ],
      },
      {
        heading: '4. The bill is closed',
        bullets: [
          'The running bill already reflects everything sent to the kitchen',
          'Splitting by guest or by item, and merging tables, are handled at the table',
          'Taxes and service charges apply by your rules, per outlet',
          'Payment modes — cash, card, UPI, wallet — are recorded against the bill',
          'Part payments and pending amounts are tracked rather than remembered',
        ],
      },
      {
        heading: '5. The day closes',
        paragraphs: [
          'At the end of service, the system produces the numbers that would otherwise be reconstructed: total sales, item-wise performance, payment-mode breakdown, discounts given and by whom, and cancellations.',
          'Item-wise sales is the report most owners under-use. Over a month it tells you which dishes are carrying the menu and which are occupying a station for no return.',
        ],
      },
      {
        heading: 'Where restaurant POS systems usually fall down',
        bullets: [
          'They stop working when connectivity drops — during service, when it matters most',
          'Delivery platform orders live outside the system, so the day never reconciles',
          'Menu changes need a vendor, so the menu on screen drifts from the real one',
          'Reports are built for a chain, and a single outlet cannot find its own numbers',
          'Every additional counter or outlet carries a separate licence charge',
        ],
      },
      {
        heading: 'What to ask before choosing one',
        bullets: [
          'What happens to billing if the internet drops for an hour?',
          'Can we change menu items and prices ourselves, immediately?',
          'Can delivery platform orders reach the same day’s records?',
          'What does it cost to add a second counter, or a second outlet?',
          'Can we export our own sales history whenever we want?',
        ],
      },
    ],
    takeaways: [
      'The order path, not the bill, is where a POS earns its keep.',
      'Amendments and splits are the real test — every system handles a simple order.',
      'Item-wise sales is the report that changes menu decisions.',
      'Settle the offline question before choosing, not after.',
    ],
    faqs: [
      {
        question: 'Does a small restaurant need a POS at all?',
        answer:
          'Once orders regularly overlap, yes — the cost is paid in wrong orders and slow tables rather than in software. Below that volume, a simple billing system with item-wise reporting is often enough.',
      },
      {
        question: 'Can one system run dine-in, takeaway and delivery?',
        answer:
          'It should. Running them separately is what produces three versions of the day and a reconciliation nobody trusts.',
      },
    ],
    relatedServices: ['restaurant-pos', 'billing-inventory-systems', 'mobile-app-development'],
    relatedSolutions: ['restaurants'],
    seoTitle: 'How Restaurant POS Software Works, End to End | NEXVERR',
    metaDescription:
      'A step-by-step walk through restaurant POS software — order taking, kitchen tickets, table status, billing and closing reports — and where systems usually fail.',
  },
  {
    slug: 'when-does-a-business-need-erp-software',
    title: 'When Does a Business Actually Need ERP Software?',
    excerpt:
      'ERP is usually bought too early or far too late. Here are the specific signals that say a business is ready — and the ones that only look like it.',
    category: 'Buying software',
    publishedAt: '2026-09-16',
    readingMinutes: 7,
    intro: [
      'ERP has a reputation problem in smaller businesses, and it is deserved. Too many implementations arrive as a heavy system nobody asked for, force a process change on every department at once, and are quietly abandoned inside a year.',
      'That is a failure of scoping, not of the idea. The idea is simple: enter data once, and let every part of the business that needs it see the same version.',
    ],
    sections: [
      {
        heading: 'The signals that say you are ready',
        bullets: [
          'The same figure is entered into two or three systems by different people',
          'Nobody can state the current stock position without someone checking physically',
          'Management asks three departments for a number and gets three answers',
          'Purchase decisions are made without a reliable view of what is moving',
          'Month-end takes days of assembling files rather than opening a report',
          'Growth is being limited by administration rather than by demand',
        ],
      },
      {
        heading: 'The signals that only look like it',
        paragraphs: [
          'Not every operational problem is an ERP problem. Some are cheaper to fix directly, and buying an ERP to solve them is how businesses end up with a system far heavier than they needed.',
        ],
        bullets: [
          'One department is struggling — fix that department’s tooling first',
          'A competitor has ERP — this tells you nothing about your own operation',
          'Reporting is slow — a dashboard over existing data may be the whole answer',
          'Staff are not following the current process — software will not enforce what management does not',
        ],
      },
      {
        heading: 'Start with the modules that carry your day',
        paragraphs: [
          'A successful ERP rollout almost always starts small: the two or three modules that carry daily operations, usually inventory and purchase, then sales and billing, then accounts.',
          'Get those genuinely in use — not installed, in use — before adding the next. Every module added before the previous one is embedded reduces the odds of the whole thing surviving.',
        ],
      },
      {
        heading: 'Budget for the parts nobody quotes for',
        bullets: [
          'Cleaning and importing your existing item, supplier and customer data',
          'Training, including the second round three weeks after go-live',
          'The period where the old system runs alongside the new one',
          'Changes discovered only once people use it daily',
          'Ongoing support and updates',
        ],
      },
      {
        heading: 'Buy, build, or something in between',
        paragraphs: [
          'If your operation is standard, a packaged ERP configured properly is the fastest route. If your process is the reason customers choose you — an unusual production route, a pricing model competitors cannot match — that part is worth building, with standard modules around it.',
          'The in-between option is the one most small businesses should consider first: keep the accounting package, build or configure the operational modules that connect to it, and integrate the two so nothing is entered twice.',
        ],
      },
      {
        heading: 'A reasonable first-year plan',
        bullets: [
          'Map the workflow that carries most of your revenue, exactly as it runs today',
          'Pick the two modules that touch it most',
          'Import and verify your existing master data before go-live',
          'Run parallel for one cycle, then commit to one system',
          'Review after a quarter and decide the next module from what you have learned',
        ],
      },
    ],
    takeaways: [
      'ERP is ready when the same data is entered twice and nobody trusts the numbers.',
      'Start with the two modules that carry the day, not the full suite.',
      'Budget for data migration, training and the changes discovered after go-live.',
      'Keep what works — integrate around your accounting package rather than replacing it.',
    ],
    faqs: [
      {
        question: 'How small is too small for ERP?',
        answer:
          'Size matters less than the number of disconnected systems. A business with twelve staff running four tools that do not talk to each other has more to gain than one with sixty staff running a single well-fitted system.',
      },
      {
        question: 'How long does an ERP implementation take?',
        answer:
          'A phased rollout puts the first modules in use in weeks to a few months, depending on data readiness. Any quote that promises a full suite live in days is describing an installation, not an implementation.',
      },
    ],
    relatedServices: ['erp-systems', 'custom-software-development', 'manufacturing-software'],
    relatedSolutions: ['manufacturing', 'retail'],
    seoTitle: 'When Does a Business Need ERP Software? | NEXVERR',
    metaDescription:
      'The specific signals that a business is ready for ERP software, the ones that only look like it, and how to phase a rollout that survives its first year.',
  },
];

export const blogPostMap = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;

/** Newest first. */
export const sortedBlogPosts: BlogPost[] = [...blogPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostMap[slug];
}

export function getPostsForService(serviceSlug: string): BlogPost[] {
  return sortedBlogPosts.filter((post) => post.relatedServices.includes(serviceSlug));
}

export function getPostsForSolution(industrySlug: string): BlogPost[] {
  return sortedBlogPosts.filter((post) => post.relatedSolutions?.includes(industrySlug));
}

export const hasBlogPosts = blogPosts.length > 0;
