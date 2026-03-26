import express from "express";
import Admin from "../models/Admin.js";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getChartOfAccountsStats,
} from "../controllers/adminController.js";
import {
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  getUserStats,
} from "../controllers/userController.js";
import {
  adminAuthGuard,
  superAdminGuard,
  adminRoleGuard,
  requirePermission,
} from "../middleware/adminAuth.js";
import {
  getAllCmsSections,
  getCmsSection,
  upsertCmsSection,
  uploadCmsImage,
  uploadCmsImageMiddleware,
} from "../controllers/cmsController.js";
import Bill from "../models/Bill.js";
import Invoice from "../models/invoicemodel.js";
import Payment from "../models/Payment.js";
import RecurringBill from "../models/RecurringBill.js";
import {
  getAdminReports,
  createAdminReport,
  generateAdminReport,
} from "../controllers/adminReportController.js";

const router = express.Router();

// Public routes
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

router.get("/cms", adminAuthGuard, requirePermission("manage_content"), getAllCmsSections);
router.post(
  "/cms/upload-image",
  adminAuthGuard,
  requirePermission("manage_content"),
  uploadCmsImageMiddleware,
  uploadCmsImage
);
router.get("/cms/:section", adminAuthGuard, requirePermission("manage_content"), getCmsSection);
router.put("/cms/:section", adminAuthGuard, requirePermission("manage_content"), upsertCmsSection);
router.get("/reports", adminAuthGuard, requirePermission("view_reports"), getAdminReports);
router.post("/reports", adminAuthGuard, requirePermission("view_reports"), createAdminReport);
router.post(
  "/reports/:id/generate",
  adminAuthGuard,
  requirePermission("view_reports"),
  generateAdminReport
);

// Simple admin creation route (for testing - remove in production)
router.post("/create-simple", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role = "admin",
      permissions = ["view_analytics"],
      department,
      phone,
      isActive = true,
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,     
        message:
          "All fields are required: firstName, lastName, email, password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Validate role
    const validRoles = ["super_admin", "admin", "moderator"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
      });
    }

    // Validate permissions
    const validPermissions = [
      "manage_users",
      "manage_admins",
      "view_analytics",
      "manage_content",
      "manage_settings",
      "view_reports",
      "manage_billing",
    ];

    if (permissions && Array.isArray(permissions)) {
      const invalidPermissions = permissions.filter(
        (p) => !validPermissions.includes(p)
      );
      if (invalidPermissions.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid permissions: ${invalidPermissions.join(
            ", "
          )}. Valid permissions: ${validPermissions.join(", ")}`,
        });
      }
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // Create new admin
    const admin = new Admin({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      role: role,
      permissions: permissions || [],
      department: department$.trim(),
      phone: phone$.trim(),
      isActive: isActive,
    });

    // Hash password
    await admin.hashPassword(password);
    await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        department: admin.department,
        phone: admin.phone,
        isActive: admin.isActive,
        createdAt: admin.createdAt,
      },
    });
  } catch (err) {
    console.error("Create simple admin error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create admin",
      error: err.message,
    });
  }
});

// Bulk admin creation endpoint
router.post("/create-bulk", async (req, res) => {
  try {
    const { admins } = req.body;

    if (!Array.isArray(admins) || admins.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Admins array is required and must not be empty",
      });
    }

    const results = [];
    const errors = [];

    for (let i = 0; i < admins.length; i++) {
      const adminData = admins[i];
      try {
        const {
          firstName,
          lastName,
          email,
          password,
          role = "admin",
          permissions = ["view_analytics"],
          department,
          phone,
          isActive = true,
        } = adminData;

        // Basic validation
        if (!firstName || !lastName || !email || !password) {
          errors.push({
            index: i,
            error:
              "All fields are required: firstName, lastName, email, password",
          });
          continue;
        }

        if (password.length < 6) {
          errors.push({
            index: i,
            error: "Password must be at least 6 characters",
          });
          continue;
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({
          email: email.toLowerCase(),
        });
        if (existingAdmin) {
          errors.push({
            index: i,
            error: "Admin with this email already exists",
          });
          continue;
        }

        // Create new admin
        const admin = new Admin({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.toLowerCase().trim(),
          role: role,
          permissions: permissions || [],
          department: department$.trim(),
          phone: phone$.trim(),
          isActive: isActive,
        });

        // Hash password
        await admin.hashPassword(password);
        await admin.save();

        results.push({
          index: i,
          success: true,
          admin: {
            id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            fullName: admin.fullName,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions,
            department: admin.department,
            phone: admin.phone,
            isActive: admin.isActive,
            createdAt: admin.createdAt,
          },
        });
      } catch (err) {
        errors.push({
          index: i,
          error: err.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Processed ${admins.length} admins. ${results.length} created successfully, ${errors.length} failed.`,
      results,
      errors,
    });
  } catch (err) {
    console.error("Bulk create admin error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to process bulk admin creation",
      error: err.message,
    });
  }
});

// Protected routes - require admin authentication
router.get("/profile", adminAuthGuard, getAdminProfile);
router.put("/profile", adminAuthGuard, updateAdminProfile);
router.put("/change-password", adminAuthGuard, changeAdminPassword);

