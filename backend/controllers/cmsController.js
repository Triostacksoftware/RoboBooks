import fs from "fs";
import multer from "multer";
import path from "path";
import CmsContent from "../models/CmsContent.js";

const cmsUploadsDir = path.join(process.cwd(), "uploads", "cms");
if (!fs.existsSync(cmsUploadsDir)) {
  fs.mkdirSync(cmsUploadsDir, { recursive: true });
}

const cmsImageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, cmsUploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `cms-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const cmsMediaUpload = multer({
  storage: cmsImageStorage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed for CMS uploads."));
    }
  },
  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 1,
  },
});

const CMS_DEFAULTS = {
  hero: {
    eyebrow: "Made for growing Indian businesses",
    titleLine1: "Best GST Accounting Software",
    titleLine2: "for Business in India",
    description:
      "Manage billing, GST, receivables and month-end accounting in one sharper, faster workflow built for modern teams.",
    features: [
      "Reconcile books faster with real-time GST entries",
      "Track receivables, expenses, and tax dues in one live dashboard",
      "Close monthly accounting with clean audit-ready reports",
    ],
    primaryButtonLabel: "Start Free Billing",
    primaryButtonUrl: "/register",
    secondaryButtonLabel: "Book Free Demo",
    secondaryButtonUrl: "/contact",
    slideIntervalMs: 3000,
    slides: [
      { imageUrl: "/images/homehero.png", alt: "Accounting software dashboard hero" },
      { imageUrl: "/images/dashboard.png", alt: "RoboBooks dashboard overview" },
      { imageUrl: "/images/usability.png", alt: "RoboBooks usability showcase" },
      { imageUrl: "/images/your-illustration.png", alt: "RoboBooks platform illustration" },
      { imageUrl: "/images/businessbenifits.png", alt: "RoboBooks business benefits" },
    ],
  },
  about: {
    eyebrow: "About RoboBooks",
    title: "Accounting Software That Keeps Every Number in Sync",
    description:
      "RoboBooks is an accounting SaaS platform built for businesses that want faster bookkeeping, cleaner compliance, and complete control over cash flow. From invoices to tax-ready reports, every workflow stays connected in one simple dashboard.",
    highlights: [
      "Automated invoicing, recurring billing, and payment reminders",
      "GST-ready reports, expense tracking, and bank reconciliation",
      "Inventory, payroll, and financial dashboards in one workspace",
      "Role-based access and cloud security for growing teams",
    ],
    primaryButtonLabel: "About RoboBooks",
    primaryButtonUrl: "/about",
    trustedLabel: "Trusted for",
    trustedText: "billing, books, tax, and team operations",
    mission: {
      eyebrow: "Our Mission",
      title: "Build accounting software that keeps business teams in control",
      description:
        "RoboBooks exists to simplify the daily finance work that slows companies down. We bring invoicing, bookkeeping, reporting, and compliance into one experience so business owners and teams can act from clean numbers instead of scattered tools.",
      highlights: [
        "Make accounting accessible for small and growing businesses",
        "Reduce repetitive finance admin with guided automation",
        "Keep compliance, reporting, and books connected in one system",
        "Design finance software that teams actually enjoy using",
      ],
    },
    values: {
      eyebrow: "Our Values",
      title: "Principles that shape every product decision",
      description:
        "The RoboBooks team is driven by product clarity, customer trust, and a strong belief that finance software can be both powerful and easy to use.",
      items: [
        {
          title: "Innovation with purpose",
          description:
            "We build features that solve real finance bottlenecks, not just flashy product ideas.",
        },
        {
          title: "Simple by design",
          description:
            "Even complex accounting flows should feel clear, guided, and easy to act on.",
        },
        {
          title: "Security first",
          description:
            "Customer trust depends on strong data protection, role controls, and reliable infrastructure.",
        },
        {
          title: "Operational reliability",
          description:
            "Businesses depend on us for everyday finance work, so stability matters in every release.",
        },
        {
          title: "Customer empathy",
          description:
            "We listen closely to teams using RoboBooks and shape the product around their real workflows.",
        },
        {
          title: "Execution excellence",
          description:
            "We value clarity, speed, and quality in the way we build and support the platform.",
        },
      ],
    },
    stats: {
      eyebrow: "Our Impact",
      title: "Numbers that reflect product trust and business adoption",
      description:
        "These metrics represent more than scale. They show how many teams rely on RoboBooks to manage billing, books, compliance workflows, and finance visibility every single day.",
      items: [
        {
          number: "10,000+",
          label: "Businesses served",
          description:
            "Teams trust RoboBooks for daily accounting workflows and reporting clarity.",
        },
        {
          number: "Rs. 500Cr+",
          label: "Transactions handled",
          description:
            "A growing volume of business activity moves through the product with confidence.",
        },
        {
          number: "99.9%",
          label: "Platform uptime",
          description:
            "Reliability matters when businesses depend on finance software every day.",
        },
        {
          number: "50+",
          label: "Team members",
          description:
            "Product, engineering, support, and operations work together to improve the platform.",
        },
      ],
    },
    timeline: {
      eyebrow: "Our Journey",
      title: "How RoboBooks has grown into a finance-first SaaS platform",
      description:
        "A cleaner look at the milestones that shaped our product, our team, and the businesses we support today.",
      items: [
        {
          year: "2020",
          title: "RoboBooks was founded",
          description:
            "We started with one goal: make accounting easier for modern Indian businesses.",
          achievement: "Early finance workflow prototype launched",
        },
        {
          year: "2021",
          title: "First customer growth milestone",
          description:
            "The product began gaining traction with businesses looking for simpler GST-ready workflows.",
          achievement: "Reached first 1,000 users",
        },
        {
          year: "2022",
          title: "Platform expansion",
          description:
            "We expanded the product into a more complete accounting workspace for daily business operations.",
          achievement: "More reporting and bookkeeping depth added",
        },
        {
          year: "2023",
          title: "Operational scale",
          description:
            "More businesses adopted RoboBooks for day-to-day billing, bookkeeping, and visibility needs.",
          achievement: "Crossed 10,000+ customers",
        },
        {
          year: "2024",
          title: "Automation focus",
          description:
            "We introduced smarter workflows to help teams spend less time on repetitive accounting work.",
          achievement: "Handled Rs. 500Cr+ in transactions",
        },
        {
          year: "2025",
          title: "Looking ahead",
          description:
            "Our roadmap stays focused on giving businesses a faster and more connected finance experience.",
          achievement: "Investing in product quality and scale",
        },
      ],
    },
  },
  logo: {
    logoUrl: "/images/logo.png",
    altText: "RoboBooks logo",
  },
  footer: {
    brandDescription:
      "RoboBooks is an accounting SaaS platform for invoicing, bookkeeping, GST workflows, reporting, and operational finance control.",
    productTitle: "Product",
    companyTitle: "Company",
    legalTitle: "Legal",
    productLinks: [
      { label: "About RoboBooks", href: "/footer/about-robobooks" },
      { label: "Book a demo", href: "/footer/book-a-demo" },
      { label: "Start free trial", href: "/footer/start-free-trial" },
      { label: "GSTR Filing", href: "/footer/gstr-filing" },
      { label: "E-Invoicing", href: "/footer/e-invoicing" },
      { label: "Delivery Challan", href: "/footer/delivery-challan" },
      { label: "Data Export to Sale", href: "/footer/data-export-to-sale" },
      { label: "Bank Reconciliation", href: "/footer/bank-reconciliation" },
      { label: "Import Export of Data", href: "/footer/import-export-of-data" },
      { label: "Multiple Financial Reporting", href: "/footer/multiple-financial-reporting" },
    ],
    companyLinks: [
      { label: "Company", href: "/footer/company" },
      { label: "Contact", href: "/footer/contact" },
      { label: "FAQ", href: "/footer/faq" },
    ],
    legalLinks: [
      { label: "Terms", href: "/footer/terms" },
      { label: "Privacy", href: "/footer/privacy" },
      { label: "Cookies", href: "/footer/cookies" },
    ],
    extraGroups: [],
    copyrightText: "RoboBooks. All rights reserved.",
    bottomText: "Built for modern accounting workflows and growing businesses.",
  },
  invoiceThemes: {
    eyebrow: "Invoice Themes",
    title: "Your bill, your brand and more with RoboBooks",
    description:
      "Fully customizable GST and non-GST invoices with multiple invoice print options. Personalize every RoboBooks invoice so it reflects your brand clearly across thermal, A4, and A5 formats.",
    infoCards: [
      {
        title: "Print-ready",
        body: "Designed to feel like real client-facing invoices, not placeholder mockups.",
      },
      {
        title: "GST-ready",
        body: "Important fields, totals, and tax summaries stay visible and believable.",
      },
    ],
    tabLabels: ["Thermal Prints", "A4 Prints", "A5 Prints"],
    showcaseTitle: "Special Themes",
    showcaseBadge: "Real invoice layouts",
    showcaseCtaLabel: "Start Using Templates",
    showcaseCtaUrl: "/register",
    thermalImages: [
      { imageUrl: "", alt: "Thermal print preview 2 inch", widthLabel: "2 inch" },
      { imageUrl: "", alt: "Thermal print preview 3 inch", widthLabel: "3 inch" },
    ],
    a4Images: [
      { imageUrl: "", alt: "A4 invoice preview 1" },
      { imageUrl: "", alt: "A4 invoice preview 2" },
      { imageUrl: "", alt: "A4 invoice preview 3" },
    ],
    a5Images: [
      { imageUrl: "", alt: "A5 invoice preview 1" },
      { imageUrl: "", alt: "A5 invoice preview 2" },
    ],
  },
  services: {
    pageEyebrow: "Services",
    pageTitle: "Accounting modules that feel connected across every business workflow",
    pageDescription:
      "From GST invoicing to books, reporting, reconciliations, and operational finance visibility, RoboBooks is designed to help teams move faster with less friction.",
    pagePrimaryButtonLabel: "Start free trial",
    pagePrimaryButtonUrl: "/register",
    pageSecondaryButtonLabel: "Schedule demo",
    pageSecondaryButtonUrl: "/contact",
    pageStats: [
      { value: "6+", label: "Core modules" },
      { value: "500+", label: "Active teams" },
      { value: "99.9%", label: "Reliability" },
      { value: "24/7", label: "Support" },
    ],
    eyebrow: "Core Services",
    title: "One accounting workspace for every daily finance workflow",
    highlightTitle: "Built for accounting-heavy teams",
    highlightDescription:
      "RoboBooks combines billing, bookkeeping, tax preparation, and finance visibility in a single cloud system.",
    highlightIconUrl: "",
    cards: [
      {
        slug: "smart-invoicing",
        title: "Smart Invoicing",
        description:
          "Create branded GST invoices, schedule recurring bills, and send automated payment reminders while keeping every invoice professionally organized.",
        ctaLabel: "Available in RoboBooks",
        iconUrl: "",
      },
      {
        slug: "cash-flow-tracking",
        title: "Cash Flow Tracking",
        description:
          "Monitor receivables, payouts, and payment cycles from one live financial command center that helps you plan daily cash positions confidently.",
        ctaLabel: "Available in RoboBooks",
        iconUrl: "",
      },
      {
        slug: "inventory-control",
        title: "Inventory Control",
        description:
          "Track stock movement, reorder levels, valuation, and invoice-linked inventory updates in real time to avoid shortages and overstock.",
        ctaLabel: "Available in RoboBooks",
        iconUrl: "",
      },
      {
        slug: "customer-vendor-books",
        title: "Customer & Vendor Books",
        description:
          "Keep ledgers, payment history, tax details, and outstanding balances organized for every customer and vendor relationship.",
        ctaLabel: "Available in RoboBooks",
        iconUrl: "",
      },
      {
        slug: "gst-compliance",
        title: "GST & Compliance",
        description:
          "Generate tax-ready reports, reconcile entries, and stay prepared for GST filing with less manual effort and fewer missed details.",
        ctaLabel: "Available in RoboBooks",
        iconUrl: "",
      },
      {
        slug: "decision-dashboards",
        title: "Decision Dashboards",
        description:
          "Turn accounting activity into clear trends, margin snapshots, and business performance insights your team can use for faster decisions.",
        ctaLabel: "Available in RoboBooks",
        iconUrl: "",
      },
    ],
    ctaEyebrow: "Scale Faster",
    ctaTitle: "Replace scattered tools with one finance-ready SaaS stack",
    ctaDescription:
      "Move from spreadsheets and disconnected software to a guided accounting workflow that saves time every week.",
    primaryButtonLabel: "Start free trial",
    primaryButtonUrl: "/register",
    secondaryButtonLabel: "Book a demo",
    secondaryButtonUrl: "/contact",
  },
  industries: {
    eyebrow: "Industries on RoboBooks",
    title: "Industries we Serve",
    description:
      "RoboBooks supports billing, bookkeeping, GST workflows, and reporting across multiple industries with one connected accounting platform.",
    items: [
      { slug: "hotel", title: "Hotel", span: "xl:col-span-1", iconUrl: "" },
      { slug: "export-import", title: "Export-Import", span: "xl:col-span-2", iconUrl: "" },
      { slug: "recycling", title: "Recycling", span: "xl:col-span-1", iconUrl: "" },
      { slug: "telecom", title: "Telecom", span: "xl:col-span-2", iconUrl: "" },
      { slug: "it-sector", title: "IT Sector", span: "xl:col-span-1", iconUrl: "" },
      { slug: "beverages", title: "Beverages", span: "xl:col-span-3", iconUrl: "" },
      { slug: "oil-gas", title: "Oil & Gas", span: "xl:col-span-1", iconUrl: "" },
      { slug: "apparels", title: "Apparels", span: "xl:col-span-2", iconUrl: "" },
      { slug: "entertainment", title: "Entertainment", span: "xl:col-span-1", iconUrl: "" },
      { slug: "manufacturing", title: "Manufacturing", span: "xl:col-span-3", iconUrl: "" },
      { slug: "retail", title: "Retail", span: "xl:col-span-1", iconUrl: "" },
      { slug: "banks", title: "Banks", span: "xl:col-span-2", iconUrl: "" },
      { slug: "finance", title: "Finance", span: "xl:col-span-1", iconUrl: "" },
      { slug: "bpo", title: "BPO", span: "xl:col-span-2", iconUrl: "" },
      { slug: "furniture", title: "Furniture", span: "xl:col-span-1", iconUrl: "" },
      { slug: "real-estate", title: "Real Estate", span: "xl:col-span-2", iconUrl: "" },
      { slug: "healthcare", title: "HealthCare", span: "xl:col-span-1", iconUrl: "" },
      { slug: "railways", title: "Railways", span: "xl:col-span-2", iconUrl: "" },
      { slug: "gems", title: "Gems", span: "xl:col-span-1", iconUrl: "" },
      { slug: "automobile", title: "Automobile", span: "xl:col-span-2", iconUrl: "" },
      { slug: "iot", title: "IOT", span: "xl:col-span-1", iconUrl: "" },
      { slug: "electrical", title: "Electrical", span: "xl:col-span-2", iconUrl: "" },
      { slug: "hardware", title: "Hardware", span: "xl:col-span-1", iconUrl: "" },
      { slug: "saas", title: "SaaS", span: "xl:col-span-2", iconUrl: "" },
      { slug: "restaurant", title: "Restaurant", span: "xl:col-span-1", iconUrl: "" },
      { slug: "salon", title: "Salon", span: "xl:col-span-1", iconUrl: "" },
      { slug: "cloud-kitchen", title: "Cloud Kitchen", span: "xl:col-span-2", iconUrl: "" },
      { slug: "pharma", title: "Pharma", span: "xl:col-span-1", iconUrl: "" },
      { slug: "books", title: "Books", span: "xl:col-span-2", iconUrl: "" },
      { slug: "education", title: "Education", span: "xl:col-span-2", iconUrl: "" },
      { slug: "logistics", title: "Logistics", span: "xl:col-span-2", iconUrl: "" },
      { slug: "consulting", title: "Consulting", span: "xl:col-span-1", iconUrl: "" },
    ],
  },
  gstCompliance: {
    eyebrow: "GST Compliance",
    title: "Experience effortless GST compliance with RoboBooks invoicing software",
    exploreLabel: "Explore GST tools",
    tools: [
      {
        key: "gstr",
        slug: "gstr-filing",
        label: "GSTR Filing",
        badge: "Export Data",
        description:
          "Export your GSTR1 data in a simple format and help your team or CA complete GST filing faster with clean invoice summaries.",
        iconUrl: "",
        previewImageUrl: "",
      },
      {
        key: "einvoice",
        slug: "e-invoicing",
        label: "E-Invoicing",
        badge: "Auto Sync",
        description:
          "Generate invoice data with the right business fields so e-invoice workflows stay cleaner, faster, and easier to validate.",
        iconUrl: "",
        previewImageUrl: "",
      },
      {
        key: "eway",
        slug: "delivery-challan",
        label: "Delivery Challan",
        badge: "Dispatch Ready",
        description:
          "Prepare bill details, customer data, and shipment records in one place before sharing or exporting transport-related documents.",
        iconUrl: "",
        previewImageUrl: "",
      },
      {
        key: "tally",
        slug: "data-export-to-sale",
        label: "Data Export to Sale",
        badge: "Sales Sync",
        description:
          "Move structured sales and tax records from RoboBooks to your accounting workflows with less manual re-entry.",
        iconUrl: "",
        previewImageUrl: "",
      },
      {
        key: "bank",
        slug: "bank-reconciliation",
        label: "Bank Reconciliation",
        badge: "Auto Match",
        description:
          "Match bank entries, track pending transactions, and keep your books aligned with real account activity using a cleaner reconciliation workflow.",
        iconUrl: "",
        previewImageUrl: "",
      },
      {
        key: "data",
        slug: "import-export-of-data",
        label: "Import Export of Data",
        badge: "Data Sync",
        description:
          "Move invoices, books, ledgers, and structured reports between RoboBooks and your external accounting workflows with less manual effort.",
        iconUrl: "",
        previewImageUrl: "",
      },
      {
        key: "reporting",
        slug: "multiple-financial-reporting",
        label: "Multiple Financial Reporting",
        badge: "Insight Ready",
        description:
          "Generate multiple financial reports from one dashboard, compare business metrics, and share cleaner summaries with your team or accountant.",
        iconUrl: "",
        previewImageUrl: "",
      },
    ],
  },
  features: {
    pageEyebrow: "Features",
    pageTitle: "Product features that make finance work cleaner, faster, and easier to trust",
    pageDescription:
      "RoboBooks brings billing, bookkeeping, reconciliation, analytics, and collaboration into one interface so finance work feels connected instead of fragmented.",
    pagePrimaryButtonLabel: "Explore features",
    pagePrimaryButtonUrl: "#feature-grid",
    pageSecondaryButtonLabel: "Book a walkthrough",
    pageSecondaryButtonUrl: "/contact",
    pageStats: [
      { value: "8+", label: "Core capabilities" },
      { value: "1", label: "Unified workspace" },
      { value: "100%", label: "Cloud access" },
      { value: "24/7", label: "Support" },
    ],
    eyebrow: "Product Features",
    title: "Purpose-built features for modern accounting operations",
    description:
      "Every feature is designed to reduce finance admin, improve accuracy, and help teams move from transaction entry to business insight.",
    ctaLabel: "Explore RoboBooks",
    ctaUrl: "/register",
    cards: [
      {
        slug: "customer-accounts",
        title: "Customer Accounts",
        description:
          "Maintain customer ledgers, credits, dues, and GST details with complete visibility.",
        iconUrl: "",
        detailEyebrow: "Receivables Control",
        detailTitle: "Customer accounts that keep every ledger conversation clear",
        detailDescription:
          "Track balances, pending dues, credits, GST details, and customer-wise history from one place so collections stay proactive instead of reactive.",
        detailHeroNote:
          "Ideal for businesses that want stronger follow-ups without losing ledger accuracy.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "View due balances, credits, and ledger movement account by account.",
          "Keep GST-linked billing context visible during customer reviews.",
          "Support faster collections with cleaner account-wise visibility.",
        ],
        detailStats: [
          { value: "360", label: "Customer ledger view" },
          { value: "Live", label: "Outstanding tracking" },
          { value: "GST", label: "Context ready" },
        ],
        detailSections: [
          {
            title: "Daily follow-up becomes easier",
            description:
              "Instead of checking multiple screens, teams can review customer position, invoices, credits, and open balances in one place before calling or sharing statements.",
          },
          {
            title: "Cleaner control over dues",
            description:
              "A structured account view helps you identify aging balances early, reduce follow-up delays, and handle disputes with better transaction context.",
          },
          {
            title: "Built for growing customer bases",
            description:
              "As the number of active accounts grows, centralized ledgers help sales and finance stay aligned without spreadsheet dependency.",
          },
        ],
      },
      {
        slug: "bank-reconciliation",
        title: "Bank Reconciliation",
        description:
          "Match bank activity against books faster and reduce month-end closing effort.",
        iconUrl: "",
        detailEyebrow: "Banking Accuracy",
        detailTitle: "Bank reconciliation without month-end chaos",
        detailDescription:
          "Compare bank activity with book entries in a more structured way so unmatched transactions are easier to identify, review, and close on time.",
        detailHeroNote:
          "Useful for teams that want cleaner monthly close and fewer surprise mismatches.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Review bank entries against recorded transactions with better control.",
          "Spot missing, duplicate, or delayed postings before closing week.",
          "Reduce manual reconciliation pressure during month-end reviews.",
        ],
        detailStats: [
          { value: "Fewer", label: "Mismatch surprises" },
          { value: "Faster", label: "Monthly close" },
          { value: "Better", label: "Audit confidence" },
        ],
        detailSections: [
          {
            title: "See exceptions sooner",
            description:
              "When bank activity and books are reviewed together, teams can catch missing entries and unexplained differences before they turn into reporting delays.",
          },
          {
            title: "Improve close discipline",
            description:
              "A consistent reconciliation process keeps finance work predictable and reduces last-minute effort during month-end and audit preparation.",
          },
          {
            title: "Better confidence in numbers",
            description:
              "Matched records make cash visibility stronger and help leaders trust the accuracy of reported balances.",
          },
        ],
      },
      {
        slug: "purchase-workflows",
        title: "Purchase Workflows",
        description:
          "Handle purchase orders, bills, and vendor liabilities from one connected process.",
        iconUrl: "",
        detailEyebrow: "Procurement Flow",
        detailTitle: "Purchase workflows that stay connected from order to payable",
        detailDescription:
          "Manage purchasing steps with better continuity so vendor commitments, bills, and liabilities remain easier to monitor and approve.",
        detailHeroNote:
          "Designed for teams that want tighter purchasing discipline and cleaner payable visibility.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Connect purchase activity from request to bill recording.",
          "Track vendor commitments and liabilities with less manual chasing.",
          "Support approval-oriented workflows without breaking accounting context.",
        ],
        detailStats: [
          { value: "End-to-end", label: "Purchase visibility" },
          { value: "Clearer", label: "Vendor tracking" },
          { value: "Lower", label: "Approval friction" },
        ],
        detailSections: [
          {
            title: "Less fragmentation across teams",
            description:
              "Operations, procurement, and accounts can work from a more connected flow instead of relying on scattered notes and delayed handoffs.",
          },
          {
            title: "Payables stay easier to manage",
            description:
              "When bills are tied back to purchase activity, finance teams gain better clarity over obligations and upcoming cash commitments.",
          },
          {
            title: "A stronger control layer",
            description:
              "Structured workflows help businesses reduce duplicate entries, missed bills, and loosely tracked vendor approvals.",
          },
        ],
      },
      {
        slug: "recurring-billing",
        title: "Recurring Billing",
        description:
          "Automate subscription invoices, due date alerts, and consistent payment collection.",
        iconUrl: "",
        detailEyebrow: "Revenue Continuity",
        detailTitle: "Recurring billing that keeps repeat revenue disciplined",
        detailDescription:
          "Handle repeat invoicing cycles with more consistency so billing dates, reminders, and collections feel controlled instead of manual.",
        detailHeroNote:
          "A strong fit for service businesses, retainers, subscriptions, and periodic contracts.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Create more predictable repeat invoicing cycles.",
          "Reduce missed billing dates and delayed reminder follow-ups.",
          "Support steadier collections across recurring customer accounts.",
        ],
        detailStats: [
          { value: "Consistent", label: "Billing cycles" },
          { value: "Lower", label: "Missed reminders" },
          { value: "Steadier", label: "Cash collection" },
        ],
        detailSections: [
          {
            title: "Less manual billing work",
            description:
              "Finance teams no longer need to rebuild the same invoice schedules repeatedly, which saves time and lowers the risk of missed cycles.",
          },
          {
            title: "Customers get a smoother experience",
            description:
              "Regular billing and timely reminders create more predictable communication and reduce avoidable confusion around due dates.",
          },
          {
            title: "Repeat revenue stays visible",
            description:
              "Teams can monitor recurring receivables more clearly and act faster on delayed payments before they compound.",
          },
        ],
      },
      {
        slug: "tax-ready-reports",
        title: "Tax-Ready Reports",
        description:
          "Export clean summaries for GST, audits, and internal reviews without manual cleanup.",
        iconUrl: "",
        detailEyebrow: "Compliance Readiness",
        detailTitle: "Tax-ready reports that reduce last-minute cleanup",
        detailDescription:
          "Generate cleaner financial and tax-related summaries so GST filing, audits, and management reviews can move with better confidence and less manual rework.",
        detailHeroNote:
          "Especially valuable for teams handling regular compliance deadlines and audit requests.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Prepare cleaner GST and audit-facing summaries faster.",
          "Reduce spreadsheet cleanup before review or filing cycles.",
          "Support internal reviews with more reliable reporting structure.",
        ],
        detailStats: [
          { value: "Audit", label: "Ready summaries" },
          { value: "Faster", label: "Review cycles" },
          { value: "Less", label: "Manual cleanup" },
        ],
        detailSections: [
          {
            title: "Compliance gets easier to prepare",
            description:
              "When reports are already structured, finance teams can focus on validation and submission instead of scrambling to clean raw numbers.",
          },
          {
            title: "Internal stakeholders get better visibility",
            description:
              "Leaders and reviewers receive clearer summaries that are easier to interpret, compare, and act on during business reviews.",
          },
          {
            title: "Useful beyond filing season",
            description:
              "Tax-ready reporting also helps monthly control, exception review, and audit readiness throughout the year.",
          },
        ],
      },
      {
        slug: "inventory-linking",
        title: "Inventory Linking",
        description:
          "Connect stock movement directly to sales and purchase entries to avoid blind spots.",
        iconUrl: "",
        detailEyebrow: "Stock Connected Finance",
        detailTitle: "Inventory linking that keeps stock and books aligned",
        detailDescription:
          "Bring inventory movement closer to accounting activity so purchases, sales, and stock visibility stay more synchronized across the business.",
        detailHeroNote:
          "Helpful for businesses where stock accuracy directly affects margins and cash planning.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Connect stock movement with sales and purchase records.",
          "Reduce blind spots between operations and finance teams.",
          "Support clearer margin understanding with better stock context.",
        ],
        detailStats: [
          { value: "Connected", label: "Stock visibility" },
          { value: "Better", label: "Margin clarity" },
          { value: "Fewer", label: "Operational blind spots" },
        ],
        detailSections: [
          {
            title: "Stock impact becomes clearer",
            description:
              "When inventory movement is reflected alongside accounting entries, businesses get a more reliable view of what is moving, what is pending, and what needs attention.",
          },
          {
            title: "Finance and operations stay aligned",
            description:
              "Shared visibility reduces friction between teams and helps prevent misunderstandings around stock, purchases, and sales timing.",
          },
          {
            title: "Supports stronger planning",
            description:
              "Cleaner stock-linked records make replenishment, pricing review, and margin tracking easier for growing businesses.",
          },
        ],
      },
      {
        slug: "growth-analytics",
        title: "Growth Analytics",
        description:
          "Understand margins, revenue trends, and business health with executive-friendly dashboards.",
        iconUrl: "",
        detailEyebrow: "Decision Insight",
        detailTitle: "Growth analytics that turns finance data into action",
        detailDescription:
          "See revenue movement, margin patterns, and business performance signals in a format leaders can understand quickly and use with confidence.",
        detailHeroNote:
          "Built for owners and finance teams who want faster decisions from cleaner reporting.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Track business health with clearer trend visibility.",
          "Review margins and revenue movement in a leadership-friendly way.",
          "Support faster decisions with connected finance insight.",
        ],
        detailStats: [
          { value: "Sharper", label: "Trend visibility" },
          { value: "Better", label: "Margin insight" },
          { value: "Faster", label: "Decision support" },
        ],
        detailSections: [
          {
            title: "From data to direction",
            description:
              "Instead of manually stitching numbers together, teams can review patterns and discuss actions from a more decision-ready view of the business.",
          },
          {
            title: "Leadership conversations improve",
            description:
              "Executive-friendly summaries help owners and managers understand current performance without needing to decode raw accounting detail first.",
          },
          {
            title: "Useful for regular planning",
            description:
              "Growth analytics supports monthly reviews, revenue planning, and early identification of pressure points before they become larger issues.",
          },
        ],
      },
      {
        slug: "bookkeeping-history",
        title: "Bookkeeping History",
        description:
          "Track every adjustment, approval, and transaction with structured accounting records.",
        iconUrl: "",
        detailEyebrow: "Accounting Trail",
        detailTitle: "Bookkeeping history that protects clarity and control",
        detailDescription:
          "Maintain a more dependable transaction trail so adjustments, approvals, and edits can be reviewed with context when questions arise.",
        detailHeroNote:
          "Important for teams that care about review discipline, accountability, and audit confidence.",
        detailCtaLabel: "Request a demo",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Keep a clearer history of changes and transaction movement.",
          "Improve accountability across accounting reviews and approvals.",
          "Support audits and internal checks with stronger record traceability.",
        ],
        detailStats: [
          { value: "Stronger", label: "Traceability" },
          { value: "Higher", label: "Review confidence" },
          { value: "Cleaner", label: "Audit trail" },
        ],
        detailSections: [
          {
            title: "Questions are easier to answer",
            description:
              "A clearer history helps teams quickly understand what changed, why it changed, and who needs to review the impact.",
          },
          {
            title: "Supports internal control",
            description:
              "Structured records make approval checks, adjustment review, and exception handling more consistent across the finance team.",
          },
          {
            title: "Audit readiness improves",
            description:
              "When transaction history is traceable, auditors and internal reviewers can work faster with stronger confidence in the bookkeeping process.",
          },
        ],
      },
    ],
  },
  usability: {
    eyebrow: "Product Experience",
    title: "Made to feel simple even when accounting gets complex",
    description:
      "RoboBooks follows the same design tone as the hero and about sections: focused, professional, and easy to act on. The interface is built to reduce confusion and speed up daily finance work.",
    cards: [
      {
        slug: "clean-navigation",
        title: "Clean navigation",
        description:
          "Important accounting actions stay visible so your team can move without hunting through menus.",
        iconUrl: "",
        detailEyebrow: "Navigation Clarity",
        detailTitle: "Clean navigation that keeps finance actions easy to find",
        detailDescription:
          "The product keeps common accounting actions visible and grouped logically so teams can work faster without menu hunting.",
        detailHeroNote:
          "Useful for businesses that want onboarding to feel lighter and daily execution to feel more direct.",
        detailCtaLabel: "Talk to our team",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Important actions stay close to where accounting work happens.",
          "Teams spend less time searching and more time completing tasks.",
          "Navigation reduces friction for both new and experienced users.",
        ],
        detailStats: [
          { value: "Faster", label: "Task discovery" },
          { value: "Lower", label: "Training friction" },
          { value: "Clearer", label: "User flow" },
        ],
        detailSections: [
          {
            title: "Designed for frequent actions",
            description:
              "The layout surfaces the actions finance teams use most often so repetitive work does not get buried inside deep menus.",
          },
          {
            title: "Better onboarding for new users",
            description:
              "New team members can understand where to go next without memorizing a complex product structure first.",
          },
          {
            title: "More confidence during daily work",
            description:
              "A clearer navigation system helps users move through invoicing, books, and reports with less hesitation.",
          },
        ],
      },
      {
        slug: "faster-setup",
        title: "Faster setup",
        description:
          "Onboard your company, taxes, books, and billing structure quickly with guided workflows.",
        iconUrl: "",
        detailEyebrow: "Setup Experience",
        detailTitle: "Faster setup so teams can reach live workflows sooner",
        detailDescription:
          "RoboBooks helps businesses configure company details, taxes, billing, and books through a more guided setup experience.",
        detailHeroNote:
          "A strong fit for teams that want less implementation drag and a quicker path to productive use.",
        detailCtaLabel: "Book onboarding help",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Guided setup reduces the chance of missing critical configuration.",
          "Teams can move from account creation to daily use faster.",
          "The onboarding flow is easier to follow across finance basics.",
        ],
        detailStats: [
          { value: "Quicker", label: "Go-live" },
          { value: "Cleaner", label: "Configuration" },
          { value: "Less", label: "Setup confusion" },
        ],
        detailSections: [
          {
            title: "Structured first steps",
            description:
              "The setup process introduces the right business basics in a practical order so the product feels easier to adopt.",
          },
          {
            title: "Reduces avoidable delays",
            description:
              "Teams spend less time figuring out initial configuration and more time moving into billing and bookkeeping workflows.",
          },
          {
            title: "Helpful for growing businesses",
            description:
              "When setup is simpler, teams can standardize their finance process earlier and with more confidence.",
          },
        ],
      },
      {
        slug: "work-from-anywhere",
        title: "Work from anywhere",
        description:
          "Use RoboBooks across devices to review approvals, collections, and reports on the move.",
        iconUrl: "",
        detailEyebrow: "Anywhere Access",
        detailTitle: "Work from anywhere without losing finance visibility",
        detailDescription:
          "RoboBooks keeps approvals, collections, and reporting accessible across devices so teams can stay responsive even when away from the desk.",
        detailHeroNote:
          "Especially useful for owners, managers, and distributed teams who need live visibility while moving between locations.",
        detailCtaLabel: "See it in action",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Approvals and reviews stay accessible outside the office.",
          "Leaders can check collections and reports from multiple devices.",
          "The product supports more flexible operating setups.",
        ],
        detailStats: [
          { value: "Live", label: "Remote visibility" },
          { value: "Flexible", label: "Access model" },
          { value: "Faster", label: "Decision response" },
        ],
        detailSections: [
          {
            title: "Useful beyond the office",
            description:
              "Finance work no longer depends on being seated at one machine when decisions, approvals, or follow-ups need attention.",
          },
          {
            title: "Keeps leadership closer to operations",
            description:
              "Owners and managers can stay aware of collections, reports, and bottlenecks without waiting for manual updates.",
          },
          {
            title: "Supports distributed execution",
            description:
              "Teams working across branches, warehouses, or remote environments can stay aligned inside the same system.",
          },
        ],
      },
      {
        slug: "less-repetitive-work",
        title: "Less repetitive work",
        description:
          "Automate common accounting steps like reminders, categorization, and recurring invoice creation.",
        iconUrl: "",
        detailEyebrow: "Workflow Efficiency",
        detailTitle: "Less repetitive work for finance teams handling daily volume",
        detailDescription:
          "The product reduces repeat manual tasks by supporting reminders, recurring actions, and cleaner recurring workflow patterns.",
        detailHeroNote:
          "Ideal for teams that want to spend less time on repeat admin and more time on review, control, and follow-up.",
        detailCtaLabel: "Explore workflows",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Recurring tasks no longer need to be rebuilt from scratch each time.",
          "Automation reduces follow-up fatigue across daily finance activity.",
          "Teams can focus more on review and exceptions than repetition.",
        ],
        detailStats: [
          { value: "Lower", label: "Manual repetition" },
          { value: "Better", label: "Team focus" },
          { value: "Steadier", label: "Execution" },
        ],
        detailSections: [
          {
            title: "Removes common admin drag",
            description:
              "Repeated finance steps can be handled more consistently without asking the team to manually trigger every action.",
          },
          {
            title: "Creates better operational rhythm",
            description:
              "When repetitive work is reduced, teams can handle exceptions and customer-facing issues with more attention.",
          },
          {
            title: "Useful as transaction volume grows",
            description:
              "The savings become more noticeable as invoices, reminders, and routine finance actions increase over time.",
          },
        ],
      },
      {
        slug: "connected-modules",
        title: "Connected modules",
        description:
          "Sales, inventory, expenses, and bookkeeping stay linked so nothing has to be entered twice.",
        iconUrl: "",
        detailEyebrow: "Connected Product Design",
        detailTitle: "Connected modules that keep work from splitting across tools",
        detailDescription:
          "RoboBooks links key accounting modules so sales, inventory, expenses, and books stay aligned inside one connected system.",
        detailHeroNote:
          "Helpful for businesses that want less duplicate entry and fewer blind spots between teams.",
        detailCtaLabel: "View connected workflows",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Modules share context so data stays connected across workflows.",
          "Teams avoid repeating entries between separate operational areas.",
          "Finance visibility improves when systems stay linked.",
        ],
        detailStats: [
          { value: "One", label: "Connected flow" },
          { value: "Less", label: "Duplicate entry" },
          { value: "Better", label: "Cross-team clarity" },
        ],
        detailSections: [
          {
            title: "Breaks fewer workflows",
            description:
              "Linked modules reduce the operational gaps that appear when teams manage related work in separate places.",
          },
          {
            title: "Improves shared visibility",
            description:
              "Finance, sales, and operations can work from more connected information instead of reconciling disconnected updates.",
          },
          {
            title: "Supports cleaner scaling",
            description:
              "As the business grows, connected modules help preserve control and reduce unnecessary admin duplication.",
          },
        ],
      },
      {
        slug: "simple-for-teams",
        title: "Simple for teams",
        description:
          "Owners, accountants, and operations teams can use the same interface without extra complexity.",
        iconUrl: "",
        detailEyebrow: "Team Adoption",
        detailTitle: "Simple for teams with different roles and responsibilities",
        detailDescription:
          "The interface is designed so owners, accountants, and operations teams can work in the same system without overwhelming complexity.",
        detailHeroNote:
          "This matters most when a product needs to support collaboration without becoming noisy or intimidating.",
        detailCtaLabel: "Request a walkthrough",
        detailCtaUrl: "/contact",
        detailHighlights: [
          "Different users can work in the same product more comfortably.",
          "The interface stays approachable without losing capability.",
          "Collaboration improves when the system feels easier for everyone.",
        ],
        detailStats: [
          { value: "Broader", label: "Adoption" },
          { value: "Lower", label: "Complexity" },
          { value: "Smoother", label: "Collaboration" },
        ],
        detailSections: [
          {
            title: "Made for mixed teams",
            description:
              "The product supports role diversity without making every screen feel overloaded for the average user.",
          },
          {
            title: "Reduces dependency on specialists",
            description:
              "More people can understand and act inside the platform without needing constant translation from finance power users.",
          },
          {
            title: "Helps teams stay aligned",
            description:
              "A shared but approachable interface improves collaboration across founders, operations, and finance roles.",
          },
        ],
      },
    ],
  },
  businessImpact: {
    eyebrow: "Business Impact",
    title: "Why accounting teams move to RoboBooks",
    description:
      "It is not just bookkeeping software. RoboBooks improves collections, reporting clarity, compliance confidence, and daily collaboration across finance operations.",
    highlightTitle: "Built for growing businesses",
    highlightDescription:
      "From founders to finance managers, the platform keeps everyone aligned on invoicing, reporting, and cash position.",
    highlightIconUrl: "",
    benefits: [
      {
        title: "Fewer revenue leaks",
        description:
          "Automated reminders and real-time due tracking help teams recover payments faster.",
        iconUrl: "",
      },
      {
        title: "Cleaner tax accuracy",
        description:
          "Built-in calculations reduce manual GST mistakes and improve confidence before filing.",
        iconUrl: "",
      },
      {
        title: "Anywhere access",
        description:
          "Open books, reports, and approvals securely from office, branch, or remote setup.",
        iconUrl: "",
      },
    ],
  },
  teamManagement: {
    eyebrow: "Team Management",
    title: "Give every team member the right level of control",
    description:
      "RoboBooks supports collaborative accounting without making the interface noisy. Teams stay aligned while permissions and financial discipline stay intact.",
    cards: [
      {
        title: "Access by role",
        description:
          "Control who can view reports, create invoices, approve entries, or edit accounting data.",
        iconKey: "lock",
      },
      {
        title: "Department coordination",
        description:
          "Finance, ops, and founders can work from the same platform without breaking process ownership.",
        iconKey: "briefcase",
      },
      {
        title: "Shared visibility",
        description:
          "Everyone sees the latest status on billing, dues, and reports without relying on handoffs.",
        iconKey: "users",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions teams usually ask before they switch",
    description:
      "Clear answers for businesses looking for a more complete and modern accounting setup.",
    items: [
      {
        question: "What kind of businesses can use RoboBooks?",
        answer:
          "RoboBooks is suited for service businesses, retailers, distributors, agencies, and growing teams that need invoicing, bookkeeping, GST reporting, and finance visibility in one product.",
      },
      {
        question: "Does RoboBooks support GST-ready accounting?",
        answer:
          "Yes. The product is positioned for accounting workflows that need GST-ready invoicing, tax summaries, and cleaner reporting for everyday compliance work.",
      },
      {
        question: "Can multiple team members work together?",
        answer:
          "Yes. Teams can collaborate with role-based access so owners, accountants, and operations users can each work in the same system with controlled permissions.",
      },
      {
        question: "Is RoboBooks only for billing?",
        answer:
          "No. RoboBooks is an accounting SaaS platform that goes beyond billing into bookkeeping, bank reconciliation, reporting, inventory-linked workflows, and team operations.",
      },
    ],
  },
  trustedMarquee: {
    eyebrow: "Trusted By Growing Teams And Our Partners",
    title: "Our Patner",
    description:
      "RoboBooks supports billing, finance, inventory, and operations teams across multiple industries with our trusted partners.",
    topRow: [
      { label: "Retail", iconKey: "store", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Manufacturing", iconKey: "factory", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "SaaS", iconKey: "laptop", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Restaurants", iconKey: "utensils", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Banking", iconKey: "banknote", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Healthcare", iconKey: "heart", iconUrl: "", sublabel: "Powered by RoboBooks" },
    ],
    bottomRow: [
      { label: "Wholesale", iconKey: "boxes", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Compliance", iconKey: "shield", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Invoicing", iconKey: "receipt", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Commerce", iconKey: "shopping", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Enterprises", iconKey: "building", iconUrl: "", sublabel: "Powered by RoboBooks" },
      { label: "Logistics", iconKey: "truck", iconUrl: "", sublabel: "Powered by RoboBooks" },
    ],
  },
  preFooterCta: {
    eyebrow: "Start with RoboBooks",
    title: "Start using RoboBooks today",
    description:
      "Bring invoicing, GST workflows, payment follow-ups, and accounting visibility together in one clean workspace your whole team can rely on.",
    primaryButtonLabel: "Start Free Trial",
    primaryButtonUrl: "/register",
    secondaryButtonLabel: "Book Demo",
    secondaryButtonUrl: "/contact",
    benefits: [
      "GST-ready invoicing",
      "Books, banking, and reports in one place",
      "Built for growing Indian businesses",
    ],
    downloadLabel: "Download app on",
    playStoreUrl: "/register",
    playStoreImageUrl: "/images/playstore.png",
    appStoreUrl: "/register",
    appStoreImageUrl: "/images/appstore.png",
    phoneTitle: "RoboBooks App",
    phoneSubtitle: "Collections",
    phoneAccentColor: "bg-emerald-500",
    dashboardPreviewImageUrl: "/images/dashboard.png",
    collectedLabel: "Collected",
    collectedValue: "Rs. 11.4L",
    collectedMeta: "This month",
    invoicesLabel: "Invoices",
    invoicesValue: "126",
    invoicesMeta: "Auto-tracked in RoboBooks",
  },
  contactSection: {
    heroEyebrow: "Contact",
    heroTitle: "Talk to the RoboBooks team about support, demos, or your accounting setup",
    heroDescription:
      "Whether you need product guidance, help with onboarding, or answers about plans and workflows, our team is ready to respond with clarity and speed.",
    heroPrimaryButtonLabel: "Get in touch",
    heroPrimaryButtonUrl: "#contact-form",
    heroSecondaryButtonLabel: "View contact details",
    heroSecondaryButtonUrl: "#contact-details",
    heroStats: [
      { value: "24/7", label: "Support desk" },
      { value: "1h", label: "Fast response" },
      { value: "3", label: "Ways to connect" },
      { value: "100%", label: "Cloud support" },
    ],
    detailsEyebrow: "Contact Details",
    detailsTitle: "Reach RoboBooks through the channel that works best for you",
    detailsDescription:
      "Visit the office, call the team, or send a message. We have redesigned the section to feel cleaner, sharper, and more aligned with the homepage experience.",
    supportButtonLabel: "Email Support",
    supportButtonEmail: "support@robobooks.com",
    whatsappButtonLabel: "Chat on WhatsApp",
    addressTitle: "Robo Books HQ",
    addressLines: ["123 Business Park, Tech Hub", "Mumbai, Maharashtra 400001"],
    phones: [
      { label: "Mobile", number: "+91 98765 43210" },
      { label: "Support", number: "+91 1800 1102" },
    ],
    emails: [
      { label: "Info", address: "hello@robobooks.com" },
      { label: "Support", address: "support@robobooks.com" },
    ],
    mapEyebrow: "Location Map",
    mapTitle: "Find us on the map",
    mapButtonLabel: "Open in Maps",
    showMap: true,
    placeQuery: "Robo Books HQ Mumbai",
    whatsAppNumber: "+91 98765 43210",
    mapTags: ["Wheelchair friendly", "Visitor parking", "Public transit 3 min"],
    fallbackStats: [
      { value: "1h", label: "Avg. response" },
      { value: "98%", label: "Satisfaction" },
      { value: "24k+", label: "Issues solved" },
    ],
    leftEyebrow: "Contact Us",
    leftTitle: "Talk to RoboBooks after exploring the mobile experience",
    leftDescription:
      "Share your requirement and our team will help with invoicing, GST billing, payment follow-ups, and the right setup for your business.",
    callLabel: "Call",
    callValue: "+91 98765 43210",
    callDescription: "Demo booking, onboarding, and product guidance.",
    emailLabel: "Email",
    emailValue: "hello@robobooks.in",
    emailDescription: "Send your details and our team will reach out quickly.",
    formEyebrow: "Request A Callback",
    formTitle: "Let us get in touch",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "Enter your name",
    emailFieldLabel: "Work email",
    emailFieldPlaceholder: "you@company.com",
    phoneFieldLabel: "Phone number",
    phoneFieldPlaceholder: "+91 98765 43210",
    companyFieldLabel: "Company name",
    companyFieldPlaceholder: "Your business name",
    requirementLabel: "Your requirement",
    requirementPlaceholder:
      "Tell us what you want help with: billing, GST, accounting, reports, inventory, or demo setup.",
    submitButtonLabel: "Submit enquiry",
  },
  pricingPlans: {
    eyebrow: "Pricing Plans",
    title: "Choose the RoboBooks plan that fits your accounting cycle",
    description:
      "Simple pricing for businesses that want invoicing, bookkeeping, GST workflows, and finance visibility in one SaaS platform.",
    selectedPlanLabel: "Selected Plan",
    ctaLabel: "Get started",
    ctaUrl: "/register",
    plans: [
      {
        name: "Quarterly",
        price: "Rs. 2,499",
        duration: "/3 months",
        imageUrl: "",
        description:
          "A flexible entry plan for small businesses starting with structured invoicing and bookkeeping.",
        features: [
          "GST invoicing and expense tracking",
          "Basic financial dashboards",
          "Email support",
        ],
      },
      {
        name: "Semi-Annual",
        price: "Rs. 4,499",
        duration: "/6 months",
        imageUrl: "",
        description:
          "Balanced pricing for growing teams that need deeper finance visibility and smoother operations.",
        features: [
          "Everything in Quarterly",
          "Bank reconciliation and reports",
          "Priority support",
        ],
      },
      {
        name: "Annual",
        price: "Rs. 7,999",
        duration: "/12 months",
        imageUrl: "",
        description:
          "Best value for companies that want a complete accounting SaaS workflow throughout the year.",
        features: [
          "Everything in Semi-Annual",
          "Advanced analytics and team access",
          "Dedicated onboarding support",
        ],
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Teams trust RoboBooks to keep their accounting calmer",
    description:
      "The product is designed to reduce friction across billing, books, reporting, and daily finance collaboration.",
    testimonials: [
      {
        name: "Rohit Bansal",
        role: "Founder, BrightLedger Retail",
        content:
          "RoboBooks helped us move away from scattered spreadsheets. Billing, dues, and reporting finally feel connected.",
        image: "/images/testimonial1.jpg",
        video: "",
      },
      {
        name: "Neha Kapoor",
        role: "Finance Lead, UrbanNest Services",
        content:
          "The interface is clean, the workflows are practical, and our month-end reviews take much less effort than before.",
        image: "/images/testimonial2.jpg",
        video: "",
      },
      {
        name: "Arjun Mehta",
        role: "Director, Mehta Supply Co.",
        content:
          "For a growing company, having invoicing, accounting visibility, and team access in one place is a major advantage.",
        image: "/images/testimonial3.jpg",
        video: "",
      },
    ],
  },
  "testimonial-cards": {
    title: "Our Testimonials",
    description:
      "Real stories from Indian business owners who streamlined billing, collections, and operations with RoboBooks",
    ctaLabel: "View All Testimonials",
    ctaUrl: "/contact",
    stories: [
      {
        title: "Increased Turnover by 40%",
        name: "Mohit Jain",
        company: "Arihant Enterprises",
        image: "/images/testimonial-indian-1.jpg",
        quote:
          "Friends in the electronics trade told us to compare myBillBook with Vyapar and Tally before deciding. RoboBooks stood out because it handles large SKU billing smoothly.",
        video: "",
      },
      {
        title: "Reduced Overdues by 80%",
        name: "Akhil",
        company: "Shuban Clothing",
        image: "/images/testimonial-indian-2.jpg",
        quote:
          "Many business owners asked me to evaluate multiple billing apps before choosing. After trying them, RoboBooks felt easier for staff adoption and payment follow-ups.",
        video: "",
      },
      {
        title: "50K to 35 Lacs Growth",
        name: "Vishwaradhya",
        company: "Sri Siddalingeshwara Enterprises",
        image: "/images/testimonial-indian-3.jpg",
        quote:
          "Before choosing a billing app, I compared RoboBooks with other options like Vyapar and Tally. After using it, the workflow felt the most seamless for our daily business.",
        video: "",
      },
    ],
  },
  blog: {
    eyebrow: "Blog",
    title: "Insights for teams building a smarter accounting workflow",
    description:
      "Explore practical ideas around invoicing, bookkeeping, reporting, finance operations, and how modern SaaS tools can reduce accounting friction.",
    primaryButtonLabel: "Read latest posts",
    primaryButtonUrl: "#blog-posts",
    secondaryButtonLabel: "Try RoboBooks",
    secondaryButtonUrl: "/register",
    stats: [
      { value: "4+", label: "Latest articles" },
      { value: "100%", label: "Practical insights" },
      { value: "Finance", label: "Focused topics" },
      { value: "Weekly", label: "Fresh ideas" },
    ],
    sectionEyebrow: "Latest Articles",
    sectionTitle: "Practical accounting insights for smarter business decisions",
    posts: [
      {
        id: "closing",
        title: "How growing businesses can simplify month-end closing",
        excerpt:
          "See how an accounting SaaS workflow can connect invoicing, expenses, reconciliation, and reporting in one monthly close process.",
        category: "Accounting Ops",
        readTime: "5 min read",
        date: "18 Mar 2026",
        image: "/images/blog/closing-dashboard.svg",
        takeaway:
          "A connected accounting workflow reduces last-minute close pressure by keeping invoices, expenses, bank activity, and reports aligned throughout the month.",
        content: [
          "Month-end closing slows down when a business uses separate tools for invoicing, expense capture, bank updates, and final reporting. The finance team spends more time chasing entries than reviewing the actual health of the business.",
          "An accounting SaaS platform improves this by bringing billing, purchase tracking, reconciliation, and closing reports into one connected workflow. Instead of exporting data from multiple places, teams work from one finance system that stays updated throughout the month.",
          "The biggest gain comes from structured checkpoints. Teams can review unpaid invoices, unmatched bank entries, pending expenses, and tax-sensitive transactions before the final closing week. That reduces last-minute adjustments and improves confidence in the numbers.",
          "RoboBooks is built for exactly this kind of close discipline. It helps finance teams move from manual follow-up to guided monthly execution, so closing feels faster, cleaner, and easier to scale as the business grows.",
        ],
      },
      {
        id: "automation",
        title: "What to automate first in your accounting workflow",
        excerpt:
          "Start with the accounting SaaS automations that remove repetitive follow-up, speed up collections, and improve reporting consistency.",
        category: "Workflow Automation",
        readTime: "4 min read",
        date: "18 Mar 2026",
        image: "/images/blog/workflow-automation.svg",
        takeaway:
          "Start automation with repetitive finance tasks that follow clear rules, then expand once the team trusts the output.",
        content: [
          "Not every finance task should be automated on day one. The best starting point is work that happens repeatedly, follows clear rules, and can be checked easily by the finance team.",
          "In an accounting SaaS setup, the first wins usually come from recurring invoices, payment reminders, receivable follow-ups, and simple transaction tagging. These save time quickly and remove the operational friction that slows down daily bookkeeping.",
          "The next layer is report-ready automation. When GST summaries, cash collection views, monthly receivable snapshots, and reminder schedules are generated from live data, finance teams stop rebuilding the same reports every week.",
          "RoboBooks follows this practical automation model. Start with repetitive tasks, confirm the output, and then expand into deeper finance workflows once your team is comfortable trusting the system.",
        ],
      },
      {
        id: "visibility",
        title: "Why finance visibility matters beyond invoicing",
        excerpt:
          "Accounting SaaS should give teams visibility into collections, margins, expenses, and cash position, not just invoice creation.",
        category: "Finance Strategy",
        readTime: "6 min read",
        date: "18 Mar 2026",
        image: "/images/blog/finance-visibility.svg",
        takeaway:
          "Finance visibility matters when billing, collections, expenses, and reports live together, not when invoices sit in isolation.",
        content: [
          "Many businesses begin with invoicing software and assume that finance is handled. But invoices alone do not show collection delays, shrinking margins, rising expenses, or the cash impact of day-to-day decisions.",
          "True finance visibility comes when billing, collections, expenses, reports, and outstanding balances are connected inside one accounting SaaS workflow. Teams can then see what was billed, what was paid, what is delayed, and what needs follow-up.",
          "That clarity changes the quality of decisions. Leaders can act earlier on pricing gaps, collection issues, vendor pressure, and profitability trends because the numbers are visible in one place instead of spread across spreadsheets.",
          "RoboBooks is designed to turn accounting data into decision-ready insight. The goal is not just to store entries, but to help businesses read the financial story behind their operations.",
        ],
      },
      {
        id: "gst-checklist",
        title: "A practical GST checklist for fast-moving teams",
        excerpt:
          "Use an accounting SaaS checklist to keep GST records, invoice data, and filing preparation aligned across the month.",
        category: "Compliance",
        readTime: "4 min read",
        date: "18 Mar 2026",
        image: "/images/blog/gst-compliance.svg",
        takeaway:
          "Compliance becomes easier when GST checks happen continuously inside the accounting workflow instead of during deadline week.",
        content: [
          "GST pressure increases when teams wait until the deadline week to validate entries, tax splits, and missing invoices. A better approach is to spread the work across the month and review exceptions early.",
          "An accounting SaaS platform helps by keeping invoice records, purchase entries, ledger summaries, and tax-ready reports inside one workflow. That reduces spreadsheet dependency and gives finance teams cleaner audit trails.",
          "A practical GST routine should include recurring checks for invoice completeness, purchase mapping, tax classification, and return-ready totals. By reviewing these items on schedule, teams avoid rushed compliance cleanup later.",
          "RoboBooks supports this process by combining invoicing, bookkeeping, and reporting discipline in one place. Compliance becomes easier when the accounting system is already organized before filing week begins.",
        ],
      },
    ],
  },
};

function isSupportedCmsSection(section) {
  return Boolean(
    CMS_DEFAULTS[section] ||
      section.startsWith("industry-") ||
      section.startsWith("footer-page-")
  );
}

function mergeWithDefaults(section, content = {}) {
  if (!CMS_DEFAULTS[section]) {
    return {
      ...content,
    };
  }

  return {
    ...CMS_DEFAULTS[section],
    ...content,
  };
}

const ALLOWED_RICH_TEXT_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "blockquote",
  "a",
  "img",
  "video",
  "source",
]);

function sanitizeMediaUrl(value = "") {
  if (!value || /^\s*javascript:/i.test(value)) {
    return "";
  }

  return value.replace(/"/g, "&quot;");
}

function sanitizeRichTextString(value = "") {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }

  let sanitized = value
    .replace(/<\s*\/?\s*(script|style)[^>]*>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\sstyle\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "");

  sanitized = sanitized.replace(/<\/?([a-z0-9-]+)([^>]*)>/gi, (tag, tagName, attributes = "") => {
    const normalizedTag = String(tagName).toLowerCase();

    if (!ALLOWED_RICH_TEXT_TAGS.has(normalizedTag)) {
      return "";
    }

    if (normalizedTag === "a") {
      if (tag.startsWith("</")) {
        return "</a>";
      }

      const hrefMatch = attributes.match(/\shref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const hrefValue = hrefMatch?.[2] || hrefMatch?.[3] || hrefMatch?.[4] || "";

      if (!hrefValue || /^\s*javascript:/i.test(hrefValue)) {
        return "<a>";
      }

      return `<a href="${hrefValue.replace(/"/g, "&quot;")}" target="_blank" rel="noreferrer">`;
    }

    if (normalizedTag === "img") {
      const srcMatch = attributes.match(/\ssrc\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const altMatch = attributes.match(/\salt\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const srcValue = sanitizeMediaUrl(
        srcMatch?.[2] || srcMatch?.[3] || srcMatch?.[4] || ""
      );
      const altValue = (altMatch?.[2] || altMatch?.[3] || altMatch?.[4] || "").replace(
        /"/g,
        "&quot;"
      );

      if (!srcValue) {
        return "";
      }

      return `<img src="${srcValue}" alt="${altValue}">`;
    }

    if (normalizedTag === "video") {
      if (tag.startsWith("</")) {
        return "</video>";
      }

      return "<video controls playsinline>";
    }

    if (normalizedTag === "source") {
      const srcMatch = attributes.match(/\ssrc\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const typeMatch = attributes.match(/\stype\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const srcValue = sanitizeMediaUrl(
        srcMatch?.[2] || srcMatch?.[3] || srcMatch?.[4] || ""
      );
      const typeValue = (typeMatch?.[2] || typeMatch?.[3] || typeMatch?.[4] || "").replace(
        /"/g,
        "&quot;"
      );

      if (!srcValue) {
        return "";
      }

      return `<source src="${srcValue}"${typeValue ? ` type="${typeValue}"` : ""}>`;
    }

    return tag.startsWith("</") ? `</${normalizedTag}>` : `<${normalizedTag}>`;
  });

  return sanitized.trim();
}

function sanitizeBlogContent(payload) {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  const nextPayload = {
    ...payload,
  };

  if (Array.isArray(nextPayload.posts)) {
    nextPayload.posts = nextPayload.posts.map((post) => ({
      ...post,
      takeaway: sanitizeRichTextString(post?.takeaway),
      content: Array.isArray(post?.content)
        ? post.content.map((block) => sanitizeRichTextString(block))
        : [],
    }));
  }

  return nextPayload;
}

export const getCmsSection = async (req, res) => {
  try {
    const { section } = req.params;

    if (!isSupportedCmsSection(section)) {
      return res.status(404).json({ success: false, message: "CMS section not found" });
    }

    const entry = await CmsContent.findOne({ section }).lean();

    res.json({
      success: true,
      section,
      content: mergeWithDefaults(section, entry?.content),
      updatedAt: entry?.updatedAt || null,
    });
  } catch (error) {
    console.error("Get CMS section error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch CMS content" });
  }
};

