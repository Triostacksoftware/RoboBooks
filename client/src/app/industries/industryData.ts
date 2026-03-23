export type IndustryItem = {
  slug: string;
  title: string;
  eyebrow: string;
  heroTitle: string;
  description: string;
  overview: string;
  accountingFocus: string[];
  workflows: string[];
  reports: string[];
};

export const industries: IndustryItem[] = [
  {
    slug: 'hotel',
    title: 'Hotel',
    eyebrow: 'Hospitality Accounting',
    heroTitle: 'Accounting workflows built for hotel operations and guest billing',
    description:
      'Manage room revenue, restaurant billing, vendor expenses, and occupancy-linked reporting from one connected accounting system.',
    overview:
      'Hotels operate with daily transactions across rooms, food services, housekeeping, events, and vendor purchases. RoboBooks helps hotel teams keep guest billing, tax calculations, expense tracking, and operational reporting aligned so accounts stay clean even during high-volume seasons.',
    accountingFocus: [
      'Track room revenue, advance bookings, and settlement balances accurately',
      'Record restaurant, banquet, laundry, and service income under the right heads',
      'Manage vendor bills, utility costs, and recurring operating expenses clearly',
    ],
    workflows: [
      'Support guest folio billing and invoice generation for stays and events',
      'Handle seasonal cash flow planning for occupancy swings and vendor commitments',
      'Keep GST-ready records for accommodation, food, and mixed service billing',
    ],
    reports: [
      'Revenue summaries by room, service line, and season',
      'Expense visibility across operations, maintenance, and procurement',
      'Profitability snapshots for management and owner review',
    ],
  },
  {
    slug: 'export-import',
    title: 'Export-Import',
    eyebrow: 'Trade Accounting',
    heroTitle: 'Accounting support for international trade, duties, and shipment-linked billing',
    description:
      'Organize overseas invoices, freight costs, vendor payments, and landed cost visibility with cleaner accounting controls.',
    overview:
      'Export-import businesses manage complex transactions involving suppliers, customs, logistics partners, freight charges, and foreign buyers. RoboBooks helps structure billing, purchase records, charge allocations, and payment tracking so teams can control margins across international trade cycles.',
    accountingFocus: [
      'Track purchase invoices, shipping expenses, duties, and clearing charges together',
      'Maintain customer and vendor ledgers across shipment-linked transactions',
      'Monitor receivables and payables around delivery, documentation, and settlement timelines',
    ],
    workflows: [
      'Allocate freight, customs, and handling costs into landed costing workflows',
      'Prepare invoice and tax records needed for export or import documentation',
      'Support better margin tracking by consignment, order, or customer',
    ],
    reports: [
      'Shipment-wise profitability and cost allocation visibility',
      'Outstanding receivable and payable tracking across trade partners',
      'Decision-ready summaries for finance, procurement, and operations teams',
    ],
  },
  {
    slug: 'recycling',
    title: 'Recycling',
    eyebrow: 'Material Recovery Accounting',
    heroTitle: 'Accounting tools for scrap purchases, recovery value, and processing costs',
    description:
      'Track incoming scrap, recovery output, plant expenses, and resale billing with better material-linked accounting visibility.',
    overview:
      'Recycling businesses need clean accounting around purchase lots, material categories, processing costs, and output valuation. RoboBooks helps record raw material intake, operating expenses, and sales billing while keeping financial records tied to day-to-day recovery activity.',
    accountingFocus: [
      'Maintain purchase records for scrap intake and supplier settlements',
      'Track processing expenses such as labour, transport, and utilities',
      'Monitor output valuation and resale billing by material type',
    ],
    workflows: [
      'Connect inward material movement with cost and inventory controls',
      'Handle variable pricing across lots, grades, and resale buyers',
      'Keep cleaner books for recovery operations with frequent stock changes',
    ],
    reports: [
      'Material-wise purchase, processing, and sales summaries',
      'Margin visibility by lot, category, or production cycle',
      'Expense control reports for plant and logistics teams',
    ],
  },
  {
    slug: 'telecom',
    title: 'Telecom',
    eyebrow: 'Usage Billing Accounting',
    heroTitle: 'Accounting workflows for telecom billing, collections, and service operations',
    description:
      'Manage recurring billing, service revenue, vendor payouts, and usage-linked accounting across telecom operations.',
    overview:
      'Telecom businesses run on high-volume billing, recurring plans, service collections, and infrastructure expenses. RoboBooks helps organize revenue recognition, customer dues, operating costs, and reporting structures so finance teams can monitor performance across ongoing service accounts.',
    accountingFocus: [
      'Track subscription billing, one-time charges, and customer collections',
      'Manage infrastructure, bandwidth, and support-related expense ledgers',
      'Keep customer and partner settlements visible across billing cycles',
    ],
    workflows: [
      'Support recurring invoice workflows for monthly plans and service contracts',
      'Follow overdue collections and delayed settlements more efficiently',
      'Maintain cleaner records for service-heavy and volume-driven transactions',
    ],
    reports: [
      'Monthly recurring revenue and collection trend visibility',
      'Cost summaries across support, operations, and infrastructure',
      'Business performance views for finance and management teams',
    ],
  },
  {
    slug: 'it-sector',
    title: 'IT Sector',
    eyebrow: 'Technology Services Accounting',
    heroTitle: 'Accounting support for software, support contracts, and project billing',
    description:
      'Handle milestone invoices, retainer billing, team expenses, and client-wise profitability for IT businesses.',
    overview:
      'IT companies often balance project billing, annual maintenance contracts, subscription income, and team operating expenses. RoboBooks helps keep client books, invoice schedules, vendor costs, and profitability reporting connected so teams can make faster commercial decisions.',
    accountingFocus: [
      'Track project invoices, retainers, subscriptions, and support renewals',
      'Manage employee, contractor, software, and infrastructure expenses clearly',
      'Keep client-wise receivables and payment history accessible in one place',
    ],
    workflows: [
      'Support milestone, recurring, and contract-based billing workflows',
      'Monitor cash flow around delayed collections and payroll-heavy cost cycles',
      'Maintain cleaner books for service delivery, procurement, and admin spend',
    ],
    reports: [
      'Client profitability and billing cycle performance summaries',
      'Expense visibility across tools, teams, and operational functions',
      'Management dashboards for growth, collections, and cost control',
    ],
  },
  {
    slug: 'beverages',
    title: 'Beverages',
    eyebrow: 'FMCG Accounting',
    heroTitle: 'Accounting workflows for beverage production, distribution, and sales billing',
    description:
      'Track raw material costs, batch-linked inventory, distributor billing, and sales performance across beverage operations.',
    overview:
      'Beverage businesses need control over procurement, production costs, inventory movement, and distributor receivables. RoboBooks helps organize purchase entries, stock updates, invoice records, and financial reporting so management can monitor margins and movement more accurately.',
    accountingFocus: [
      'Manage raw material purchases, packaging costs, and production-related expenses',
      'Track inventory valuation across finished goods and distribution channels',
      'Maintain customer billing and receivable control for dealers and distributors',
    ],
    workflows: [
      'Support batch-driven stock movement and sales-linked inventory updates',
      'Handle recurring distributor billing and payment follow-up workflows',
      'Keep production and sales records aligned with accounting books',
    ],
    reports: [
      'Margin views by product line, distributor, or sales period',
      'Expense tracking across procurement, production, and delivery',
      'Collection and stock trend reports for business planning',
    ],
  },
  {
    slug: 'oil-gas',
    title: 'Oil & Gas',
    eyebrow: 'Energy Accounting',
    heroTitle: 'Accounting controls for fuel operations, procurement, and high-value billing',
    description:
      'Track procurement costs, fuel movement, contractor payments, and asset-heavy accounting with stronger control.',
    overview:
      'Oil and gas operations involve high-value purchases, transport costs, contractor bills, and tightly monitored stock movement. RoboBooks helps structure expense books, sales billing, and settlement visibility so finance teams can maintain cleaner control over large operational flows.',
    accountingFocus: [
      'Track fuel purchases, transport charges, and contractor settlements',
      'Maintain high-value customer invoices and payment cycle records',
      'Record asset, maintenance, and utility expenses with clear categorization',
    ],
    workflows: [
      'Support operational accounting for depots, distribution, and service contracts',
      'Monitor outstanding balances across customers, vendors, and field operations',
      'Keep documentation cleaner for audit, control, and compliance workflows',
    ],
    reports: [
      'Revenue and expense views by unit, route, or operational segment',
      'Payable and receivable summaries for large-value transactions',
      'Control-focused reporting for owners, finance heads, and auditors',
    ],
  },
  {
    slug: 'apparels',
    title: 'Apparels',
    eyebrow: 'Garment Accounting',
    heroTitle: 'Accounting support for fashion inventory, purchase cycles, and multi-channel sales',
    description:
      'Manage fabric purchases, production expenses, stock movement, and retailer billing with better financial visibility.',
    overview:
      'Apparel businesses deal with changing styles, fast inventory turnover, vendor coordination, and distributor or retail billing. RoboBooks helps maintain cleaner books around procurement, stock valuation, sales movement, and seasonal margin tracking.',
    accountingFocus: [
      'Track material purchases, job work costs, and production expenses',
      'Maintain stock records across sizes, categories, and sales channels',
      'Monitor retailer and distributor billing with outstanding balance visibility',
    ],
    workflows: [
      'Support inventory-linked invoicing and reorder planning for moving items',
      'Handle seasonal buying and sales cycles with better cost control',
      'Keep customer, vendor, and stock records aligned in one workflow',
    ],
    reports: [
      'Category-wise sales, stock, and gross margin summaries',
      'Expense visibility across sourcing, production, and dispatch',
      'Collection and performance reports for channel management',
    ],
  },
  {
    slug: 'entertainment',
    title: 'Entertainment',
    eyebrow: 'Media Accounting',
    heroTitle: 'Accounting workflows for productions, events, campaigns, and rights-based revenue',
    description:
      'Track event billing, project expenses, vendor payments, and revenue across entertainment operations.',
    overview:
      'Entertainment businesses often run project-based budgets, event income, artist payments, marketing spends, and sponsor billing. RoboBooks helps keep each activity financially structured so teams can monitor costs, collections, and profitability without fragmented records.',
    accountingFocus: [
      'Record project budgets, event expenses, and talent or vendor payouts',
      'Track sponsor billing, service invoices, and receivables cleanly',
      'Maintain expense visibility across production, promotion, and operations',
    ],
    workflows: [
      'Support accounting around one-time events and recurring media engagements',
      'Follow cash flow across advance payments, staged billing, and settlement cycles',
      'Keep financial documentation organized for multiple parallel projects',
    ],
    reports: [
      'Project or event-wise cost and revenue summaries',
      'Outstanding tracking across sponsors, partners, and service clients',
      'Margin snapshots for management decision-making',
    ],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    eyebrow: 'Production Accounting',
    heroTitle: 'Accounting controls for production, inventory valuation, and plant expenses',
    description:
      'Track raw materials, WIP, finished goods, vendor bills, and production-linked accounting from one place.',
    overview:
      'Manufacturing businesses need accurate control over procurement, production costs, inventory valuation, and customer billing. RoboBooks supports cleaner accounting around plant operations, stock movement, vendor obligations, and sales cycles so finance and operations teams stay aligned.',
    accountingFocus: [
      'Track raw material purchases, vendor invoices, and plant operating expenses',
      'Maintain inventory movement across raw stock, WIP, and finished goods',
      'Monitor customer billing and receivables connected to dispatch and delivery',
    ],
    workflows: [
      'Support cost visibility across production cycles and item categories',
      'Handle reorder planning and stock-linked invoice updates efficiently',
      'Keep procurement, operations, and accounting records synchronized',
    ],
    reports: [
      'Material consumption, stock valuation, and production margin summaries',
      'Expense tracking across labour, utilities, and operations',
      'Performance views for plant managers and finance leaders',
    ],
  },
  {
    slug: 'retail',
    title: 'Retail',
    eyebrow: 'Retail Accounting',
    heroTitle: 'Accounting support for fast-moving sales, stock control, and customer billing',
    description:
      'Manage daily sales, inventory movement, supplier purchases, and branch-wise reporting with cleaner accounting flow.',
    overview:
      'Retail businesses run on fast billing, high product movement, supplier rotations, and seasonal demand changes. RoboBooks helps keep sales, stock, purchases, and payment tracking connected so teams can manage both front-end billing and back-end accounts with better clarity.',
    accountingFocus: [
      'Track daily billing, refunds, and collections across products or branches',
      'Maintain supplier ledgers, purchase records, and due payments cleanly',
      'Monitor stock levels, valuation, and fast-moving item performance',
    ],
    workflows: [
      'Support invoice-linked stock reduction and reorder planning',
      'Handle cash and credit sales with better settlement visibility',
      'Keep customer, supplier, and inventory records synced across operations',
    ],
    reports: [
      'Sales and margin summaries by item, category, or outlet',
      'Stock movement and reorder visibility for store teams',
      'Collection and expense reports for management review',
    ],
  },
  {
    slug: 'banks',
    title: 'Banks',
    eyebrow: 'Financial Operations Accounting',
    heroTitle: 'Accounting workflows for banking operations, reconciliation, and reporting control',
    description:
      'Support reconciliation-heavy finance workflows, ledger control, and high-accuracy reporting across banking operations.',
    overview:
      'Banking environments require disciplined ledger structures, reconciliation accuracy, documentation control, and reporting confidence. RoboBooks helps teams maintain clean records, track operational expenses, and organize transaction-linked books where auditability and accuracy matter deeply.',
    accountingFocus: [
      'Maintain clean ledgers, transaction records, and control-focused reporting views',
      'Track branch or department expenses with proper approval visibility',
      'Support structured reconciliation across accounts and operational entries',
    ],
    workflows: [
      'Reduce manual confusion in high-volume financial record environments',
      'Keep books organized for internal review, audits, and reporting checks',
      'Support finance teams handling multiple categories of controlled transactions',
    ],
    reports: [
      'Ledger summaries and exception-oriented finance visibility',
      'Expense reporting by branch, function, or cost center',
      'Structured reconciliation views for operational finance teams',
    ],
  },
  {
    slug: 'finance',
    title: 'Finance',
    eyebrow: 'Finance Services Accounting',
    heroTitle: 'Accounting support for lending, advisory, and financial service operations',
    description:
      'Track client billing, fee income, operating expenses, and reporting workflows across finance service businesses.',
    overview:
      'Finance firms often manage fee-based billing, service contracts, compliance-sensitive books, and detailed financial reporting. RoboBooks helps structure invoices, track receivables, monitor cost heads, and maintain cleaner books for firms that depend on timely data and trusted reporting.',
    accountingFocus: [
      'Track service fees, retainers, commissions, and collection cycles',
      'Maintain expense records for teams, partners, and administrative functions',
      'Keep customer books and financial documents organized for follow-up',
    ],
    workflows: [
      'Support recurring and milestone-based billing for advisory services',
      'Monitor cash flow around delayed collections and payroll-heavy months',
      'Maintain clean records for compliance reviews and management reporting',
    ],
    reports: [
      'Income and cost summaries by service line or client segment',
      'Receivable visibility across retainers, dues, and settlements',
      'Performance dashboards for founders and finance managers',
    ],
  },
  {
    slug: 'bpo',
    title: 'BPO',
    eyebrow: 'Outsourcing Accounting',
    heroTitle: 'Accounting workflows for BPO contracts, payroll pressure, and service billing',
    description:
      'Manage recurring contracts, payroll-led cost structures, client billing, and reporting for BPO operations.',
    overview:
      'BPO companies depend on recurring service contracts, high employee costs, vendor support, and strict client billing schedules. RoboBooks helps teams keep contract revenue, cost centers, collections, and monthly reporting under better control.',
    accountingFocus: [
      'Track service invoices, retainers, and client payment status efficiently',
      'Monitor payroll-heavy operating expenses and overhead cost centers',
      'Maintain customer books for active contracts and long-term accounts',
    ],
    workflows: [
      'Support monthly recurring billing for managed service contracts',
      'Watch receivables closely where working capital depends on timely collection',
      'Keep finance records aligned with operations and staffing-led expenses',
    ],
    reports: [
      'Client-wise revenue and collection performance summaries',
      'Cost visibility across teams, departments, and support functions',
      'Management reports for growth, margin, and cash flow planning',
    ],
  },
  {
    slug: 'furniture',
    title: 'Furniture',
    eyebrow: 'Product Accounting',
    heroTitle: 'Accounting support for furniture inventory, custom orders, and vendor purchases',
    description:
      'Track purchase costs, custom job billing, stock valuation, and customer receivables across furniture operations.',
    overview:
      'Furniture businesses often balance showroom inventory, made-to-order jobs, transport costs, and vendor-led procurement. RoboBooks helps maintain cleaner books around inventory, customer billing, and order-linked expenses so teams can monitor profitability more accurately.',
    accountingFocus: [
      'Track raw material or finished goods purchases and vendor dues',
      'Maintain inventory valuation across showroom and order-based stock',
      'Manage customer billing, advance payments, and delivery-linked collections',
    ],
    workflows: [
      'Support custom order invoicing and delivery-stage payment tracking',
      'Handle freight, assembly, and service charges within cleaner records',
      'Keep sales, stock, and procurement data aligned in one accounting flow',
    ],
    reports: [
      'Product and order-wise margin visibility',
      'Stock movement summaries for showroom and warehouse planning',
      'Receivable and vendor balance reports for finance control',
    ],
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    eyebrow: 'Property Accounting',
    heroTitle: 'Accounting workflows for projects, bookings, installments, and vendor cost tracking',
    description:
      'Manage property billing, installment schedules, contractor payments, and project-wise financial visibility.',
    overview:
      'Real estate businesses need disciplined accounting for booking advances, installment billing, project costs, contractor dues, and compliance-ready documentation. RoboBooks helps organize project-led books so finance teams can track inflows, outflows, and profitability with stronger clarity.',
    accountingFocus: [
      'Track booking amounts, installment schedules, and customer balances',
      'Manage contractor bills, project purchases, and site-related expenses',
      'Maintain project-wise ledgers and payment records in one structure',
    ],
    workflows: [
      'Support milestone invoicing and long-cycle customer collection tracking',
      'Monitor cash flow across project execution and contractor payouts',
      'Keep property-related records cleaner for review, audit, and reporting',
    ],
    reports: [
      'Project profitability and collection progress summaries',
      'Expense tracking by site, contractor, or project stage',
      'Management views for sales, cash planning, and commercial control',
    ],
  },
  {
    slug: 'healthcare',
    title: 'HealthCare',
    eyebrow: 'Healthcare Accounting',
    heroTitle: 'Accounting support for clinics, hospitals, billing desks, and medical operations',
    description:
      'Track patient billing, pharmacy sales, vendor expenses, and operational reporting across healthcare setups.',
    overview:
      'Healthcare organizations manage consultation billing, treatment charges, pharmacy sales, supplier purchases, and operational expenses at high frequency. RoboBooks helps structure accounting workflows so records remain clear, compliant, and easier to review across medical and administrative teams.',
    accountingFocus: [
      'Track patient invoices, service income, and pharmacy-related sales clearly',
      'Manage medical supplier bills, utility expenses, and recurring costs',
      'Maintain department or service-wise revenue and expense visibility',
    ],
    workflows: [
      'Support high-volume billing with cleaner records and due tracking',
      'Handle vendor and inventory-linked accounting for medical operations',
      'Keep books organized for management review and operational control',
    ],
    reports: [
      'Revenue summaries by department, service, or billing category',
      'Expense visibility across procurement, support, and facility operations',
      'Decision-ready views for finance and administration teams',
    ],
  },
  {
    slug: 'railways',
    title: 'Railways',
    eyebrow: 'Transport Accounting',
    heroTitle: 'Accounting workflows for transport operations, vendor costs, and service-linked revenue',
    description:
      'Organize operational expenses, maintenance costs, service revenue, and reporting control for railway-linked businesses.',
    overview:
      'Railway-related operations involve maintenance expenses, vendor contracts, route-linked services, and infrastructure-heavy cost structures. RoboBooks helps finance teams keep books orderly across operations, settlements, and expense monitoring where accountability and visibility matter.',
    accountingFocus: [
      'Track operational costs, maintenance expenses, and vendor settlements',
      'Maintain service billing and receivable tracking across contracts or routes',
      'Record asset-support and utility-related finance activity cleanly',
    ],
    workflows: [
      'Support accounting for service operations with recurring cost pressures',
      'Monitor contractor and supplier dues alongside operational billing',
      'Keep records aligned for reporting, review, and finance control',
    ],
    reports: [
      'Expense summaries by route, division, or operational unit',
      'Vendor payable and collection views for finance teams',
      'Structured management reporting for cost and service performance',
    ],
  },
  {
    slug: 'gems',
    title: 'Gems',
    eyebrow: 'Precious Goods Accounting',
    heroTitle: 'Accounting support for gemstone inventory, high-value purchases, and sales tracking',
    description:
      'Manage lot-wise inventory, purchase valuation, customer billing, and profitability for gem businesses.',
    overview:
      'Gem businesses deal with high-value inventory, procurement sensitivity, detailed stock records, and customer-specific sales. RoboBooks helps organize financial books around purchase lots, valuation, invoicing, and due tracking so teams can operate with stronger commercial clarity.',
    accountingFocus: [
      'Track high-value inventory purchases and supplier payment records carefully',
      'Maintain valuation and sales entries across lots or item groups',
      'Manage customer invoices, settlements, and outstanding balances clearly',
    ],
    workflows: [
      'Support inventory-linked billing with better stock and value visibility',
      'Monitor margins more closely where purchase cost impacts are significant',
      'Keep books structured for review, trust, and financial accountability',
    ],
    reports: [
      'Lot-wise purchase, sale, and profitability summaries',
      'Customer and supplier balance tracking for high-value transactions',
      'Inventory and margin visibility for owners and finance teams',
    ],
  },
  {
    slug: 'automobile',
    title: 'Automobile',
    eyebrow: 'Auto Business Accounting',
    heroTitle: 'Accounting workflows for vehicle sales, workshops, spare parts, and vendor bills',
    description:
      'Track vehicle billing, spare part inventory, service revenue, and workshop expenses from one accounting flow.',
    overview:
      'Automobile businesses often combine showroom sales, workshop service income, spare parts inventory, and vendor purchases. RoboBooks helps organize these parallel workflows inside one accounting system so finance and operations teams can monitor revenue, stock, and costs with better control.',
    accountingFocus: [
      'Track vehicle sales invoices, workshop billing, and part-wise inventory movement',
      'Manage vendor purchases for parts, consumables, and service operations',
      'Maintain customer histories, dues, and payment records across services',
    ],
    workflows: [
      'Support billing across sales, repairs, and maintenance contracts',
      'Monitor stock for spare parts while tracking workshop-related expenses',
      'Keep customer, inventory, and accounting records aligned in one workflow',
    ],
    reports: [
      'Revenue summaries by showroom, service, or product category',
      'Spare part stock and margin visibility for operations teams',
      'Expense and collection reports for business planning',
    ],
  },
  {
    slug: 'iot',
    title: 'IOT',
    eyebrow: 'Device Business Accounting',
    heroTitle: 'Accounting support for device sales, subscriptions, deployments, and service billing',
    description:
      'Handle hardware billing, recurring platform charges, project costs, and customer-ledgers in IoT businesses.',
    overview:
      'IoT companies frequently mix device sales, installation charges, annual subscriptions, and service contracts. RoboBooks helps keep hardware, services, renewals, and expenses financially connected so management can see both operational cost and recurring revenue more clearly.',
    accountingFocus: [
      'Track device invoices, installation charges, and recurring service income',
      'Manage procurement, support, and deployment-related operating expenses',
      'Maintain customer books for long-cycle service and renewal accounts',
    ],
    workflows: [
      'Support combined hardware and subscription billing structures',
      'Monitor collections around projects, renewals, and support agreements',
      'Keep service delivery and accounting records better aligned',
    ],
    reports: [
      'Revenue visibility across products, subscriptions, and deployments',
      'Expense tracking for support, procurement, and implementation teams',
      'Client-wise performance summaries for growth planning',
    ],
  },
  {
    slug: 'electrical',
    title: 'Electrical',
    eyebrow: 'Electrical Trade Accounting',
    heroTitle: 'Accounting workflows for electrical inventory, supply billing, and contractor purchases',
    description:
      'Track product purchases, contractor invoices, stock movement, and customer billing in electrical businesses.',
    overview:
      'Electrical businesses handle varied product inventories, contractor orders, vendor purchases, and service-linked billing. RoboBooks helps maintain product-wise stock visibility, sales records, and expense control so both trade counters and finance teams work from cleaner books.',
    accountingFocus: [
      'Track inventory purchases, supplier dues, and electrical product valuation',
      'Maintain customer invoices for trade supply and project-based billing',
      'Record transport, labour, and operating expenses clearly',
    ],
    workflows: [
      'Support stock-linked invoicing and reorder alerts for moving items',
      'Handle mixed billing across products, installations, and project supply',
      'Keep inventory and accounting data synced across operations',
    ],
    reports: [
      'Product-wise sales, stock, and gross margin summaries',
      'Vendor payable and customer collection visibility',
      'Business reports for counter sales and project fulfillment planning',
    ],
  },
  {
    slug: 'hardware',
    title: 'Hardware',
    eyebrow: 'Hardware Business Accounting',
    heroTitle: 'Accounting support for hardware inventory, purchases, and project-linked supply billing',
    description:
      'Manage stock-heavy purchases, contractor supply invoices, and margin visibility for hardware operations.',
    overview:
      'Hardware businesses often manage broad SKU ranges, contractor demand, supplier purchases, and fast-moving counter sales. RoboBooks helps structure stock-linked billing, purchase books, and payable or receivable tracking so the business can scale with stronger control.',
    accountingFocus: [
      'Track supplier purchases, stock valuation, and item movement accurately',
      'Maintain project, contractor, and walk-in billing records in one system',
      'Manage freight, overhead, and operating cost entries cleanly',
    ],
    workflows: [
      'Support daily billing with inventory updates attached to each sale',
      'Monitor reorder levels and item availability for fast-moving categories',
      'Keep procurement, sales, and finance records connected',
    ],
    reports: [
      'Item and category-wise sales and margin summaries',
      'Stock movement reports for purchasing and counter teams',
      'Outstanding views across customers, contractors, and suppliers',
    ],
  },
  {
    slug: 'saas',
    title: 'SaaS',
    eyebrow: 'Subscription Accounting',
    heroTitle: 'Accounting workflows for subscriptions, renewals, and software business reporting',
    description:
      'Track recurring subscriptions, annual contracts, customer collections, and operating costs in SaaS businesses.',
    overview:
      'SaaS companies depend on recurring revenue, renewals, usage-linked plans, and disciplined expense control. RoboBooks helps finance teams monitor subscriptions, customer books, burn-related spend, and growth reporting without losing visibility across contract cycles.',
    accountingFocus: [
      'Track recurring subscriptions, renewals, and customer payment status',
      'Manage software, payroll, marketing, and infrastructure expenses clearly',
      'Maintain account-wise billing records for long-term customer relationships',
    ],
    workflows: [
      'Support monthly and annual billing with reminder-led collection workflows',
      'Monitor cash flow in businesses driven by recurring revenue and overhead',
      'Keep finance, growth, and customer success teams aligned on account status',
    ],
    reports: [
      'Recurring revenue, renewal, and collection trend visibility',
      'Expense summaries across product, operations, and growth functions',
      'Business dashboards for founders and finance decision-makers',
    ],
  },
  {
    slug: 'restaurant',
    title: 'Restaurant',
    eyebrow: 'Food Service Accounting',
    heroTitle: 'Accounting support for table billing, kitchen costs, and daily restaurant operations',
    description:
      'Track food sales, vendor purchases, kitchen expenses, and outlet-level performance in restaurant businesses.',
    overview:
      'Restaurants handle daily billing, ingredient purchases, wastage-sensitive inventory, delivery income, and utility-heavy operating costs. RoboBooks helps bring these moving parts into one accounting workflow so owners can manage cash flow and profitability with better clarity.',
    accountingFocus: [
      'Track dine-in, takeaway, and delivery revenue in clean sales books',
      'Manage supplier bills for ingredients, packaging, and kitchen operations',
      'Maintain expense records for rent, salaries, utilities, and maintenance',
    ],
    workflows: [
      'Support high-volume daily billing and fast settlement visibility',
      'Keep purchase and stock records aligned for food cost monitoring',
      'Maintain cleaner books across outlets, vendors, and service channels',
    ],
    reports: [
      'Outlet or category-wise revenue and margin summaries',
      'Expense visibility across kitchen, staffing, and facilities',
      'Daily collection and performance views for owners and managers',
    ],
  },
  {
    slug: 'salon',
    title: 'Salon',
    eyebrow: 'Service Business Accounting',
    heroTitle: 'Accounting workflows for salon billing, service packages, and daily collections',
    description:
      'Manage service invoices, product sales, staff expenses, and appointment-linked revenue in salon businesses.',
    overview:
      'Salons combine service revenue, retail product sales, package bookings, and recurring operating costs. RoboBooks helps salon teams keep daily billing, customer dues, vendor purchases, and profitability reporting organized without heavy manual effort.',
    accountingFocus: [
      'Track service bills, package sales, and product revenue clearly',
      'Manage vendor purchases for supplies, tools, and retail products',
      'Maintain daily collection, expense, and team cost visibility',
    ],
    workflows: [
      'Support service billing and customer history within one clean record',
      'Monitor recurring expenses such as rent, payroll, and consumables',
      'Keep books simple and reliable for growing salon operations',
    ],
    reports: [
      'Service and product sales summaries by period',
      'Expense control reports for outlet operations',
      'Collection and performance dashboards for owners',
    ],
  },
  {
    slug: 'cloud-kitchen',
    title: 'Cloud Kitchen',
    eyebrow: 'Delivery Business Accounting',
    heroTitle: 'Accounting support for delivery-led kitchens, food costs, and platform settlements',
    description:
      'Track order revenue, ingredient expenses, platform payouts, and kitchen-level profitability in cloud kitchens.',
    overview:
      'Cloud kitchens operate through fast order cycles, delivery platform settlements, kitchen inventory, and promotional spend. RoboBooks helps structure billing, purchase books, and payout tracking so teams can manage profitability clearly across delivery-driven operations.',
    accountingFocus: [
      'Track order revenue, aggregator settlements, and direct sales collections',
      'Manage raw material purchases, packaging costs, and kitchen expenses',
      'Maintain outlet or brand-wise cost and income visibility',
    ],
    workflows: [
      'Support high-volume sales accounting with faster collection monitoring',
      'Keep ingredient purchases and consumption-linked records cleaner',
      'Handle multiple brands or kitchen units within one accounting flow',
    ],
    reports: [
      'Brand or kitchen-wise revenue and margin summaries',
      'Expense tracking across procurement, delivery, and operations',
      'Settlement and cash flow views for management planning',
    ],
  },
  {
    slug: 'pharma',
    title: 'Pharma',
    eyebrow: 'Pharmaceutical Accounting',
    heroTitle: 'Accounting workflows for medicine inventory, compliance-sensitive billing, and supplier control',
    description:
      'Track medicine purchases, stock movement, distributor billing, and compliance-ready records in pharma businesses.',
    overview:
      'Pharma businesses need accurate inventory records, purchase control, distributor billing, and careful documentation. RoboBooks helps maintain cleaner financial books across medicine procurement, sales, returns, and expense workflows so teams can work with stronger confidence and control.',
    accountingFocus: [
      'Track medicine purchases, supplier dues, and batch-sensitive stock value',
      'Maintain billing records for customers, dealers, or retail channels',
      'Record returns, adjustments, and operational expenses with better clarity',
    ],
    workflows: [
      'Support stock-linked invoicing and controlled inventory visibility',
      'Monitor distributor receivables and recurring vendor payment cycles',
      'Keep books cleaner for review, reporting, and process discipline',
    ],
    reports: [
      'Product and channel-wise sales and margin summaries',
      'Inventory and payable visibility for procurement planning',
      'Business reports for finance control and management review',
    ],
  },
  {
    slug: 'books',
    title: 'Books',
    eyebrow: 'Publishing Accounting',
    heroTitle: 'Accounting support for publishing, bookstore billing, and inventory-led revenue',
    description:
      'Manage title-wise inventory, distributor invoices, printing costs, and receivable tracking for book businesses.',
    overview:
      'Book businesses often manage printing costs, title inventory, distributor sales, returns, and institutional billing. RoboBooks helps keep publishing and retail accounting more organized by connecting stock records, customer books, and expense monitoring inside one flow.',
    accountingFocus: [
      'Track printing, procurement, and title-wise inventory valuation',
      'Manage distributor, retailer, and institutional billing records clearly',
      'Maintain customer balances, returns, and payment history with context',
    ],
    workflows: [
      'Support inventory-linked invoicing for books across multiple channels',
      'Handle returns and outstanding tracking with cleaner records',
      'Keep financial books aligned with publishing and sales operations',
    ],
    reports: [
      'Title and channel-wise sales or margin summaries',
      'Stock movement visibility across warehouse and distribution',
      'Receivable and cost reports for business planning',
    ],
  },
  {
    slug: 'education',
    title: 'Education',
    eyebrow: 'Education Accounting',
    heroTitle: 'Accounting workflows for fee billing, campus expenses, and student payment tracking',
    description:
      'Track tuition billing, transport or hostel charges, vendor expenses, and collection visibility in education setups.',
    overview:
      'Education institutions manage fee cycles, installment collections, transport or hostel charges, payroll, and vendor payments. RoboBooks helps finance teams keep student billing, operational expenses, and reporting organized across academic and administrative workflows.',
    accountingFocus: [
      'Track fee invoices, installment dues, and collection status accurately',
      'Manage vendor bills, campus expenses, and recurring operating costs',
      'Maintain books for transport, hostel, or service-linked income categories',
    ],
    workflows: [
      'Support recurring fee cycles and reminder-led payment follow-up',
      'Monitor cash flow across term-based collections and payroll expenses',
      'Keep student, vendor, and institutional records aligned for easier review',
    ],
    reports: [
      'Collection summaries by class, term, or fee category',
      'Expense visibility across administration, facilities, and transport',
      'Decision-ready reports for management and finance offices',
    ],
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    eyebrow: 'Logistics Accounting',
    heroTitle: 'Accounting support for freight billing, route expenses, and transport operations',
    description:
      'Track shipment revenue, fuel and trip costs, vendor payments, and receivables across logistics businesses.',
    overview:
      'Logistics businesses need close control over trip income, fuel spend, maintenance costs, contractor payments, and client billing. RoboBooks helps connect these operational flows to accounting so finance teams can monitor margins, dues, and expenses with stronger visibility.',
    accountingFocus: [
      'Track freight invoices, route income, and customer collection status',
      'Manage fuel, maintenance, toll, and contractor expense ledgers clearly',
      'Maintain customer and vendor books for ongoing transport relationships',
    ],
    workflows: [
      'Support trip-wise billing and cost monitoring within one accounting setup',
      'Monitor delayed collections and payout cycles that affect cash flow',
      'Keep dispatch, vendor, and finance records more tightly aligned',
    ],
    reports: [
      'Route, vehicle, or customer-wise profitability summaries',
      'Expense control reports for fuel, maintenance, and operations',
      'Collection and payable visibility for transport finance teams',
    ],
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    eyebrow: 'Advisory Accounting',
    heroTitle: 'Accounting workflows for consulting retainers, project billing, and client books',
    description:
      'Manage advisory invoices, retainers, project costs, and client-wise profitability in consulting businesses.',
    overview:
      'Consulting firms often work with retainers, milestone billing, team costs, and client-led delivery cycles. RoboBooks helps keep service invoices, customer records, operating expenses, and reporting structures organized so commercial and finance teams can stay aligned.',
    accountingFocus: [
      'Track retainer invoices, project fees, and client payment status clearly',
      'Manage payroll, travel, software, and admin expenses within clean books',
      'Maintain account-wise ledgers and business context for each client',
    ],
    workflows: [
      'Support recurring and milestone-based billing for consulting engagements',
      'Monitor receivables where working capital depends on client collections',
      'Keep finance records simpler across multiple active assignments',
    ],
    reports: [
      'Client and service-line profitability summaries',
      'Expense and cost visibility across teams and operations',
      'Business dashboards for founders, partners, and finance leads',
    ],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
