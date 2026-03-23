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

const cmsImageUpload = multer({
  storage: cmsImageStorage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for CMS uploads."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
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
};

function mergeWithDefaults(section, content = {}) {
  return {
    ...CMS_DEFAULTS[section],
    ...content,
  };
}

export const getCmsSection = async (req, res) => {
  try {
    const { section } = req.params;

    if (!CMS_DEFAULTS[section]) {
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

    if (!CMS_DEFAULTS[section]) {
      return res.status(404).json({ success: false, message: "CMS section not found" });
    }

    const payload = req.body?.content;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ success: false, message: "Content payload is required" });
    }

    const updated = await CmsContent.findOneAndUpdate(
      { section },
      {
        section,
        content: payload,
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
  const middleware = cmsImageUpload.single("image");

  middleware(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Image too large. Maximum size is 5MB.",
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
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded.",
      });
    }

    res.json({
      success: true,
      message: "CMS image uploaded successfully",
      url: `/uploads/cms/${req.file.filename}`,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("CMS image upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload CMS image" });
  }
};

export { CMS_DEFAULTS };
