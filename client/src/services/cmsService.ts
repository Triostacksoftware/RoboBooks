import { api } from "@/lib/api";
import { industries } from "../app/industries/industryData";
import { posts } from "../app/blog/posts";
import {
  getDefaultFooterPageContent,
  getPublicFooterHrefBySlug,
  normalizeFooterLinkGroups,
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
  heroVideoUrl?: string;
};

export type AboutCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  heroImageUrl: string;
  dashboardImageUrl: string;
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
    eyebrow: string;
    detailTitle: string;
    detail: string;
    detailExtended: string;
    heroImageUrl: string;
    points: string[];
    highlights: string[];
    useCases: string[];
  }>;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
};

export type ServiceCardCmsContent = ServicesCmsContent["cards"][number];

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
    slug: string;
    title: string;
    description: string;
    iconUrl: string;
    detailEyebrow: string;
    detailTitle: string;
    detailDescription: string;
    detailHeroNote: string;
    detailCtaLabel: string;
    detailCtaUrl: string;
    detailHighlights: string[];
    detailStats: Array<{
      value: string;
      label: string;
    }>;
    detailSections: Array<{
      title: string;
      description: string;
    }>;
  }>;
};

export type UsabilityCmsContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{
    slug: string;
    title: string;
    description: string;
    iconUrl: string;
    detailEyebrow: string;
    detailTitle: string;
    detailDescription: string;
    detailHeroNote: string;
    detailCtaLabel: string;
    detailCtaUrl: string;
    detailHighlights: string[];
    detailStats: Array<{
      value: string;
      label: string;
    }>;
    detailSections: Array<{
      title: string;
      description: string;
    }>;
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
    video?: string;
  }>;
};

export type TestimonialCardsCmsContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  stories: Array<{
    title: string;
    name: string;
    company: string;
    image: string;
    quote: string;
    video?: string;
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
  heroVideoUrl:
    "https://www.youtube.com/embed/YaiT6rz5YRA?autoplay=1&mute=1&loop=1&playlist=YaiT6rz5YRA&rel=0&playsinline=1",
};

