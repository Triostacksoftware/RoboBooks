import { api } from "@/lib/api";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function resolveCmsAssetUrl(pathOrUrl: string) {
  if (!pathOrUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
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
};

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

type CmsResponse<T> = {
  success: boolean;
  section: string;
  content: T;
  updatedAt?: string | null;
};

export async function fetchPublicCmsSection<T>(
  section: "hero" | "about" | "invoiceThemes" | "services",
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
    return data.content || fallback;
  } catch {
    return fallback;
  }
}

export async function fetchAdminCmsSection<T>(
  section: "hero" | "about" | "invoiceThemes" | "services"
) {
  return api<CmsResponse<T>>(`/api/admin/cms/${section}`);
}

export async function updateAdminCmsSection<T>(
  section: "hero" | "about" | "invoiceThemes" | "services",
  content: T
) {
  return api<CmsResponse<T>>(`/api/admin/cms/${section}`, {
    method: "PUT",
    json: { content },
  });
}

export async function uploadAdminCmsImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return api<{ success: boolean; message: string; url: string; filename: string }>(
    "/api/admin/cms/upload-image",
    {
      method: "POST",
      body: formData,
    }
  );
}