// Admin management routes - require super admin
router.get("/admins", adminAuthGuard, superAdminGuard, getAllAdmins);
router.post("/admins", adminAuthGuard, superAdminGuard, createAdmin);
router.put("/admins/:id", adminAuthGuard, superAdminGuard, updateAdmin);
router.delete("/admins/:id", adminAuthGuard, superAdminGuard, deleteAdmin);

// Analytics and dashboard routes
router.get(
  "/dashboard/stats",
  adminAuthGuard,
  requirePermission("view_analytics"),
  async (req, res) => {
    try {
      // Import models for analytics
      const User = (await import("../models/User.js")).default;
      const Invoice = (await import("../models/invoicemodel.js")).default;
      const Project = (await import("../models/projectmodel.js")).default;
      const Timesheet = (await import("../models/timesheetmodel.js")).default;

      // Get basic stats
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ isActive: true });

      // Get revenue stats (from invoices)
      const totalRevenue = await Invoice.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);

      // Get monthly growth
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      const currentMonthUsers = await User.countDocuments({
        createdAt: { $gte: thirtyDaysAgo },
      });
      const previousMonthUsers = await User.countDocuments({
        createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
      });

      const monthlyGrowth =
        previousMonthUsers > 0
          ? ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) *
            100
          : 0;

      // Get project stats
      const totalProjects = await Project.countDocuments();
      const activeProjects = await Project.countDocuments({ status: "active" });

      // Get timesheet stats
      const totalHours = await Timesheet.aggregate([
        { $group: { _id: null, total: { $sum: "$hours" } } },
      ]);

      res.json({
        success: true,
        stats: {
          totalUsers,
          activeUsers,
          totalRevenue: totalRevenue[0]?.total || 0,
          monthlyGrowth: Math.round(monthlyGrowth * 100) / 100,
          totalProjects,
          activeProjects,
          totalHours: totalHours[0]?.total || 0,
        },
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch dashboard stats" });
    }
  }
);

// Chart of Accounts stats route
router.get(
  "/chart-of-accounts/stats",
  adminAuthGuard,
  requirePermission("view_analytics"),
  getChartOfAccountsStats
);

// User management routes
router.get(
  "/users",
  adminAuthGuard,
  requirePermission("manage_users"),
  getAllUsers
);
router.get(
  "/users/:id",
  adminAuthGuard,
  requirePermission("manage_users"),
  getUserById
);
router.put(
  "/users/:id/status",
  adminAuthGuard,
  requirePermission("manage_users"),
  updateUserStatus
);
router.delete(
  "/users/:id",
  adminAuthGuard,
  requirePermission("manage_users"),
  deleteUser
);
router.get(
  "/users/stats",
  adminAuthGuard,
  requirePermission("view_analytics"),
  getUserStats
);

// Reports routes
router.get(
  "/reports",
  adminAuthGuard,
  requirePermission("view_reports"),
  async (req, res) => {
    try {
      // Mock reports data - in production, this would fetch from a reports collection
      const reports = [
        {
          id: 1,
          name: "User Activity Report",
          type: "Analytics",
          lastGenerated: "2024-01-15",
          status: "completed",
          size: "2.3 MB",
          description: "Detailed user activity and engagement metrics",
        },
        {
          id: 2,
          name: "Revenue Summary",
          type: "Financial",
          lastGenerated: "2024-01-14",
          status: "completed",
          size: "1.8 MB",
          description: "Revenue, expenses, and profit analysis",
        },
        {
          id: 3,
          name: "System Performance",
          type: "Technical",
          lastGenerated: "2024-01-13",
          status: "processing",
          size: "0.5 MB",
          description: "Performance and uptime statistics",
        },
        {
          id: 4,
          name: "Security Audit",
          type: "Security",
          lastGenerated: "2024-01-12",
          status: "completed",
          size: "1.2 MB",
          description: "Security events and access logs",
        },
      ];

      res.json({
        success: true,
        reports,
      });
    } catch (error) {
      console.error("Reports error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch reports" });
    }
  }
);

// Billing management routes
router.get(
  "/billing",
  adminAuthGuard,
  requirePermission("manage_billing"),
  async (req, res) => {
    try {
      const [recurringBills, bills, invoices, payments] = await Promise.all([
        RecurringBill.find({}).sort({ nextDueDate: 1, createdAt: -1 }).limit(20).lean(),
        Bill.find({}).sort({ createdAt: -1 }).limit(20).lean(),
        Invoice.find({}).sort({ invoiceDate: -1, created_at: -1 }).limit(20).lean(),
        Payment.find({})
          .populate("billIds", "billNumber totalAmount status")
          .sort({ paymentDate: -1, createdAt: -1 })
          .limit(20)
          .lean(),
      ]);

      const monthlyRevenue = payments
        .filter((payment) => payment.status === "completed")
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);

      const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid").length;
      const overdueInvoices = invoices.filter((invoice) => invoice.status === "Overdue").length;
      const activeRecurringBills = recurringBills.filter(
        (bill) => bill.status === "active"
      ).length;

      const billingData = {
        recurringBills,
        bills,
        invoices,
        payments,
        stats: {
          monthlyRevenue,
          activeRecurringBills,
          paidInvoices,
          overdueInvoices,
          totalBills: bills.length,
          completedPayments: payments.filter((payment) => payment.status === "completed")
            .length,
        },
      };

      res.json({
        success: true,
        billingData,
      });
    } catch (error) {
      console.error("Billing data error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch billing data" });
    }
  }
);

