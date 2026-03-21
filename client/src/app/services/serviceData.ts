export type ServiceItem = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  eyebrow: string;
  detailTitle: string;
  detail: string;
  points: string[];
};

export const services: ServiceItem[] = [
  {
    slug: 'smart-invoicing',
    title: 'Smart Invoicing',
    desc: 'Create branded GST invoices, recurring bills, and automated reminders without manual follow-up.',
    image: '/images/dashboard.png',
    eyebrow: 'Invoice Automation',
    detailTitle: 'Launch polished invoices and payment reminders from one workspace',
    detail:
      'Build branded GST invoices, schedule recurring billing, track due payments, and send follow-ups without switching between tools.',
    points: [
      'Custom invoice themes and GST-ready fields',
      'Recurring invoices with reminder workflows',
      'Faster collections with payment status visibility',
    ],
  },
  {
    slug: 'cash-flow-tracking',
    title: 'Cash Flow Tracking',
    desc: 'Monitor receivables, payouts, and payment cycles from one live financial command center.',
    image: '/images/homehero.png',
    eyebrow: 'Cash Visibility',
    detailTitle: 'See incoming and outgoing money in one live finance view',
    detail:
      'Follow receivables, upcoming payments, and settlement trends so your team can act early and keep liquidity under control.',
    points: [
      'Real-time receivable and payable tracking',
      'Payment cycle monitoring across customers and vendors',
      'Operational visibility for faster finance decisions',
    ],
  },
  {
    slug: 'inventory-control',
    title: 'Inventory Control',
    desc: 'Track stock movement, reorder levels, valuation, and invoice-linked inventory updates in real time.',
    image: '/images/businessbenifits.png',
    eyebrow: 'Stock Accuracy',
    detailTitle: 'Keep inventory synced with billing, sales, and reorder planning',
    detail:
      'Monitor stock movement, value inventory correctly, and reduce stockouts with product-level control connected to your accounting flow.',
    points: [
      'Track stock movement with invoice-linked updates',
      'Follow reorder alerts before shortages happen',
      'Review valuation and item-level availability instantly',
    ],
  },
  {
    slug: 'customer-vendor-books',
    title: 'Customer & Vendor Books',
    desc: 'Keep ledgers, payment history, and tax details organized for every business relationship.',
    image: '/images/homehero.png',
    eyebrow: 'Relationship Records',
    detailTitle: 'Maintain complete books for every customer and vendor',
    detail:
      'Store ledgers, transaction history, balances, and tax information in a clean relationship view that helps your team respond faster.',
    points: [
      'Centralized ledgers and outstanding balances',
      'Payment history with contextual business records',
      'Clean GST and tax detail management',
    ],
  },
  {
    slug: 'gst-compliance',
    title: 'GST & Compliance',
    desc: 'Generate tax-ready reports, reconcile entries, and stay prepared for filing with less effort.',
    image: '/images/dashboard.png',
    eyebrow: 'Compliance Ready',
    detailTitle: 'Prepare returns, reports, and reconciliations with less manual effort',
    detail:
      'Generate GST-ready summaries, keep records aligned, and simplify month-end compliance tasks with guided accounting support.',
    points: [
      'GST-ready exports and reporting structure',
      'Faster reconciliation across entries and tax data',
      'Cleaner filing preparation for finance teams',
    ],
  },
  {
    slug: 'decision-dashboards',
    title: 'Decision Dashboards',
    desc: 'Turn accounting activity into clear trends, margin snapshots, and business performance insights.',
    image: '/images/dashboard.png',
    eyebrow: 'Insight Engine',
    detailTitle: 'Turn accounting data into clear decision-ready dashboards',
    detail:
      'Watch growth, margins, collections, and performance trends from a visual dashboard built for owners, finance teams, and operators.',
    points: [
      'Visual trend monitoring across business metrics',
      'Margin and performance snapshot reporting',
      'Quick insight sharing for smarter planning',
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
