import { api } from "@/lib/api";
import { industries } from "../app/industries/industryData";
import { posts } from "../app/blog/posts";
import {
  getDefaultFooterPageContent,
  getPublicFooterHrefBySlug,
} from "../app/footer/footerData";
import { gstTools } from "../app/gst-tools/toolData";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function resolveCmsAssetUrl(pathOrUrl: string) {
  if (!pathOrUrl) {
    return "";
  }

  if (/^(https?:\/\/|data:|blob:)/i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  if (
    pathOrUrl.startsWith("/images/") ||
    pathOrUrl.startsWith("/favicon") ||
    pathOrUrl.startsWith("/_next/")
  ) {
    return pathOrUrl;
  }

  return `${backendUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export type HeroCmsContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  features: string[];
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
  slideIntervalMs: number;
  slides: Array<{
    imageUrl: string;
    alt: string;
  }>;
};

export type AboutCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  trustedLabel: string;
  trustedText: string;
  mission: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
  };
  values: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  stats: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      number: string;
      label: string;
      description: string;
    }>;
  };
  timeline: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      year: string;
      title: string;
      description: string;
      achievement: string;
    }>;
  };
};

export type LogoCmsContent = {
  logoUrl: string;
  altText: string;
};

export type FooterCmsContent = {
  brandDescription: string;
  productTitle: string;
  companyTitle: string;
  legalTitle: string;
  productLinks: Array<{
    label: string;
    href: string;
  }>;
  companyLinks: Array<{
    label: string;
    href: string;
  }>;
  legalLinks: Array<{
    label: string;
    href: string;
  }>;
  extraGroups: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;
  copyrightText: string;
  bottomText: string;
};

export type FooterPageCmsContent = {
  slug: string;
  label: string;
  category: "product" | "company" | "legal";
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  highlights: string[];
  cta: {
    href: string;
    label: string;
  };
};

export type InvoiceThemesCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  infoCards: Array<{
    title: string;
    body: string;
  }>;
  tabLabels: string[];
  showcaseTitle: string;
  showcaseBadge: string;
  showcaseCtaLabel: string;
  showcaseCtaUrl: string;
  thermalImages: Array<{
    imageUrl: string;
    alt: string;
    widthLabel: string;
  }>;
  a4Images: Array<{
    imageUrl: string;
    alt: string;
  }>;
  a5Images: Array<{
    imageUrl: string;
    alt: string;
  }>;
};

export type ServicesCmsContent = {
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  pagePrimaryButtonLabel: string;
  pagePrimaryButtonUrl: string;
  pageSecondaryButtonLabel: string;
  pageSecondaryButtonUrl: string;
  pageStats: Array<{
    value: string;
    label: string;
  }>;
  eyebrow: string;
  title: string;
  highlightTitle: string;
  highlightDescription: string;
  highlightIconUrl: string;
  cards: Array<{
    slug: string;
    title: string;
    description: string;
    ctaLabel: string;
    iconUrl: string;
  }>;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
};

export type IndustriesCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    slug: string;
    title: string;
    span: string;
    iconUrl: string;
  }>;
};

export type IndustryPageCmsContent = {
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

export type GstComplianceCmsContent = {
  eyebrow: string;
  title: string;
  exploreLabel: string;
  tools: Array<{
    key: string;
    slug: string;
    label: string;
    badge: string;
    description: string;
    iconUrl: string;
    previewImageUrl: string;
  }>;
};

export type FeaturesCmsContent = {
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  pagePrimaryButtonLabel: string;
  pagePrimaryButtonUrl: string;
  pageSecondaryButtonLabel: string;
  pageSecondaryButtonUrl: string;
  pageStats: Array<{
    value: string;
    label: string;
  }>;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  cards: Array<{
    title: string;
    description: string;
    iconUrl: string;
  }>;
};

export type UsabilityCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{
    title: string;
    description: string;
    iconUrl: string;
  }>;
};

export type BusinessImpactCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  highlightTitle: string;
  highlightDescription: string;
  highlightIconUrl: string;
  benefits: Array<{
    title: string;
    description: string;
    iconUrl: string;
  }>;
};

export type TeamManagementCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{
    title: string;
    description: string;
    iconKey: string;
  }>;
};

export type FaqCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type TrustedMarqueeCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  topRow: Array<{
    label: string;
    iconKey: string;
    iconUrl: string;
    sublabel: string;
  }>;
  bottomRow: Array<{
    label: string;
    iconKey: string;
    iconUrl: string;
    sublabel: string;
  }>;
};

export type PreFooterCtaCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
  benefits: string[];
  downloadLabel: string;
  playStoreUrl: string;
  playStoreImageUrl: string;
  appStoreUrl: string;
  appStoreImageUrl: string;
  phoneTitle: string;
  phoneSubtitle: string;
  phoneAccentColor: string;
  dashboardPreviewImageUrl: string;
  collectedLabel: string;
  collectedValue: string;
  collectedMeta: string;
  invoicesLabel: string;
  invoicesValue: string;
  invoicesMeta: string;
};

export type ContactSectionCmsContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryButtonLabel: string;
  heroPrimaryButtonUrl: string;
  heroSecondaryButtonLabel: string;
  heroSecondaryButtonUrl: string;
  heroStats: Array<{
    value: string;
    label: string;
  }>;
  detailsEyebrow: string;
  detailsTitle: string;
  detailsDescription: string;
  supportButtonLabel: string;
  supportButtonEmail: string;
  whatsappButtonLabel: string;
  addressTitle: string;
  addressLines: string[];
  phones: Array<{
    label: string;
    number: string;
  }>;
  emails: Array<{
    label: string;
    address: string;
  }>;
  mapEyebrow: string;
  mapTitle: string;
  mapButtonLabel: string;
  showMap: boolean;
  placeQuery: string;
  whatsAppNumber: string;
  mapTags: string[];
  fallbackStats: Array<{
    value: string;
    label: string;
  }>;
  leftEyebrow: string;
  leftTitle: string;
  leftDescription: string;
  callLabel: string;
  callValue: string;
  callDescription: string;
  emailLabel: string;
  emailValue: string;
  emailDescription: string;
  formEyebrow: string;
  formTitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailFieldLabel: string;
  emailFieldPlaceholder: string;
  phoneFieldLabel: string;
  phoneFieldPlaceholder: string;
  companyFieldLabel: string;
  companyFieldPlaceholder: string;
  requirementLabel: string;
  requirementPlaceholder: string;
  submitButtonLabel: string;
};

export type PricingPlansCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  selectedPlanLabel: string;
  ctaLabel: string;
  ctaUrl: string;
  plans: Array<{
    name: string;
    price: string;
    duration: string;
    imageUrl: string;
    description: string;
    features: string[];
  }>;
};

export type TestimonialsCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    image: string;
  }>;
};

export type BlogCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  sectionEyebrow: string;
  sectionTitle: string;
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    image: string;
    content: string[];
    takeaway: string;
  }>;
};

export const defaultHeroContent: HeroCmsContent = {
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
};

export const defaultAboutContent: AboutCmsContent = {
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
};

export const defaultLogoContent: LogoCmsContent = {
  logoUrl: "/images/logo.png",
  altText: "RoboBooks logo",
};

export const defaultFooterContent: FooterCmsContent = {
  brandDescription:
    "RoboBooks is an accounting SaaS platform for invoicing, bookkeeping, GST workflows, reporting, and operational finance control.",
  productTitle: "Product",
  companyTitle: "Company",
  legalTitle: "Legal",
  productLinks: [
    { label: "About RoboBooks", href: getPublicFooterHrefBySlug("about-robobooks") },
    { label: "Book a demo", href: getPublicFooterHrefBySlug("book-a-demo") },
    { label: "Start free trial", href: getPublicFooterHrefBySlug("start-free-trial") },
    { label: "GSTR Filing", href: getPublicFooterHrefBySlug("gstr-filing") },
    { label: "E-Invoicing", href: getPublicFooterHrefBySlug("e-invoicing") },
    { label: "Delivery Challan", href: getPublicFooterHrefBySlug("delivery-challan") },
    { label: "Data Export to Sale", href: getPublicFooterHrefBySlug("data-export-to-sale") },
    { label: "Bank Reconciliation", href: getPublicFooterHrefBySlug("bank-reconciliation") },
    { label: "Import Export of Data", href: getPublicFooterHrefBySlug("import-export-of-data") },
    { label: "Multiple Financial Reporting", href: getPublicFooterHrefBySlug("multiple-financial-reporting") },
  ],
  companyLinks: [
    { label: "Company", href: getPublicFooterHrefBySlug("company") },
    { label: "Contact", href: getPublicFooterHrefBySlug("contact") },
    { label: "FAQ", href: getPublicFooterHrefBySlug("faq") },
  ],
  legalLinks: [
    { label: "Terms", href: getPublicFooterHrefBySlug("terms") },
    { label: "Privacy", href: getPublicFooterHrefBySlug("privacy") },
    { label: "Cookies", href: getPublicFooterHrefBySlug("cookies") },
  ],
  extraGroups: [],
  copyrightText: "RoboBooks. All rights reserved.",
  bottomText: "Built for modern accounting workflows and growing businesses.",
};

export function getFooterGroups(content: FooterCmsContent) {
  return [
    {
      title: content.productTitle,
      links: content.productLinks,
    },
    {
      title: content.companyTitle,
      links: content.companyLinks,
    },
    {
      title: content.legalTitle,
      links: content.legalLinks,
    },
    ...(content.extraGroups || []),
  ].filter((group) => group.title?.trim() || group.links?.length);
}

export function getDefaultFooterPageCmsContent(
  slug: string
): FooterPageCmsContent | null {
  return getDefaultFooterPageContent(slug);
}

export const defaultInvoiceThemesContent: InvoiceThemesCmsContent = {
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
};

export const defaultServicesContent: ServicesCmsContent = {
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
};

export const defaultIndustriesContent: IndustriesCmsContent = {
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
};

export const defaultGstComplianceContent: GstComplianceCmsContent = {
  eyebrow: "GST Compliance",
  title: "Experience effortless GST compliance with RoboBooks invoicing software",
  exploreLabel: "Explore GST tools",
  tools: gstTools.map((tool) => ({
    key: tool.key,
    slug: tool.slug,
    label: tool.label,
    badge: tool.badge,
    description: tool.description,
    iconUrl: "",
    previewImageUrl: "",
  })),
};

export const defaultFeaturesContent: FeaturesCmsContent = {
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
};

export const defaultUsabilityContent: UsabilityCmsContent = {
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
};

export const defaultBusinessImpactContent: BusinessImpactCmsContent = {
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
};

export const defaultTeamManagementContent: TeamManagementCmsContent = {
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
};

export const defaultFaqContent: FaqCmsContent = {
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
};

export const defaultTrustedMarqueeContent: TrustedMarqueeCmsContent = {
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
};

export const defaultPreFooterCtaContent: PreFooterCtaCmsContent = {
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
};

export const defaultContactSectionContent: ContactSectionCmsContent = {
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
};

export const defaultPricingPlansContent: PricingPlansCmsContent = {
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
};

export const defaultTestimonialsContent: TestimonialsCmsContent = {
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
};

export const defaultBlogContent: BlogCmsContent = {
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
  posts: posts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    date: post.date,
    image: post.image,
    content: post.content,
    takeaway:
      post.takeaway ||
      "The best finance systems connect invoicing, collections, reporting, and compliance so teams can act faster with cleaner data.",
  })),
};

const industryPageDefaults = industries.reduce<Record<string, IndustryPageCmsContent>>(
  (acc, industry) => {
    acc[industry.slug] = {
      slug: industry.slug,
      title: industry.title,
      eyebrow: industry.eyebrow,
      heroTitle: industry.heroTitle,
      description: industry.description,
      overview: industry.overview,
      accountingFocus: industry.accountingFocus,
      workflows: industry.workflows,
      reports: industry.reports,
    };
    return acc;
  },
  {}
);

export function getDefaultIndustryPageContent(slug: string): IndustryPageCmsContent | null {
  return industryPageDefaults[slug] || null;
}

type CmsResponse<T> = {
  success: boolean;
  section: string;
  content: T;
  updatedAt?: string | null;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeCmsContent<T>(fallback: T, content: unknown): T {
  if (Array.isArray(fallback)) {
    return (Array.isArray(content) ? content : fallback) as T;
  }

  if (isPlainObject(fallback)) {
    const source = isPlainObject(content) ? content : {};
    const mergedEntries = Object.entries(fallback).map(([key, fallbackValue]) => [
      key,
      mergeCmsContent(fallbackValue, source[key]),
    ]);

    for (const [key, value] of Object.entries(source)) {
      if (!(key in fallback)) {
        mergedEntries.push([key, value]);
      }
    }

    return Object.fromEntries(mergedEntries) as T;
  }

  return (content ?? fallback) as T;
}

export async function fetchPublicCmsSection<T>(
  section: string,
  fallback: T
): Promise<T> {
  try {
    const response = await fetch(`${backendUrl}/api/cms/${section}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as CmsResponse<T>;
    return mergeCmsContent(fallback, data.content);
  } catch {
    return fallback;
  }
}

export async function fetchAdminCmsSection<T>(section: string) {
  return api<CmsResponse<T>>(`/api/admin/cms/${section}`);
}

export async function updateAdminCmsSection<T>(section: string, content: T) {
  return api<CmsResponse<T>>(`/api/admin/cms/${section}`, {
    method: "PUT",
    json: { content },
  });
}

export async function uploadAdminCmsImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return api<{
    success: boolean;
    message: string;
    url: string;
    filename: string;
    kind: "image" | "video";
    mimeType: string;
  }>(
    "/api/admin/cms/upload-image",
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function uploadAdminCmsMedia(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return api<{
    success: boolean;
    message: string;
    url: string;
    filename: string;
    kind: "image" | "video";
    mimeType: string;
  }>("/api/admin/cms/upload-media", {
    method: "POST",
    body: formData,
  });
}
