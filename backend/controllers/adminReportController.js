import Report from "../models/Report.js";
import User from "../models/User.js";
import Customer from "../models/Customer.js";
import Invoice from "../models/invoicemodel.js";
import Admin from "../models/Admin.js";

export const getAdminReports = async (req, res) => {
  try {
    const reports = await Report.find({ createdBy: String(req.user.uid) }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error("Get admin reports error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin reports",
      error: error.message,
    });
  }
};

export const createAdminReport = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      parameters,
      filters,
      isPublic,
      schedule,
    } = req.body;

    const report = await Report.create({
      name,
      description,
      category,
      subCategory,
      parameters,
      filters,
      isPublic,
      schedule,
      type: "custom",
      createdBy: String(req.user.uid),
    });

    res.status(201).json({
      success: true,
      message: "Admin report created successfully",
      data: report,
    });
  } catch (error) {
    console.error("Create admin report error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create admin report",
      error: error.message,
    });
  }
};

export const generateAdminReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      createdBy: String(req.user.uid),
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const data = await buildAdminReport(report);

    report.lastRun = new Date();
    await report.save();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Generate admin report error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate admin report",
      error: error.message,
    });
  }
};

async function getPlatformSnapshot() {
  const [
    totalUsers,
    approvedUsers,
    pendingUsers,
    totalCustomers,
    activeCustomers,
    totalInvoices,
    invoiceTotals,
    recentUsers,
    recentInvoices,
    totalAdmins,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ approvalStatus: "approved" }),
    User.countDocuments({ approvalStatus: "pending" }),
    Customer.countDocuments(),
    Customer.countDocuments({ isActive: true }),
    Invoice.countDocuments(),
    Invoice.aggregate([
      {
        $group: {
          _id: null,
          grossRevenue: { $sum: { $ifNull: ["$total", 0] } },
          paidRevenue: {
            $sum: {
              $cond: [{ $eq: ["$status", "Paid"] }, { $ifNull: ["$total", 0] }, 0],
            },
          },
          unpaidCount: {
            $sum: {
              $cond: [{ $in: ["$status", ["Unpaid", "Overdue"]] }, 1, 0],
            },
          },
        },
      },
    ]),
    User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("companyName email approvalStatus createdAt"),
    Invoice.find()
      .sort({ created_at: -1 })
      .limit(5)
      .select("invoiceNumber customerName total status invoiceDate"),
    Admin.countDocuments({ isActive: true }),
  ]);

  const totals = invoiceTotals[0] || {};

  return {
    generatedAt: new Date().toISOString(),
    overview: {
      totalUsers,
      approvedUsers,
      pendingUsers,
      totalCustomers,
      activeCustomers,
      totalInvoices,
      totalAdmins,
      grossRevenue: totals.grossRevenue || 0,
      paidRevenue: totals.paidRevenue || 0,
      unpaidCount: totals.unpaidCount || 0,
    },
    recentUsers,
    recentInvoices,
  };
}

async function buildAdminReport(report) {
  const snapshot = await getPlatformSnapshot();

  switch (report.category) {
    case "business_overview":
      return {
        reportName: report.name,
        category: report.category,
        generatedAt: snapshot.generatedAt,
        summary: snapshot.overview,
        recentUsers: snapshot.recentUsers,
        recentInvoices: snapshot.recentInvoices,
      };

    case "sales":
      return {
        reportName: report.name,
        category: report.category,
        generatedAt: snapshot.generatedAt,
        salesSummary: {
          totalInvoices: snapshot.overview.totalInvoices,
          grossRevenue: snapshot.overview.grossRevenue,
          paidRevenue: snapshot.overview.paidRevenue,
          unpaidCount: snapshot.overview.unpaidCount,
        },
        recentInvoices: snapshot.recentInvoices,
      };

    case "purchases_expenses":
    case "accounting":
    case "gst_reports":
    case "activity":
      return {
        reportName: report.name,
        category: report.category,
        generatedAt: snapshot.generatedAt,
        summary: snapshot.overview,
        activity: {
          recentUsers: snapshot.recentUsers,
          recentInvoices: snapshot.recentInvoices,
        },
      };

    default:
      return {
        reportName: report.name,
        category: report.category,
        generatedAt: snapshot.generatedAt,
        message:
          "This template is using the default admin summary generator for now.",
        summary: snapshot.overview,
        recentUsers: snapshot.recentUsers,
        recentInvoices: snapshot.recentInvoices,
      };
  }
}
