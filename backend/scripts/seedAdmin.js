import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

dotenv.config();

const ROLE_PERMISSIONS = {
  super_admin: [
    "manage_users",
    "manage_admins",
    "view_analytics",
    "manage_content",
    "manage_settings",
    "view_reports",
    "manage_billing",
  ],
  admin: [
    "manage_users",
    "view_analytics",
    "manage_content",
    "manage_settings",
    "view_reports",
    "manage_billing",
  ],
  moderator: [
    "view_analytics",
    "view_reports",
  ],
};

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith("--")) continue;

    const key = current.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = "true";
      continue;
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

function getConfig() {
  const args = parseArgs(process.argv.slice(2));

  const email = (args.email || process.env.ADMIN_EMAIL || "admin@robobooks.com").toLowerCase();
  const password = args.password || process.env.ADMIN_PASSWORD || "admin123";
  const firstName = args.firstName || process.env.ADMIN_FIRST_NAME || "Super";
  const lastName = args.lastName || process.env.ADMIN_LAST_NAME || "Admin";
  const role = args.role || process.env.ADMIN_ROLE || "super_admin";
  const department = args.department || process.env.ADMIN_DEPARTMENT || "Administration";
  const phone = args.phone || process.env.ADMIN_PHONE || "";

  if (!ROLE_PERMISSIONS[role]) {
    throw new Error(`Invalid role "${role}". Use super_admin, admin, or moderator.`);
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  return {
    email,
    password,
    firstName,
    lastName,
    role,
    department,
    phone,
    permissions: ROLE_PERMISSIONS[role],
  };
}

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "robobooks",
  });
}

async function seedAdmin() {
  const config = getConfig();

  await connectDB();

  const existingAdmin = await Admin.findOne({ email: config.email });

  if (existingAdmin) {
    existingAdmin.firstName = config.firstName;
    existingAdmin.lastName = config.lastName;
    existingAdmin.role = config.role;
    existingAdmin.department = config.department;
    existingAdmin.phone = config.phone;
    existingAdmin.permissions = config.permissions;
    existingAdmin.isActive = true;

    if (config.password) {
      await existingAdmin.hashPassword(config.password);
    }

    await existingAdmin.save();

    console.log("Admin updated successfully");
    console.log(`Email: ${existingAdmin.email}`);
    console.log(`Password: ${config.password}`);
    console.log(`Role: ${existingAdmin.role}`);
    return;
  }

  const admin = new Admin({
    firstName: config.firstName,
    lastName: config.lastName,
    email: config.email,
    role: config.role,
    department: config.department,
    phone: config.phone,
    permissions: config.permissions,
    isActive: true,
    passwordHash: "temp",
  });

  await admin.hashPassword(config.password);
  await admin.save();

  console.log("Admin created successfully");
  console.log(`Email: ${admin.email}`);
  console.log(`Password: ${config.password}`);
  console.log(`Role: ${admin.role}`);
}

async function main() {
  try {
    await seedAdmin();
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
