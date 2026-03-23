export type ServiceItem = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  eyebrow: string;
  detailTitle: string;
  detail: string;
  detailExtended: string;
  points: string[];
  highlights: string[];
  useCases: string[];
};

export const services: ServiceItem[] = [
  {
    slug: 'smart-invoicing',
    title: 'Smart Invoicing',
    desc: 'Create branded GST invoices, schedule recurring bills, and send automated payment reminders while keeping every invoice professionally organized.',
    image: '/images/invoicing.png',
    eyebrow: 'Invoice Automation',
    detailTitle: 'Launch polished invoices and payment reminders from one workspace',
    detail:
      'Build branded GST invoices, schedule recurring billing, track due payments, and send timely follow-ups without switching between tools or spreadsheets.',
    detailExtended:
      'This helps finance teams shorten billing cycles, present a more professional customer experience, and reduce the manual chasing that usually slows collections. Whether you send a handful of invoices each week or manage high-volume recurring billing, RoboBooks keeps the process faster, cleaner, and easier to track.',
    points: [
      'Custom invoice themes and GST-ready fields',
      'Recurring invoices with reminder workflows',
      'Faster collections with payment status visibility',
    ],
    highlights: [
      'Create polished invoices with consistent branding and tax-ready structure',
      'Automate recurring billing for retainers, subscriptions, and repeat customers',
      'Track due dates and unpaid invoices before follow-ups become urgent',
    ],
    useCases: [
      'Agencies sending monthly retainers and project invoices',
      'Distributors managing frequent GST billing across customers',
      'Service teams that need reminders without manual calling or email follow-up',
    ],
  },
  {
    slug: 'cash-flow-tracking',
    title: 'Cash Flow Tracking',
    desc: 'Monitor receivables, payouts, and payment cycles from one live financial command center that helps you plan daily cash positions confidently.',
    image: '/images/Cash Flow Tracking.png',
    eyebrow: 'Cash Visibility',
    detailTitle: 'See incoming and outgoing money in one live finance view',
    detail:
      'Follow receivables, upcoming payments, and settlement trends so your team can act early, reduce delays, and keep liquidity under control.',
    detailExtended:
      'Instead of reacting only at month-end, your team gets a working view of how cash is moving through the business every day. That makes it easier to plan vendor payouts, chase overdue collections, and avoid short-term cash pressure before it affects operations.',
    points: [
      'Real-time receivable and payable tracking',
      'Payment cycle monitoring across customers and vendors',
      'Operational visibility for faster finance decisions',
    ],
    highlights: [
      'Monitor receivables and payables from one practical working dashboard',
      'Spot delayed collections and upcoming payouts before they create pressure',
      'Support better short-term planning with live settlement visibility',
    ],
    useCases: [
      'Businesses that manage daily vendor payouts alongside customer collections',
      'Teams that need better cash planning during busy billing cycles',
      'Owners who want a quick operating view without reading multiple reports',
    ],
  },
  {
    slug: 'inventory-control',
    title: 'Inventory Control',
    desc: 'Track stock movement, reorder levels, valuation, and invoice-linked inventory updates in real time to avoid shortages and overstock.',
    image: '/images/Inventory Control.png',
    eyebrow: 'Stock Accuracy',
    detailTitle: 'Keep inventory synced with billing, sales, and reorder planning',
    detail:
      'Monitor stock movement, value inventory correctly, and reduce stockouts with product-level control connected directly to your billing and accounting flow.',
    detailExtended:
      'When inventory, invoicing, and accounting stay aligned, teams can make stronger purchasing decisions and respond faster to demand changes. RoboBooks helps reduce mismatches between physical stock and financial records while giving clearer visibility into availability, reorder timing, and item-level value.',
    points: [
      'Track stock movement with invoice-linked updates',
      'Follow reorder alerts before shortages happen',
      'Review valuation and item-level availability instantly',
    ],
    highlights: [
      'Keep sales activity and stock movement updated together in real time',
      'Use reorder visibility to prevent avoidable shortages and rush purchases',
      'Review valuation with better accuracy for finance and operations teams',
    ],
    useCases: [
      'Retail and trading businesses managing fast-moving product lines',
      'Wholesalers that need invoice-linked stock updates across teams',
      'Operations teams balancing reorder planning with margin awareness',
    ],
  },
  {
    slug: 'customer-vendor-books',
    title: 'Customer & Vendor Books',
    desc: 'Keep ledgers, payment history, tax details, and outstanding balances organized for every customer and vendor relationship.',
    image: '/images/GSR & Vendor.png',
    eyebrow: 'Relationship Records',
    detailTitle: 'Maintain complete books for every customer and vendor',
    detail:
      'Store ledgers, transaction history, balances, and tax information in a clean relationship view that helps your team respond faster and with better context.',
    detailExtended:
      'With every relationship record organized in one place, your finance and operations teams spend less time searching through entries and more time acting on them. RoboBooks makes it easier to review dues, confirm payment history, answer account questions, and maintain cleaner long-term records.',
    points: [
      'Centralized ledgers and outstanding balances',
      'Payment history with contextual business records',
      'Clean GST and tax detail management',
    ],
    highlights: [
      'Bring balances, ledger activity, and tax details into one shared record',
      'Reduce confusion when checking dues, adjustments, and payment history',
      'Help teams respond faster with cleaner customer and vendor context',
    ],
    useCases: [
      'Businesses handling repeat customers with ongoing outstanding balances',
      'Purchase teams reviewing vendor dues and transaction history regularly',
      'Finance staff who need quick account context before calls or reconciliations',
    ],
  },
  {
    slug: 'gst-compliance',
    title: 'GST & Compliance',
    desc: 'Generate tax-ready reports, reconcile entries, and stay prepared for GST filing with less manual effort and fewer missed details.',
    image: '/images/dashboard.png',
    eyebrow: 'Compliance Ready',
    detailTitle: 'Prepare returns, reports, and reconciliations with less manual effort',
    detail:
      'Generate GST-ready summaries, keep records aligned, and simplify month-end compliance tasks with guided accounting support and cleaner reporting.',
    detailExtended:
      'Compliance work becomes easier when the underlying records are already structured correctly. RoboBooks helps teams reduce manual compilation, keep reporting cleaner throughout the month, and approach filing timelines with more confidence and fewer last-minute corrections.',
    points: [
      'GST-ready exports and reporting structure',
      'Faster reconciliation across entries and tax data',
      'Cleaner filing preparation for finance teams',
    ],
    highlights: [
      'Prepare tax-ready summaries without rebuilding reports from scratch',
      'Reduce reconciliation effort by keeping entries and tax records aligned',
      'Support month-end filing with cleaner data and fewer missed details',
    ],
    useCases: [
      'Finance teams preparing monthly GST reviews and return workflows',
      'Businesses that want fewer compliance delays at month-end',
      'Accountants reconciling entries before filing and audit preparation',
    ],
  },
  {
    slug: 'decision-dashboards',
    title: 'Decision Dashboards',
    desc: 'Turn accounting activity into clear trends, margin snapshots, and business performance insights your team can use for faster decisions.',
    image: '/images/Decision Dashboards.png',
    eyebrow: 'Insight Engine',
    detailTitle: 'Turn accounting data into clear decision-ready dashboards',
    detail:
      'Watch growth, margins, collections, and performance trends from a visual dashboard built for owners, finance teams, and day-to-day operators.',
    detailExtended:
      'Instead of reading through scattered reports, teams get a clearer story of how the business is performing. RoboBooks turns accounting activity into practical visual insight so leaders can spot movement early, compare trends, and make more confident operational and financial decisions.',
    points: [
      'Visual trend monitoring across business metrics',
      'Margin and performance snapshot reporting',
      'Quick insight sharing for smarter planning',
    ],
    highlights: [
      'Translate accounting activity into visual trends your team can act on',
      'Review margins, collections, and performance from one reporting layer',
      'Support planning conversations with clearer numbers and faster context',
    ],
    useCases: [
      'Founders reviewing business health without digging through raw ledgers',
      'Finance teams sharing clear trend snapshots with management',
      'Operators tracking collections, performance, and margin movement together',
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
