export type GstToolItem = {
  key: string;
  slug: string;
  label: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  eyebrow: string;
  detailTitle: string;
  detail: string;
  detailExtended: string;
  points: string[];
  highlights: string[];
  useCases: string[];
};

export const gstTools: GstToolItem[] = [
  {
    key: 'gstr',
    slug: 'gstr-filing',
    label: 'GSTR Filing',
    title: 'GSTR-1 Sales',
    badge: 'Export Data',
    description:
      'Export your GSTR1 data in a simple format and help your team or CA complete GST filing faster with clean invoice summaries.',
    image: '/images/dashboard.png',
    eyebrow: 'GST Returns',
    detailTitle: 'Prepare GSTR filing data with cleaner invoice records and faster exports',
    detail:
      'RoboBooks helps your team organize taxable sales, invoice summaries, and customer-wise values so GST return preparation becomes much more structured.',
    detailExtended:
      'Instead of rebuilding numbers manually at month-end, finance teams can review ready-to-export records, verify sales data quickly, and share cleaner files with internal accountants or external CAs. This reduces filing stress and improves confidence before submission deadlines.',
    points: [
      'GST-ready sales summaries with invoice-level visibility',
      'Cleaner export structure for accountant or CA workflows',
      'Less manual checking before filing periods close',
    ],
    highlights: [
      'Keep taxable sales data organized throughout the month',
      'Reduce last-minute GST compilation effort for your finance team',
      'Share cleaner records with fewer missing invoice details',
    ],
    useCases: [
      'Teams preparing monthly GSTR-1 sales exports',
      'Businesses coordinating filing work with an external CA',
      'Finance staff reviewing invoice summaries before return submission',
    ],
  },
  {
    key: 'einvoice',
    slug: 'e-invoicing',
    label: 'E-Invoicing',
    title: 'IRN & E-Invoice Ready',
    badge: 'Auto Sync',
    description:
      'Generate invoice data with the right business fields so e-invoice workflows stay cleaner, faster, and easier to validate.',
    image: '/images/invoicing.png',
    eyebrow: 'E-Invoice Automation',
    detailTitle: 'Create e-invoice ready records with correct fields, tax data, and faster validation',
    detail:
      'Build invoice data in a structured way so your GST billing workflows are ready for IRN-related processes, validation checks, and cleaner downstream compliance work.',
    detailExtended:
      'When item details, GST amounts, customer information, and invoice references are maintained properly from the start, e-invoicing becomes much easier to manage. RoboBooks helps your team reduce correction cycles, speed up invoice preparation, and keep sales documentation more consistent across customers and transactions.',
    points: [
      'Invoice structures aligned for e-invoice workflows',
      'Customer, tax, and item details stored in one clean record',
      'Faster preparation before sharing or validating invoice data',
    ],
    highlights: [
      'Avoid repeated invoice corrections caused by incomplete business fields',
      'Keep GST billing data cleaner across recurring and one-time sales',
      'Support faster handoff to compliance and accounting teams',
    ],
    useCases: [
      'Companies issuing GST invoices at higher transaction volumes',
      'Sales teams coordinating invoice approval with finance operations',
      'Businesses that need clean data before IRN and e-invoice processing',
    ],
  },
  {
    key: 'eway',
    slug: 'delivery-challan',
    label: 'Delivery Challan',
    title: 'Delivery Challan Flow',
    badge: 'Dispatch Ready',
    description:
      'Prepare bill details, customer data, and shipment records in one place before sharing or exporting transport-related documents.',
    image: '/images/homehero.png',
    eyebrow: 'Dispatch Documentation',
    detailTitle: 'Manage delivery challans with item details, dispatch references, and customer records together',
    detail:
      'Create and review delivery challans from one organized workspace so your dispatch team can move goods with better accuracy and supporting documentation.',
    detailExtended:
      'RoboBooks helps keep customer details, references, dates, and line items aligned before goods move out. That means fewer manual mistakes, faster document preparation, and better visibility for teams coordinating sales, logistics, and proof of delivery.',
    points: [
      'Create challans with structured customer and item details',
      'Keep dispatch references and document status easy to track',
      'Support transport-ready workflows without scattered manual files',
    ],
    highlights: [
      'Reduce confusion between sales records and dispatch paperwork',
      'Prepare shipment documents faster from one guided flow',
      'Keep proof-ready challan history available for review and follow-up',
    ],
    useCases: [
      'Trading businesses dispatching goods before final invoicing',
      'Operations teams managing multiple outbound deliveries every day',
      'Sales teams that need cleaner coordination with warehouse staff',
    ],
  },
  {
    key: 'tally',
    slug: 'data-export-to-sale',
    label: 'Data Export to Sale',
    title: 'Sales Data Export',
    badge: 'Sales Sync',
    description:
      'Move structured sales and tax records from RoboBooks to your accounting workflows with less manual re-entry.',
    image: '/images/Decision Dashboards.png',
    eyebrow: 'Sales Data Movement',
    detailTitle: 'Export sales data in a structured format for smoother accounting and reporting workflows',
    detail:
      'Send organized sales entries, tax values, and invoice records into downstream workflows without rebuilding the same data again in separate systems.',
    detailExtended:
      'This is especially useful for teams that still rely on external accounting review, partner systems, or handoff-based reporting processes. RoboBooks makes the export step cleaner so your finance team can move data faster while reducing format issues and duplicate entry work.',
    points: [
      'Structured export flow for sales and tax records',
      'Cleaner data handoff to accounting and reporting teams',
      'Lower manual effort when moving information between systems',
    ],
    highlights: [
      'Avoid duplicate data entry across sales and finance workflows',
      'Keep exported values easier to verify before sharing',
      'Improve consistency between operational records and accounting files',
    ],
    useCases: [
      'Businesses exporting GST sales data to external accounting tools',
      'Teams preparing records for monthly finance consolidation',
      'Companies that want fewer spreadsheet adjustments after export',
    ],
  },
  {
    key: 'bank',
    slug: 'bank-reconciliation',
    label: 'Bank Reconciliation',
    title: 'Bank Reconciliation',
    badge: 'Auto Match',
    description:
      'Match bank entries, track pending transactions, and keep your books aligned with real account activity using a cleaner reconciliation workflow.',
    image: '/images/Cash Flow Tracking.png',
    eyebrow: 'Books Matching',
    detailTitle: 'Match bank activity with accounting records and close gaps before month-end',
    detail:
      'Review imported transactions, compare ledger entries, and identify unmatched items from one reconciliation flow built for faster financial accuracy.',
    detailExtended:
      'With better visibility into bank activity and pending matches, your team can spot issues earlier, reduce month-end surprises, and keep books aligned with actual account movement. RoboBooks makes reconciliation easier to manage for both daily review and period-close workflows.',
    points: [
      'Track matched, pending, and review-needed bank transactions',
      'Improve accuracy between bank accounts and internal books',
      'Speed up reconciliation before reporting and filing deadlines',
    ],
    highlights: [
      'Catch missing or duplicated entries before closing periods',
      'Give finance teams a clearer daily view of bank activity',
      'Support faster month-end and audit-ready reconciliation work',
    ],
    useCases: [
      'Accounts teams reconciling daily collections and vendor payouts',
      'Businesses with multiple bank accounts and regular transaction volume',
      'Finance managers reviewing unmatched entries before period close',
    ],
  },
  {
    key: 'data',
    slug: 'import-export-of-data',
    label: 'Import Export of Data',
    title: 'Import and Export Center',
    badge: 'Data Sync',
    description:
      'Move invoices, books, ledgers, and structured reports between RoboBooks and your external accounting workflows with less manual effort.',
    image: '/images/usability.png',
    eyebrow: 'Bulk Data Operations',
    detailTitle: 'Import and export business data cleanly across modules, reports, and external files',
    detail:
      'Handle bulk movement of invoices, books, customer records, and reports with a cleaner process that reduces manual formatting work.',
    detailExtended:
      'Whether you are onboarding historical data, migrating from older systems, or sharing periodic exports with stakeholders, RoboBooks helps standardize the flow. This makes uploads easier to validate and exports easier to trust across teams that depend on accurate records.',
    points: [
      'Support bulk imports for operational and accounting records',
      'Generate cleaner exports for sharing and downstream processing',
      'Reduce spreadsheet cleanup before or after data movement',
    ],
    highlights: [
      'Save time when moving high-volume records between systems',
      'Maintain better consistency across uploaded and exported data',
      'Make data migration and reporting workflows less error-prone',
    ],
    useCases: [
      'Businesses migrating master data or invoice history into RoboBooks',
      'Finance teams exporting records for review, audit, or backup',
      'Operations staff handling bulk uploads across multiple modules',
    ],
  },
  {
    key: 'reporting',
    slug: 'multiple-financial-reporting',
    label: 'Multiple Financial Reporting',
    title: 'Financial Reporting Hub',
    badge: 'Insight Ready',
    description:
      'Generate multiple financial reports from one dashboard, compare business metrics, and share cleaner summaries with your team or accountant.',
    image: '/images/Decision Dashboards.png',
    eyebrow: 'Finance Reporting',
    detailTitle: 'Build multiple financial reports from one connected reporting workspace',
    detail:
      'Access important business reports such as profit and loss, balance sheet, cash flow, and performance snapshots from a single reporting view.',
    detailExtended:
      'Instead of collecting numbers from different places, your team can work from one reporting hub to compare periods, review performance, and share summaries more confidently. RoboBooks helps finance leaders move from raw entries to readable, decision-friendly reports without extra reporting friction.',
    points: [
      'Centralized reporting access across core financial statements',
      'Cleaner summaries for internal review and stakeholder sharing',
      'Better visibility into trends, liquidity, and business performance',
    ],
    highlights: [
      'Support leadership reviews with more organized financial reporting',
      'Reduce time spent collecting report data from multiple modules',
      'Make finance conversations easier with clearer summaries and trends',
    ],
    useCases: [
      'Founders reviewing business performance from one reporting hub',
      'Finance teams preparing monthly management summaries',
      'Accountants sharing profit, balance sheet, and cash flow snapshots',
    ],
  },
];

export function getGstToolBySlug(slug: string) {
  return gstTools.find((tool) => tool.slug === slug);
}
