export type FooterCategory = "product" | "company" | "legal";

export type FooterLinkItem = {
  slug: string;
  label: string;
  category: FooterCategory;
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

type FooterNavLink = {
  label: string;
  href: string;
};

type FooterLinkGroups = {
  productLinks: FooterNavLink[];
  companyLinks: FooterNavLink[];
  legalLinks: FooterNavLink[];
};

export const footerLinks: FooterLinkItem[] = [
  {
    slug: "about-robobooks",
    label: "About RoboBooks",
    category: "product",
    eyebrow: "Product",
    title: "See how RoboBooks simplifies connected accounting work",
    description:
      "RoboBooks brings invoicing, bookkeeping, GST workflows, reports, and day-to-day finance operations together in one practical system for growing teams.",
    summary:
      "Learn how the platform is designed to reduce manual handoffs and give businesses a clearer view of financial activity.",
    highlights: [
      "Connected invoicing, books, and reporting workflows",
      "Built for operational speed and cleaner finance control",
      "Supports teams that need visibility across daily transactions",
    ],
    cta: {
      href: "/about",
      label: "Open about page",
    },
  },
  {
    slug: "book-a-demo",
    label: "Book a demo",
    category: "product",
    eyebrow: "Product",
    title: "Schedule a guided RoboBooks product walkthrough",
    description:
      "Use this page to move into a live demo flow where your team can explore the product, ask questions, and map RoboBooks to your workflow.",
    summary:
      "Best for businesses comparing software, planning onboarding, or reviewing how RoboBooks fits their accounting process.",
    highlights: [
      "Talk through invoicing, GST, and reporting use cases",
      "Review onboarding and implementation expectations",
      "Get a clearer fit assessment before rollout",
    ],
    cta: {
      href: "/contact",
      label: "Book your demo",
    },
  },
  {
    slug: "start-free-trial",
    label: "Start free trial",
    category: "product",
    eyebrow: "Product",
    title: "Start testing RoboBooks with your own workflow",
    description:
      "This route takes users into the registration experience so they can evaluate invoicing, bookkeeping, and compliance workflows firsthand.",
    summary:
      "A good path for teams that want to move from discovery into product evaluation quickly.",
    highlights: [
      "Fast path into sign-up and onboarding",
      "Useful for trial-led product exploration",
      "Helps teams validate fit with live usage",
    ],
    cta: {
      href: "/register",
      label: "Start free trial",
    },
  },
  {
    slug: "gstr-filing",
    label: "GSTR Filing",
    category: "product",
    eyebrow: "GST Tool",
    title: "Prepare and manage GSTR filing workflows with less friction",
    description:
      "RoboBooks helps businesses keep sales, tax data, and reporting steps connected so GSTR filing becomes easier to review and act on.",
    summary:
      "Built for teams that want more control over GST preparation without disconnected spreadsheets and manual follow-ups.",
    highlights: [
      "Structured filing-ready finance workflows",
      "Better visibility into tax-related transaction data",
      "Supports cleaner review before submission",
    ],
    cta: {
      href: "/services/gst-compliance",
      label: "Explore GST services",
    },
  },
  {
    slug: "e-invoicing",
    label: "E-Invoicing",
    category: "product",
    eyebrow: "GST Tool",
    title: "Make e-invoicing part of a connected sales workflow",
    description:
      "Instead of handling invoices and compliance in separate places, RoboBooks helps teams run e-invoicing in a cleaner operational flow.",
    summary:
      "Useful for businesses that want invoice generation, compliance readiness, and reporting context in one place.",
    highlights: [
      "Supports invoice-led compliance workflows",
      "Reduces duplicate effort across teams",
      "Keeps sales and finance operations aligned",
    ],
    cta: {
      href: "/services/smart-invoicing",
      label: "View invoicing workflows",
    },
  },
  {
    slug: "delivery-challan",
    label: "Delivery Challan",
    category: "product",
    eyebrow: "GST Tool",
    title: "Track delivery challan activity with better operational clarity",
    description:
      "RoboBooks supports document-driven workflows so dispatch, invoicing follow-up, and records stay easier to manage as business volume grows.",
    summary:
      "Designed for teams that want delivery movement and finance records to stay coordinated.",
    highlights: [
      "Useful for goods movement and dispatch records",
      "Helps finance and operations stay aligned",
      "Improves documentation consistency across teams",
    ],
    cta: {
      href: "/services/inventory-control",
      label: "Explore operations workflows",
    },
  },
  {
    slug: "data-export-to-sale",
    label: "Data Export to Sale",
    category: "product",
    eyebrow: "GST Tool",
    title: "Export sales-ready data without losing reporting context",
    description:
      "RoboBooks makes it easier to structure business data for downstream sales and finance use while keeping a clear source trail.",
    summary:
      "Helpful when teams need exports that are practical, understandable, and consistent across handoffs.",
    highlights: [
      "Simplifies handoff from accounting data to business actions",
      "Keeps exports more consistent and audit-friendly",
      "Supports smoother coordination across internal teams",
    ],
    cta: {
      href: "/services/decision-dashboards",
      label: "Explore reporting workflows",
    },
  },
  {
    slug: "bank-reconciliation",
    label: "Bank Reconciliation",
    category: "product",
    eyebrow: "GST Tool",
    title: "Reconcile bank activity with stronger day-to-day visibility",
    description:
      "Bank reconciliation in RoboBooks is designed to reduce confusion between records and actual movement so teams can close faster and with more confidence.",
    summary:
      "Ideal for businesses that need reliable transaction matching and cleaner month-end review.",
    highlights: [
      "Supports cleaner reconciliation workflows",
      "Improves cash visibility and review confidence",
      "Helps reduce manual finance follow-up",
    ],
    cta: {
      href: "/services/cash-flow-tracking",
      label: "Open reconciliation details",
    },
  },
  {
    slug: "import-export-of-data",
    label: "Import Export of Data",
    category: "product",
    eyebrow: "GST Tool",
    title: "Move finance data in and out without breaking workflow continuity",
    description:
      "RoboBooks supports import and export scenarios for teams that need migration, review, or structured sharing across systems and departments.",
    summary:
      "Useful during onboarding, system cleanup, bulk updates, and regular reporting operations.",
    highlights: [
      "Supports onboarding and migration use cases",
      "Makes structured review and sharing easier",
      "Helps maintain consistency across data operations",
    ],
    cta: {
      href: "/services/customer-vendor-books",
      label: "Explore data workflows",
    },
  },
  {
    slug: "multiple-financial-reporting",
    label: "Multiple Financial Reporting",
    category: "product",
    eyebrow: "GST Tool",
    title: "Review multiple financial reports from one connected system",
    description:
      "RoboBooks helps businesses move from raw transactions to management-ready reporting without switching between disconnected tools.",
    summary:
      "Built for teams that need clearer reporting outputs and a faster route from activity to decision support.",
    highlights: [
      "Supports broader financial visibility",
      "Connects reports back to transaction workflows",
      "Helps leadership review with more confidence",
    ],
    cta: {
      href: "/services/decision-dashboards",
      label: "View reporting services",
    },
  },
  {
    slug: "company",
    label: "Company",
    category: "company",
    eyebrow: "Company",
    title: "Learn about the team and direction behind RoboBooks",
    description:
      "This company route helps visitors understand the product vision, operating philosophy, and the kind of businesses RoboBooks is built to support.",
    summary:
      "A simple overview page that points people to broader brand and mission details.",
    highlights: [
      "Introduces the company behind the platform",
      "Explains product direction and business fit",
      "Supports trust-building for new visitors",
    ],
    cta: {
      href: "/about",
      label: "Visit company page",
    },
  },
  {
    slug: "contact",
    label: "Contact",
    category: "company",
    eyebrow: "Company",
    title: "Reach the RoboBooks team for product, support, or onboarding help",
    description:
      "Whether someone needs pricing context, a product walkthrough, or implementation guidance, this route provides a clear next step.",
    summary:
      "Designed to make support and sales conversations easier to start.",
    highlights: [
      "Useful for demos, support, and onboarding questions",
      "Direct path to reach the RoboBooks team",
      "Supports new and existing customer conversations",
    ],
    cta: {
      href: "/contact",
      label: "Go to contact page",
    },
  },
  {
    slug: "faq",
    label: "FAQ",
    category: "company",
    eyebrow: "Company",
    title: "Find quick answers before reaching out",
    description:
      "The FAQ path is for common product, onboarding, and workflow questions that users often ask while exploring RoboBooks.",
    summary:
      "A useful stop for visitors who want clarity before booking a demo or trial.",
    highlights: [
      "Answers common product questions quickly",
      "Reduces friction in the decision journey",
      "Helps users self-serve basic information",
    ],
    cta: {
      href: "/faq",
      label: "Open FAQ page",
    },
  },
  {
    slug: "terms",
    label: "Terms",
    category: "legal",
    eyebrow: "Legal",
    title: "Review the terms that guide platform usage",
    description:
      "This route gives visitors a simple summary of what responsible usage, billing, records, and access expectations look like in RoboBooks.",
    summary:
      "A legal entry point that helps users understand the basics before reading the full policy page.",
    highlights: [
      "Covers fair use and service expectations",
      "Sets context for account responsibilities",
      "Helps users locate the full legal terms page",
    ],
    cta: {
      href: "/legal/terms",
      label: "Read terms",
    },
  },
  {
    slug: "privacy",
    label: "Privacy",
    category: "legal",
    eyebrow: "Legal",
    title: "Understand how RoboBooks handles customer information",
    description:
      "This privacy route provides a short overview of data handling principles and directs visitors to the full privacy policy for complete details.",
    summary:
      "Useful for customers reviewing trust, compliance, and internal approval requirements.",
    highlights: [
      "Introduces high-level privacy expectations",
      "Supports trust and security conversations",
      "Provides a route to the full privacy policy",
    ],
    cta: {
      href: "/legal/privacy",
      label: "Read privacy policy",
    },
  },
  {
    slug: "cookies",
    label: "Cookies",
    category: "legal",
    eyebrow: "Legal",
    title: "See how cookies support product and site experience",
    description:
      "This route helps users understand how cookies may be used for essential experience, analytics, and product convenience.",
    summary:
      "A short explainer that points users to the full cookies policy when they need legal detail.",
    highlights: [
      "Explains cookie-related site behavior",
      "Supports transparency for visitors and teams",
      "Links into the full cookies policy",
    ],
    cta: {
      href: "/legal/cookies",
      label: "Read cookies policy",
    },
  },
];

export const footerCategories: { id: FooterCategory; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "company", label: "Company" },
  { id: "legal", label: "Legal" },
];