export const getAllCmsSections = async (_req, res) => {
  try {
    const entries = await CmsContent.find({}).lean();
    const mapped = Object.keys(CMS_DEFAULTS).reduce((acc, section) => {
      const entry = entries.find((item) => item.section === section);
      acc[section] = {
        content: mergeWithDefaults(section, entry?.content),
        updatedAt: entry?.updatedAt || null,
      };
      return acc;
    }, {});

    res.json({
      success: true,
      sections: mapped,
    });
  } catch (error) {
    console.error("Get all CMS sections error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch CMS sections" });
  }
};

export const upsertCmsSection = async (req, res) => {
  try {
    const { section } = req.params;

    if (!isSupportedCmsSection(section)) {
      return res.status(404).json({ success: false, message: "CMS section not found" });
    }

    const payload = req.body?.content;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ success: false, message: "Content payload is required" });
    }

    const sanitizedPayload = section === "blog" ? sanitizeBlogContent(payload) : payload;

    const updated = await CmsContent.findOneAndUpdate(
      { section },
      {
        section,
        content: sanitizedPayload,
        updatedBy: req.user?.uid || null,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({
      success: true,
      message: `${section} content updated successfully`,
      section,
      content: mergeWithDefaults(section, updated.content),
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    console.error("Upsert CMS section error:", error);
    res.status(500).json({ success: false, message: "Failed to update CMS content" });
  }
};

export const uploadCmsImageMiddleware = (req, res, next) => {
  const middleware = cmsMediaUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]);

  middleware(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size is 25MB.",
        });
      }
    }

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to upload CMS image.",
      });
    }

    next();
  });
};

export const uploadCmsImage = async (req, res) => {
  try {
    const uploadedFile = req.file || req.files?.file?.[0] || req.files?.image?.[0];

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded.",
      });
    }

    const kind = uploadedFile.mimetype.startsWith("video/") ? "video" : "image";

    res.json({
      success: true,
      message: "CMS media uploaded successfully",
      url: `/uploads/cms/${uploadedFile.filename}`,
      filename: uploadedFile.filename,
      kind,
      mimeType: uploadedFile.mimetype,
    });
  } catch (error) {
    console.error("CMS image upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload CMS image" });
  }
};

export { CMS_DEFAULTS };