export const defaultAboutContent: AboutCmsContent = {
  eyebrow: "About RoboBooks",
  title: "Accounting Software That Keeps Every Number in Sync",
  description:
    "RoboBooks is an accounting SaaS platform built for businesses that want faster bookkeeping, cleaner compliance, and complete control over cash flow. From invoices to tax-ready reports, every workflow stays connected in one simple dashboard.",
  heroImageUrl: "/images/homehero.png",
  dashboardImageUrl: "/images/dashboard.png",
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

export function normalizeFooterCmsContent(
  content?: Partial<FooterCmsContent> | null
): FooterCmsContent {
  const merged = {
    ...defaultFooterContent,
    ...(content || {}),
    productLinks: content?.productLinks || defaultFooterContent.productLinks,
    companyLinks: content?.companyLinks || defaultFooterContent.companyLinks,
    legalLinks: content?.legalLinks || defaultFooterContent.legalLinks,
    extraGroups: content?.extraGroups || defaultFooterContent.extraGroups,
  };

  return normalizeFooterLinkGroups(merged);
}

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

export function createGenericFooterPageCmsContent({
  slug,
  label,
  category,
  href,
}: {
  slug: string;
  label: string;
  category: FooterPageCmsContent["category"];
  href: string;
}): FooterPageCmsContent {
  const eyebrowMap: Record<FooterPageCmsContent["category"], string> = {
    product: "Product",
    company: "Company",
    legal: "Legal",
  };

  return {
    slug,
    label,
    category,
    eyebrow: eyebrowMap[category],
    title: `${label} with RoboBooks`,
    description: `Use this page to explore ${label.toLowerCase()} related information managed from the footer CMS.`,
    summary: `This page was generated from the footer section so every internal footer link can open its own managed content page without extra hardcoding.`,
    highlights: [
      `${label} content can be managed directly from the footer CMS`,
      `This route stays linked to the ${category} footer group`,
      `You can replace this placeholder copy with your final content anytime`,
    ],
    cta: {
      href: href || "/contact",
      label: `Open ${label}`,
    },
  };
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
      eyebrow: "Invoice Automation",
      detailTitle: "Launch polished invoices and payment reminders from one workspace",
      detail:
        "Build branded GST invoices, schedule recurring billing, track due payments, and send timely follow-ups without switching between tools or spreadsheets.",
      detailExtended:
        "This helps finance teams shorten billing cycles, present a more professional customer experience, and reduce the manual chasing that usually slows collections. Whether you send a handful of invoices each week or manage high-volume recurring billing, RoboBooks keeps the process faster, cleaner, and easier to track.",
      heroImageUrl: "/images/invoicing.png",
      points: [
        "Custom invoice themes and GST-ready fields",
        "Recurring invoices with reminder workflows",
        "Faster collections with payment status visibility",
      ],
      highlights: [
        "Create polished invoices with consistent branding and tax-ready structure",
        "Automate recurring billing for retainers, subscriptions, and repeat customers",
        "Track due dates and unpaid invoices before follow-ups become urgent",
      ],
      useCases: [
        "Agencies sending monthly retainers and project invoices",
        "Distributors managing frequent GST billing across customers",
        "Service teams that need reminders without manual calling or email follow-up",
      ],
    },
    {
      slug: "cash-flow-tracking",
      title: "Cash Flow Tracking",
      description:
        "Monitor receivables, payouts, and payment cycles from one live financial command center that helps you plan daily cash positions confidently.",
      ctaLabel: "Available in RoboBooks",
      iconUrl: "",
      eyebrow: "Cash Visibility",
      detailTitle: "See incoming and outgoing money in one live finance view",
      detail:
        "Follow receivables, upcoming payments, and settlement trends so your team can act early, reduce delays, and keep liquidity under control.",
      detailExtended:
        "Instead of reacting only at month-end, your team gets a working view of how cash is moving through the business every day. That makes it easier to plan vendor payouts, chase overdue collections, and avoid short-term cash pressure before it affects operations.",
      heroImageUrl: "/images/Cash Flow Tracking.png",
      points: [
        "Real-time receivable and payable tracking",
        "Payment cycle monitoring across customers and vendors",
        "Operational visibility for faster finance decisions",
      ],
      highlights: [
        "Monitor receivables and payables from one practical working dashboard",
        "Spot delayed collections and upcoming payouts before they create pressure",
        "Support better short-term planning with live settlement visibility",
      ],
      useCases: [
        "Businesses that manage daily vendor payouts alongside customer collections",
        "Teams that need better cash planning during busy billing cycles",
        "Owners who want a quick operating view without reading multiple reports",
      ],
    },
    {
      slug: "inventory-control",
      title: "Inventory Control",
      description:
        "Track stock movement, reorder levels, valuation, and invoice-linked inventory updates in real time to avoid shortages and overstock.",
      ctaLabel: "Available in RoboBooks",
      iconUrl: "",
      eyebrow: "Stock Accuracy",
      detailTitle: "Keep inventory synced with billing, sales, and reorder planning",
      detail:
        "Monitor stock movement, value inventory correctly, and reduce stockouts with product-level control connected directly to your billing and accounting flow.",
      detailExtended:
        "When inventory, invoicing, and accounting stay aligned, teams can make stronger purchasing decisions and respond faster to demand changes. RoboBooks helps reduce mismatches between physical stock and financial records while giving clearer visibility into availability, reorder timing, and item-level value.",
      heroImageUrl: "/images/Inventory Control.png",
      points: [
        "Track stock movement with invoice-linked updates",
        "Follow reorder alerts before shortages happen",
        "Review valuation and item-level availability instantly",
      ],
      highlights: [
        "Keep sales activity and stock movement updated together in real time",
        "Use reorder visibility to prevent avoidable shortages and rush purchases",
        "Review valuation with better accuracy for finance and operations teams",
      ],
      useCases: [
        "Retail and trading businesses managing fast-moving product lines",
        "Wholesalers that need invoice-linked stock updates across teams",
        "Operations teams balancing reorder planning with margin awareness",
      ],
    },
    {
      slug: "customer-vendor-books",
      title: "Customer & Vendor Books",
      description:
        "Keep ledgers, payment history, tax details, and outstanding balances organized for every customer and vendor relationship.",
      ctaLabel: "Available in RoboBooks",
      iconUrl: "",
      eyebrow: "Relationship Records",
      detailTitle: "Maintain complete books for every customer and vendor",
      detail:
        "Store ledgers, transaction history, balances, and tax information in a clean relationship view that helps your team respond faster and with better context.",
      detailExtended:
        "With every relationship record organized in one place, your finance and operations teams spend less time searching through entries and more time acting on them. RoboBooks makes it easier to review dues, confirm payment history, answer account questions, and maintain cleaner long-term records.",
      heroImageUrl: "/images/GSR & Vendor.png",
      points: [
        "Centralized ledgers and outstanding balances",
        "Payment history with contextual business records",
        "Clean GST and tax detail management",
      ],
      highlights: [
        "Bring balances, ledger activity, and tax details into one shared record",
        "Reduce confusion when checking dues, adjustments, and payment history",
        "Help teams respond faster with cleaner customer and vendor context",
      ],
      useCases: [
        "Businesses handling repeat customers with ongoing outstanding balances",
        "Purchase teams reviewing vendor dues and transaction history regularly",
        "Finance staff who need quick account context before calls or reconciliations",
      ],
    },
    {
      slug: "gst-compliance",
      title: "GST & Compliance",
      description:
        "Generate tax-ready reports, reconcile entries, and stay prepared for GST filing with less manual effort and fewer missed details.",
      ctaLabel: "Available in RoboBooks",
      iconUrl: "",
      eyebrow: "Compliance Ready",
      detailTitle: "Prepare returns, reports, and reconciliations with less manual effort",
      detail:
        "Generate GST-ready summaries, keep records aligned, and simplify month-end compliance tasks with guided accounting support and cleaner reporting.",
      detailExtended:
        "Compliance work becomes easier when the underlying records are already structured correctly. RoboBooks helps teams reduce manual compilation, keep reporting cleaner throughout the month, and approach filing timelines with more confidence and fewer last-minute corrections.",
      heroImageUrl: "/images/dashboard.png",
      points: [
        "GST-ready exports and reporting structure",
        "Faster reconciliation across entries and tax data",
        "Cleaner filing preparation for finance teams",
      ],
      highlights: [
        "Prepare tax-ready summaries without rebuilding reports from scratch",
        "Reduce reconciliation effort by keeping entries and tax records aligned",
        "Support month-end filing with cleaner data and fewer missed details",
      ],
      useCases: [
        "Finance teams preparing monthly GST reviews and return workflows",
        "Businesses that want fewer compliance delays at month-end",
        "Accountants reconciling entries before filing and audit preparation",
      ],
    },
    {
      slug: "decision-dashboards",
      title: "Decision Dashboards",
      description:
        "Turn accounting activity into clear trends, margin snapshots, and business performance insights your team can use for faster decisions.",
      ctaLabel: "Available in RoboBooks",
      iconUrl: "",
      eyebrow: "Insight Engine",
      detailTitle: "Turn accounting data into clear decision-ready dashboards",
      detail:
        "Watch growth, margins, collections, and performance trends from a visual dashboard built for owners, finance teams, and day-to-day operators.",
      detailExtended:
        "Instead of reading through scattered reports, teams get a clearer story of how the business is performing. RoboBooks turns accounting activity into practical visual insight so leaders can spot movement early, compare trends, and make more confident operational and financial decisions.",
      heroImageUrl: "/images/Decision Dashboards.png",
      points: [
        "Visual trend monitoring across business metrics",
        "Margin and performance snapshot reporting",
        "Quick insight sharing for smarter planning",
      ],
      highlights: [
        "Translate accounting activity into visual trends your team can act on",
        "Review margins, collections, and performance from one reporting layer",
        "Support planning conversations with clearer numbers and faster context",
      ],
      useCases: [
        "Founders reviewing business health without digging through raw ledgers",
        "Finance teams sharing clear trend snapshots with management",
        "Operators tracking collections, performance, and margin movement together",
      ],
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

export function normalizeServiceCard(
  card: Partial<ServiceCardCmsContent> | undefined
): ServiceCardCmsContent {
  return {
    slug: card?.slug?.trim() || "",
    title: card?.title?.trim() || "",
    description: card?.description?.trim() || "",
    ctaLabel: card?.ctaLabel?.trim() || "Available in RoboBooks",
    iconUrl: card?.iconUrl?.trim() || "",
    eyebrow: card?.eyebrow?.trim() || "",
    detailTitle: card?.detailTitle?.trim() || card?.title?.trim() || "",
    detail: card?.detail?.trim() || card?.description?.trim() || "",
    detailExtended: card?.detailExtended?.trim() || "",
    heroImageUrl: card?.heroImageUrl || "",
    points: Array.isArray(card?.points) ? card.points : [],
    highlights: Array.isArray(card?.highlights) ? card.highlights : [],
    useCases: Array.isArray(card?.useCases) ? card.useCases : [],
  };
}

function isRenderableServiceCard(card: ServiceCardCmsContent) {
  return Boolean(card.slug && card.title && card.description);
}

export function normalizeServicesContent(content: ServicesCmsContent): ServicesCmsContent {
  return {
    ...content,
    cards: Array.isArray(content.cards)
      ? content.cards
          .map((card) => normalizeServiceCard(card))
          .filter((card) => isRenderableServiceCard(card))
      : defaultServicesContent.cards
          .map((card) => normalizeServiceCard(card))
          .filter((card) => isRenderableServiceCard(card)),
  };
}

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

function slugifyFeatureTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type FeatureCardContent = FeaturesCmsContent["cards"][number];

function createFeatureCard(card: Partial<FeatureCardContent> & Pick<FeatureCardContent, "title" | "description">): FeatureCardContent {
  const baseTitle = card.title || "Feature";

  return {
    slug: card.slug || slugifyFeatureTitle(baseTitle),
    title: baseTitle,
    description: card.description,
    iconUrl: card.iconUrl || "",
    detailEyebrow: card.detailEyebrow || "Feature Detail",
    detailTitle: card.detailTitle || baseTitle,
    detailDescription:
      card.detailDescription ||
      `${baseTitle} helps finance teams move faster with cleaner execution and better visibility.`,
    detailHeroNote:
      card.detailHeroNote ||
      "Built to reduce manual effort while keeping accounting teams in control of every step.",
    detailCtaLabel: card.detailCtaLabel || "Request a demo",
    detailCtaUrl: card.detailCtaUrl || "/contact",
    detailHighlights:
      card.detailHighlights && card.detailHighlights.length > 0
        ? card.detailHighlights
        : [
            `Use ${baseTitle.toLowerCase()} in one connected workflow.`,
            "Reduce manual coordination and improve day-to-day accuracy.",
            "Give teams better visibility with cleaner operational control.",
          ],
    detailStats:
      card.detailStats && card.detailStats.length > 0
        ? card.detailStats
        : [
            { value: "Faster", label: "Execution" },
            { value: "Clearer", label: "Visibility" },
            { value: "Lower", label: "Manual effort" },
          ],
    detailSections:
      card.detailSections && card.detailSections.length > 0
        ? card.detailSections
        : [
            {
              title: "Why teams use it",
              description:
                "It keeps daily accounting work structured, easier to review, and more reliable as transaction volume grows.",
            },
            {
              title: "What improves",
              description:
                "Teams spend less time following up manually and more time acting on current financial information.",
            },
            {
              title: "Where it fits",
              description:
                "It supports businesses that want billing, bookkeeping, reporting, and approvals to stay aligned in one workflow.",
            },
          ],
  };
}

const defaultFeatureCards: FeatureCardContent[] = [
  createFeatureCard({
    slug: "customer-accounts",
    title: "Customer Accounts",
    description:
      "Maintain customer ledgers, credits, dues, and GST details with complete visibility.",
    detailEyebrow: "Receivables Control",
    detailTitle: "Customer accounts that keep every ledger conversation clear",
    detailDescription:
      "Track balances, pending dues, credits, GST details, and customer-wise history from one place so collections stay proactive instead of reactive.",
    detailHeroNote:
      "Ideal for businesses that want stronger follow-ups without losing ledger accuracy.",
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
  }),
  createFeatureCard({
    slug: "bank-reconciliation",
    title: "Bank Reconciliation",
    description:
      "Match bank activity against books faster and reduce month-end closing effort.",
    detailEyebrow: "Banking Accuracy",
    detailTitle: "Bank reconciliation without month-end chaos",
    detailDescription:
      "Compare bank activity with book entries in a more structured way so unmatched transactions are easier to identify, review, and close on time.",
    detailHeroNote:
      "Useful for teams that want cleaner monthly close and fewer surprise mismatches.",
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
  }),
  createFeatureCard({
    slug: "purchase-workflows",
    title: "Purchase Workflows",
    description:
      "Handle purchase orders, bills, and vendor liabilities from one connected process.",
    detailEyebrow: "Procurement Flow",
    detailTitle: "Purchase workflows that stay connected from order to payable",
    detailDescription:
      "Manage purchasing steps with better continuity so vendor commitments, bills, and liabilities remain easier to monitor and approve.",
    detailHeroNote:
      "Designed for teams that want tighter purchasing discipline and cleaner payable visibility.",
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
  }),
  createFeatureCard({
    slug: "recurring-billing",
    title: "Recurring Billing",
    description:
      "Automate subscription invoices, due date alerts, and consistent payment collection.",
    detailEyebrow: "Revenue Continuity",
    detailTitle: "Recurring billing that keeps repeat revenue disciplined",
    detailDescription:
      "Handle repeat invoicing cycles with more consistency so billing dates, reminders, and collections feel controlled instead of manual.",
    detailHeroNote:
      "A strong fit for service businesses, retainers, subscriptions, and periodic contracts.",
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
  }),
  createFeatureCard({
    slug: "tax-ready-reports",
    title: "Tax-Ready Reports",
    description:
      "Export clean summaries for GST, audits, and internal reviews without manual cleanup.",
    detailEyebrow: "Compliance Readiness",
    detailTitle: "Tax-ready reports that reduce last-minute cleanup",
    detailDescription:
      "Generate cleaner financial and tax-related summaries so GST filing, audits, and management reviews can move with better confidence and less manual rework.",
    detailHeroNote:
      "Especially valuable for teams handling regular compliance deadlines and audit requests.",
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
  }),
  createFeatureCard({
    slug: "inventory-linking",
    title: "Inventory Linking",
    description:
      "Connect stock movement directly to sales and purchase entries to avoid blind spots.",
    detailEyebrow: "Stock Connected Finance",
    detailTitle: "Inventory linking that keeps stock and books aligned",
    detailDescription:
      "Bring inventory movement closer to accounting activity so purchases, sales, and stock visibility stay more synchronized across the business.",
    detailHeroNote:
      "Helpful for businesses where stock accuracy directly affects margins and cash planning.",
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
  }),
  createFeatureCard({
    slug: "growth-analytics",
    title: "Growth Analytics",
    description:
      "Understand margins, revenue trends, and business health with executive-friendly dashboards.",
    detailEyebrow: "Decision Insight",
    detailTitle: "Growth analytics that turns finance data into action",
    detailDescription:
      "See revenue movement, margin patterns, and business performance signals in a format leaders can understand quickly and use with confidence.",
    detailHeroNote:
      "Built for owners and finance teams who want faster decisions from cleaner reporting.",
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
  }),
  createFeatureCard({
    slug: "bookkeeping-history",
    title: "Bookkeeping History",
    description:
      "Track every adjustment, approval, and transaction with structured accounting records.",
    detailEyebrow: "Accounting Trail",
    detailTitle: "Bookkeeping history that protects clarity and control",
    detailDescription:
      "Maintain a more dependable transaction trail so adjustments, approvals, and edits can be reviewed with context when questions arise.",
    detailHeroNote:
      "Important for teams that care about review discipline, accountability, and audit confidence.",
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
  }),
];

export function normalizeFeaturesContent(content: FeaturesCmsContent): FeaturesCmsContent {
  const normalizedCards = (content.cards || []).map((card, index) =>
    createFeatureCard({
      ...defaultFeatureCards[index],
      ...card,
      title: card?.title || defaultFeatureCards[index]?.title || `Feature ${index + 1}`,
      description:
        card?.description ||
        defaultFeatureCards[index]?.description ||
        "Discover how this RoboBooks capability improves financial workflows.",
    })
  );

  return {
    ...content,
    cards: normalizedCards.length > 0 ? normalizedCards : defaultFeatureCards,
  };
}

export function getFeatureCardBySlug(content: FeaturesCmsContent, slug: string) {
  return normalizeFeaturesContent(content).cards.find((card) => card.slug === slug) || null;
}

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
  cards: defaultFeatureCards,
};

type UsabilityCardContent = UsabilityCmsContent["cards"][number];

function slugifyUsabilityTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createUsabilityCard(
  card: Partial<UsabilityCardContent> | undefined,
  fallback?: Partial<UsabilityCardContent>
): UsabilityCardContent {
  const baseTitle = card?.title?.trim() || fallback?.title?.trim() || "Usability card";

  return {
    slug:
      card?.slug?.trim() ||
      fallback?.slug?.trim() ||
      slugifyUsabilityTitle(baseTitle),
    title: baseTitle,
    description:
      card?.description?.trim() ||
      fallback?.description?.trim() ||
      "Explain how this product experience benefit helps finance teams work with less friction.",
    iconUrl: card?.iconUrl?.trim() || fallback?.iconUrl?.trim() || "",
    detailEyebrow:
      card?.detailEyebrow?.trim() || fallback?.detailEyebrow?.trim() || "Product Experience",
    detailTitle: card?.detailTitle?.trim() || fallback?.detailTitle?.trim() || baseTitle,
    detailDescription:
      card?.detailDescription?.trim() ||
      fallback?.detailDescription?.trim() ||
      `${baseTitle} keeps accounting workflows clearer, easier to adopt, and faster to execute.`,
    detailHeroNote:
      card?.detailHeroNote?.trim() ||
      fallback?.detailHeroNote?.trim() ||
      "Built to remove friction from daily accounting work without making the product feel heavy.",
    detailCtaLabel:
      card?.detailCtaLabel?.trim() || fallback?.detailCtaLabel?.trim() || "Request a demo",
    detailCtaUrl: card?.detailCtaUrl?.trim() || fallback?.detailCtaUrl?.trim() || "/contact",
    detailHighlights:
      Array.isArray(card?.detailHighlights) && card.detailHighlights.length > 0
        ? card.detailHighlights
        : Array.isArray(fallback?.detailHighlights) && fallback.detailHighlights.length > 0
          ? fallback.detailHighlights
          : [
              `Use ${baseTitle.toLowerCase()} to keep finance actions easier to follow.`,
              "Reduce confusion across recurring accounting steps.",
              "Help teams move faster with clearer product guidance.",
            ],
    detailStats:
      Array.isArray(card?.detailStats) && card.detailStats.length > 0
        ? card.detailStats
        : Array.isArray(fallback?.detailStats) && fallback.detailStats.length > 0
          ? fallback.detailStats
          : [
              { value: "Faster", label: "Adoption" },
              { value: "Lower", label: "Confusion" },
              { value: "Better", label: "Daily flow" },
            ],
    detailSections:
      Array.isArray(card?.detailSections) && card.detailSections.length > 0
        ? card.detailSections
        : Array.isArray(fallback?.detailSections) && fallback.detailSections.length > 0
          ? fallback.detailSections
          : [
              {
                title: "Why it matters",
                description:
                  "The experience stays practical, guided, and easier for teams to understand during daily work.",
              },
              {
                title: "What improves",
                description:
                  "Routine finance actions become easier to complete without extra explanation or retraining.",
              },
              {
                title: "Where it helps",
                description:
                  "It supports accounting-heavy teams that want speed without losing clarity.",
              },
            ],
  };
}

function isRenderableUsabilityCard(card: UsabilityCardContent) {
  return Boolean(card.slug && card.title && card.description);
}

export const defaultUsabilityContent: UsabilityCmsContent = {
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
};

export function normalizeUsabilityContent(content: UsabilityCmsContent): UsabilityCmsContent {
  const fallbackCards = defaultUsabilityContent.cards
    .map((card) => createUsabilityCard(card))
    .filter((card) => isRenderableUsabilityCard(card));

  const normalizedCards = Array.isArray(content.cards)
    ? content.cards
        .map((card, index) => createUsabilityCard(card, defaultUsabilityContent.cards[index]))
        .filter((card) => isRenderableUsabilityCard(card))
    : [];

  return {
    ...content,
    eyebrow: content.eyebrow?.trim() || defaultUsabilityContent.eyebrow,
    title: content.title?.trim() || defaultUsabilityContent.title,
    description: content.description?.trim() || defaultUsabilityContent.description,
    cards: normalizedCards.length > 0 ? normalizedCards : fallbackCards,
  };
}

export function getUsabilityCardBySlug(content: UsabilityCmsContent, slug: string) {
  return normalizeUsabilityContent(content).cards.find((card) => card.slug === slug) || null;
}

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
};

export const defaultTestimonialCardsContent: TestimonialCardsCmsContent = {
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