export function getFooterLinksByCategory(category: FooterCategory) {
  return footerLinks.filter((link) => link.category === category);
}

export function getFooterLinkBySlug(slug: string) {
  return footerLinks.find((link) => link.slug === slug);
}

export function getDefaultFooterPageContent(slug: string) {
  return getFooterLinkBySlug(slug) || null;
}

export function getPublicFooterHrefBySlug(slug: string) {
  return `/${slug}`;
}

export function normalizeFooterHref(href: string) {
  if (!href) {
    return href;
  }

  if (href.startsWith("/footer/")) {
    const slug = href.replace(/^\/footer\//, "").replace(/\/$/, "");
    return getPublicFooterHrefBySlug(slug);
  }

  if (href === "/legal/terms") {
    return "/terms";
  }

  if (href === "/legal/privacy") {
    return "/privacy";
  }

  if (href === "/legal/cookies") {
    return "/cookies";
  }

  return href;
}

export function normalizeFooterLinkGroups<T extends FooterLinkGroups>(content: T): T {
  return {
    ...content,
    productLinks: content.productLinks.map((link) => ({
      ...link,
      href: normalizeFooterHref(link.href),
    })),
    companyLinks: content.companyLinks.map((link) => ({
      ...link,
      href: normalizeFooterHref(link.href),
    })),
    legalLinks: content.legalLinks.map((link) => ({
      ...link,
      href: normalizeFooterHref(link.href),
    })),
  } as T;
}