router.get(
  "/billing/bills/:id",
  adminAuthGuard,
  requirePermission("manage_billing"),
  async (req, res) => {
    try {
      const bill = await Bill.findById(req.params.id).lean();

      if (!bill) {
        return res.status(404).json({ success: false, message: "Bill not found" });
      }

      res.json({ success: true, data: bill });
    } catch (error) {
      console.error("Admin bill detail error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch bill details" });
    }
  }
);

router.get(
  "/billing/invoices/:id",
  adminAuthGuard,
  requirePermission("manage_billing"),
  async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id).lean();

      if (!invoice) {
        return res.status(404).json({ success: false, message: "Invoice not found" });
      }

      res.json({ success: true, data: invoice });
    } catch (error) {
      console.error("Admin invoice detail error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch invoice details" });
    }
  }
);

router.get(
  "/billing/payments/:id",
  adminAuthGuard,
  requirePermission("manage_billing"),
  async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id)
        .populate("billIds", "billNumber totalAmount status")
        .lean();

      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }

      res.json({ success: true, data: payment });
    } catch (error) {
      console.error("Admin payment detail error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch payment details" });
    }
  }
);

router.post(
  "/billing/recurring-bills/:id/create-bill",
  adminAuthGuard,
  requirePermission("manage_billing"),
  async (req, res) => {
    try {
      const recurringBill = await RecurringBill.findById(req.params.id);

      if (!recurringBill) {
        return res.status(404).json({ success: false, message: "Recurring bill not found" });
      }

      if (recurringBill.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Only active recurring bills can generate a bill",
        });
      }

      const bill = recurringBill.createBill();
      await bill.save();

      recurringBill.nextDueDate = recurringBill.calculateNextDueDate();
      recurringBill.lastCreated = new Date();
      await recurringBill.save();

      res.json({
        success: true,
        message: "Bill generated successfully",
        data: bill,
      });
    } catch (error) {
      console.error("Admin create bill from recurring error:", error);
      res.status(500).json({ success: false, message: "Failed to generate bill" });
    }
  }
);

router.post(
  "/billing/bills/:id/pay",
  adminAuthGuard,
  requirePermission("manage_billing"),
  async (req, res) => {
    try {
      const bill = await Bill.findById(req.params.id);

      if (!bill) {
        return res.status(404).json({ success: false, message: "Bill not found" });
      }

      bill.status = "paid";
      bill.paidAt = new Date();
      await bill.save();

      res.json({
        success: true,
        message: "Bill marked as paid",
        data: bill,
      });
    } catch (error) {
      console.error("Admin mark bill paid error:", error);
      res.status(500).json({ success: false, message: "Failed to update bill status" });
    }
  }
);

router.post(
  "/billing/invoices/:id/mark-paid",
  adminAuthGuard,
  requirePermission("manage_billing"),
  async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);

      if (!invoice) {
        return res.status(404).json({ success: false, message: "Invoice not found" });
      }

      invoice.amountPaid = invoice.total || 0;
      invoice.balanceDue = 0;
      invoice.status = "Paid";
      await invoice.save();

      res.json({
        success: true,
        message: "Invoice marked as paid",
        data: invoice,
      });
    } catch (error) {
      console.error("Admin mark invoice paid error:", error);
      res.status(500).json({ success: false, message: "Failed to update invoice status" });
    }
  }
);

// Settings routes
router.get(
  "/settings",
  adminAuthGuard,
  requirePermission("manage_settings"),
  async (req, res) => {
    try {
      // Mock settings data - in production, this would fetch from a settings collection
      const settings = {
        general: {
          siteName: "RoboBooks Admin",
          siteDescription: "Business management platform",
          timezone: "UTC",
          language: "English",
        },
        security: {
          twoFactorAuth: true,
          sessionTimeout: 30,
          passwordPolicy: "strong",
          ipWhitelist: [],
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          reportFrequency: "weekly",
        },
        system: {
          maintenanceMode: false,
          debugMode: false,
          backupFrequency: "daily",
          logRetention: 30,
        },
      };

      res.json({
        success: true,
        settings,
      });
    } catch (error) {
      console.error("Settings error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch settings" });
    }
  }
);

router.put(
  "/settings",
  adminAuthGuard,
  requirePermission("manage_settings"),
  async (req, res) => {
    try {
      const { settings } = req.body;

      // In production, this would save to a settings collection
      // For now, just return success

      res.json({
        success: true,
        message: "Settings updated successfully",
      });
    } catch (error) {
      console.error("Update settings error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update settings" });
    }
  }
);

export default router;


