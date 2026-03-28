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
    eyebrow: "Product Features",
    title: "Purpose-built features for modern accounting operations",
    description:
      "Every feature is designed to reduce finance admin, improve accuracy, and help teams move from transaction entry to business insight.",
    ctaLabel: "Explore RoboBooks",
    ctaUrl: "/register",
    cards: [
      {
        title: "Customer Accounts",
        description:
          "Maintain customer ledgers, credits, dues, and GST details with complete visibility.",
        iconUrl: "",
      },
      {
        title: "Bank Reconciliation",
        description:
          "Match bank activity against books faster and reduce month-end closing effort.",
        iconUrl: "",
      },
      {
        title: "Purchase Workflows",
        description:
          "Handle purchase orders, bills, and vendor liabilities from one connected process.",
        iconUrl: "",
      },
      {
        title: "Recurring Billing",
        description:
          "Automate subscription invoices, due date alerts, and consistent payment collection.",
        iconUrl: "",
      },
      {
        title: "Tax-Ready Reports",
        description:
          "Export clean summaries for GST, audits, and internal reviews without manual cleanup.",
        iconUrl: "",
      },
      {
        title: "Inventory Linking",
        description:
          "Connect stock movement directly to sales and purchase entries to avoid blind spots.",
        iconUrl: "",
      },
      {
        title: "Growth Analytics",
        description:
          "Understand margins, revenue trends, and business health with executive-friendly dashboards.",
        iconUrl: "",
      },
      {
        title: "Bookkeeping History",
        description:
          "Track every adjustment, approval, and transaction with structured accounting records.",
        iconUrl: "",
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
        title: "Clean navigation",
        description:
          "Important accounting actions stay visible so your team can move without hunting through menus.",
        iconUrl: "",
      },
      {
        title: "Faster setup",
        description:
          "Onboard your company, taxes, books, and billing structure quickly with guided workflows.",
        iconUrl: "",
      },
      {
        title: "Work from anywhere",
        description:
          "Use RoboBooks across devices to review approvals, collections, and reports on the move.",
        iconUrl: "",
      },
      {
        title: "Less repetitive work",
        description:
          "Automate common accounting steps like reminders, categorization, and recurring invoice creation.",
        iconUrl: "",
      },
      {
        title: "Connected modules",
        description:
          "Sales, inventory, expenses, and bookkeeping stay linked so nothing has to be entered twice.",
        iconUrl: "",
      },
      {
        title: "Simple for teams",
        description:
          "Owners, accountants, and operations teams can use the same interface without extra complexity.",
        iconUrl: "",
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
      },
      {
        name: "Neha Kapoor",
        role: "Finance Lead, UrbanNest Services",
        content:
          "The interface is clean, the workflows are practical, and our month-end reviews take much less effort than before.",
        image: "/images/testimonial2.jpg",
      },
      {
        name: "Arjun Mehta",
        role: "Director, Mehta Supply Co.",
        content:
          "For a growing company, having invoicing, accounting visibility, and team access in one place is a major advantage.",
        image: "/images/testimonial3.jpg",
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
