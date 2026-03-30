import express from "express";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import PendingUser from "../models/PendingUser.js";
import { signToken, authGuard } from "../utils/jwt.js";
import { handleRefreshToken } from "../controllers/authController.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const DEMO_USER = {
  companyName: "RoboBooks Demo Workspace",
  email: "demo@robobooks.com",
  phone: "9999999999",
  phoneDialCode: "+91",
  phoneIso2: "IN",
  password: "Demo@12345",
  country: "India",
  state: "Karnataka",
};

// helper – issue http-only cookie
function issueCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  const isLocalhost =
    process.env.CLIENT_ORIGIN?.includes("localhost") ||
    process.env.FRONTEND_URL?.includes("localhost");

  // For localhost development, use 'lax' instead of 'none' to avoid secure requirement
  const sameSite = isProd ? "strict" : isLocalhost ? "lax" : "none";
  const secure = isProd || (!isLocalhost && sameSite === "none");

  res.cookie("rb_session", token, {
    httpOnly: true,
    sameSite: sameSite,
    secure: secure,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });

  console.log("🍪 Cookie set with options:", {
    sameSite,
    secure,
    isProd,
    isLocalhost,
    clientOrigin: process.env.CLIENT_ORIGIN,
    frontendUrl: process.env.FRONTEND_URL,
  });
}

// Validation helper
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+?/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  // Remove all non-digit characters and check length
  const cleanPhone = phone.replace(/\D/g, "");
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
}

async function ensureDemoUser(emailOrPhone, password) {
  const normalized = emailOrPhone?.trim().toLowerCase();
  const demoMatches =
    password === DEMO_USER.password &&
    (normalized === DEMO_USER.email || emailOrPhone?.trim() === DEMO_USER.phone);

  if (!demoMatches) {
    return null;
  }

  let user = await User.findOne({ email: DEMO_USER.email });
  if (user) {
    if (!user.passwordHash) {
      user.passwordHash = await bcrypt.hash(DEMO_USER.password, 12);
    }
    user.companyName = user.companyName || DEMO_USER.companyName;
    user.phone = user.phone || DEMO_USER.phone;
    user.phoneDialCode = user.phoneDialCode || DEMO_USER.phoneDialCode;
    user.phoneIso2 = user.phoneIso2 || DEMO_USER.phoneIso2;
    user.country = user.country || DEMO_USER.country;
    user.state = user.state || DEMO_USER.state;
    user.isActive = true;
    user.approvalStatus = "approved";
    await user.save();
    return user;
  }

  const passwordHash = await bcrypt.hash(DEMO_USER.password, 12);
  user = await User.create({
    companyName: DEMO_USER.companyName,
    email: DEMO_USER.email,
    phone: DEMO_USER.phone,
    phoneDialCode: DEMO_USER.phoneDialCode,
    phoneIso2: DEMO_USER.phoneIso2,
    passwordHash,
    country: DEMO_USER.country,
    state: DEMO_USER.state,
    isActive: true,
    approvalStatus: "approved",
    approvedAt: new Date(),
  });

  return user;
}

// AUTH STATUS - Check if user is authenticated
router.get("/status", authGuard, async (req, res) => {
  try {
    const user = await User.findById(req.user.uid).select('-passwordHash');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: "Account is deactivated" 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        companyName: user.companyName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
        role: user.role,
        approvalStatus: user.approvalStatus,
      },
    });
  } catch (err) {
    console.error("Auth status error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// REGISTER
router.post("/quick-register", async (req, res, next) => {
  try {
    const {
      name,
      companyName,
      email,
      phoneNumber,
      designation,
      phoneDialCode,
      phoneIso2,
      country,
      state,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!companyName?.trim()) {
      return res.status(400).json({ message: "Organization name is required" });
    }

    if (!email?.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    if (!phoneNumber?.trim()) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    if (!validatePhone(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid mobile number" });
    }

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: cleanPhoneNumber }],
    });

    const existingPendingUser = await PendingUser.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: cleanPhoneNumber }],
    });

    if (existingUser || existingPendingUser) {
      if (
        existingUser?.email === email.toLowerCase().trim() ||
        existingPendingUser?.email === email.toLowerCase().trim()
      ) {
        return res.status(409).json({ message: "Email already registered" });
      }

      return res.status(409).json({ message: "Phone number already registered" });
    }

    const passwordHash = await bcrypt.hash(
      `quick-register:${email.toLowerCase().trim()}:${Date.now()}`,
      12
    );

    const pendingUser = await PendingUser.create({
      contactName: name.trim(),
      companyName: companyName.trim(),
      email: email.toLowerCase().trim(),
      phone: cleanPhoneNumber,
      designation: designation?.trim() || "",
      phoneDialCode: phoneDialCode || "+91",
      phoneIso2: phoneIso2 || "IN",
      passwordHash,
      country: country || "India",
      state: state || "Uttar Pradesh",
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Registration submitted successfully. Your details are now pending admin approval.",
      user: {
        id: pendingUser._id,
        name: pendingUser.contactName,
        companyName: pendingUser.companyName,
        email: pendingUser.email,
        phone: pendingUser.phone,
        designation: pendingUser.designation,
      },
    });
  } catch (err) {
    console.error("Quick registration error:", err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const message =
        field === "email"
          ? "Email already registered"
          : "Phone number already registered";
      return res.status(409).json({ message });
    }
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const {
      companyName,
      email,
      phoneNumber,
      phoneDialCode,
      phoneIso2,
      password,
      country,
      state,
    } = req.body;
    console.log(phoneNumber);

    // Validation
    if (!companyName?.trim()) {
      return res.status(400).json({ message: "Company name is required" });
    }

    if (!email?.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    if (!phoneNumber?.trim()) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    if (!validatePhone(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid mobile number" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Clean phone number for consistent comparison
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    console.log(cleanPhoneNumber);
    // Check if user already exists (approved or pending)
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone: cleanPhoneNumber }],
    });

    const existingPendingUser = await PendingUser.findOne({
      $or: [{ email: email.toLowerCase() }, { phone: cleanPhoneNumber }],
    });

    if (existingUser || existingPendingUser) {
      if (
        existingUser?.email === email.toLowerCase() ||
        existingPendingUser?.email === email.toLowerCase()
      ) {
        return res.status(409).json({ message: "Email already registered" });
      } else {
        return res
          .status(409)
          .json({ message: "Phone number already registered" });
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create pending user
    const pendingUser = await PendingUser.create({
      companyName: companyName.trim(),
      email: email.toLowerCase().trim(),
      phone: cleanPhoneNumber,
      phoneDialCode: phoneDialCode || "+91",
      phoneIso2: phoneIso2 || "IN",
      passwordHash: passwordHash,
      country: country || "India",
      state: state || "Uttar Pradesh",
    });

    // Generate token and set cookie
    const token = signToken({
      uid: pendingUser._id,
      role: "user", // Default role for regular users
      email: pendingUser.email,
    });
    console.log("🔐 Generated token for pending user:", pendingUser.email);
    console.log("📝 Pending user created:", pendingUser.email);

    // Issue cookie
    issueCookie(res, token);

    // Return success message indicating approval is required
    res.status(201).json({
      success: true,
      message:
        "Registration submitted successfully. Your account will be activated after admin approval.",
      user: {
        id: pendingUser._id,
        companyName: pendingUser.companyName,
        email: pendingUser.email,
        phone: pendingUser.phone,
        country: pendingUser.country,
        state: pendingUser.state,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const message =
        field === "email"
          ? "Email already registered"
          : "Phone number already registered";
      return res.status(409).json({ message });
    }
    next(err);
  }
});

// LOGIN (email or phone)
router.post("/login", async (req, res, next) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res
        .status(400)
        .json({ message: "Email/phone and password are required" });
    }

    // Find user by email or phone
    const query = emailOrPhone.includes("@")
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone };

    const demoUser = await ensureDemoUser(emailOrPhone, password);
    const user = demoUser || (await User.findOne(query));

    // DEBUG LOGGING
    console.log("🔍 DEBUG LOGIN - User found:", {
      found: !!user,
      email: user?.email,
      approvalStatus: user?.approvalStatus,
      isActive: user?.isActive,
      hasPassword: !!user?.passwordHash
    });

    if (!user || !user.passwordHash) {
      return res
        .status(401)
        .json({ message: "Invalid email/phone or password" });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log("❌ DEBUG: User is not active");
      return res.status(401).json({ message: "Account is deactivated" });
    }

    // Check if user is approved
    console.log("🔍 DEBUG: Checking approval status:", user.approvalStatus);
    if (user.approvalStatus === "pending") {
      console.log("❌ DEBUG: User approval status is pending");
      return res.status(401).json({
        message:
          "Your account is pending approval. Please wait for admin approval before logging in.",
        status: "pending_approval",
      });
    }

    if (user.approvalStatus === "rejected") {
      console.log("❌ DEBUG: User approval status is rejected");
      return res.status(401).json({
        message:
          user.rejectionReason ||
          "Your registration has been rejected. Please contact support for more information.",
        status: "rejected",
      });
    }

    console.log("✅ DEBUG: User passed all checks, proceeding with password verification");

    // Verify password
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      console.log("❌ DEBUG: Password verification failed");
      return res
        .status(401)
        .json({ message: "Invalid email/phone or password" });
    }

    console.log("✅ DEBUG: Password verified successfully");

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token and set cookie
    const token = signToken({ uid: user._id });
    console.log("🔐 Generated token for user:", user.email);

    issueCookie(res, token);
    console.log("🍪 Cookie issued for login");

    // Return user data and access token
    res.json({
      success: true,
      accessToken: token,
      user: {
        id: user._id,
        companyName: user.companyName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    next(err);
  }
});

// GOOGLE OAuth Login (legacy - keeping for backward compatibility)
router.post("/login/google", async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: "idToken required" });

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub: providerId, email, name } = ticket.getPayload();

    let user = await User.findOne({
      "providers.name": "google",
      "providers.providerId": providerId,
    });

    if (!user) {
      // Check if email already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        // Link Google account to existing user
        existingUser.providers.push({ name: "google", providerId });
        await existingUser.save();
        user = existingUser;
      } else {
        // Create new user
        user = await User.create({
          email: email.toLowerCase(),
          companyName: name || "Google User",
          providers: [{ name: "google", providerId }],
        });
      }
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = signToken({
      uid: user._id,
      role: "user", // Default role for regular users
      email: user.email,
    });
    issueCookie(res, token);

    res.json({
      success: true,
      accessToken: token,
      user: {
        id: user._id,
        companyName: user.companyName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
      },
    });
  } catch (err) {
    console.error("Google OAuth error:", err);
    next(err);
  }
});

// GOOGLE OAuth Callback (new redirect-based flow)
router.post("/google/callback", async (req, res, next) => {
  const { code, redirectUri, type } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Authorization code required" });
  }

  // Check required environment variables
  if (!process.env.GOOGLE_CLIENT_ID) {
    console.error("❌ Missing GOOGLE_CLIENT_ID environment variable");
    return res.status(500).json({
      success: false,
      message: "Google Client ID not configured on server",
    });
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.error("❌ Missing GOOGLE_CLIENT_SECRET environment variable");
    return res.status(500).json({
      success: false,
      message: "Google Client Secret not configured on server",
    });
  }

  console.log("🔍 Debug info:");
  console.log("Code received:", code ? "✅" : "❌");
  console.log("Redirect URI:", redirectUri);
  console.log("Type:", type);
  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅" : "❌");
  console.log(
    "GOOGLE_CLIENT_SECRET:",
    process.env.GOOGLE_CLIENT_SECRET ? "✅" : "❌"
  );

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  try {
    console.log("🔄 Exchanging authorization code for tokens...");

    // Exchange authorization code for tokens
    const { tokens } = await client.getToken({
      code,
      redirect_uri: redirectUri,
    });

    console.log("✅ Token exchange successful:", {
      access_token: tokens.access_token ? "✅" : "❌",
      id_token: tokens.id_token ? "✅" : "❌",
    });

    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: providerId, email, name, picture } = payload;

    console.log("✅ Google user info:", { email, name, providerId });

    let user = await User.findOne({
      "providers.name": "google",
      "providers.providerId": providerId,
    });

    if (!user) {
      // Check if email already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        // Link Google account to existing user
        existingUser.providers.push({ name: "google", providerId });
        await existingUser.save();
        user = existingUser;
        console.log("✅ Linked Google account to existing user");
      } else {
        // Create new user
        user = await User.create({
          email: email.toLowerCase(),
          companyName: name || "Google User",
          providers: [{ name: "google", providerId }],
          profilePicture: picture,
        });
        console.log("✅ Created new user with Google account");
      }
    } else {
      console.log("✅ Found existing user with Google account");
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = signToken({
      uid: user._id,
      role: "user", // Default role for regular users
      email: user.email,
    });
    console.log("🔐 Generated token for Google user:", user.email);

    issueCookie(res, token);
    console.log("🍪 Cookie issued for Google login");

    console.log("✅ Authentication successful for user:", user.email);

    res.json({
      success: true,
      accessToken: token,
      user: {
        id: user._id,
        companyName: user.companyName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
      },
    });
  } catch (err) {
    console.error("❌ Google OAuth callback error:", err);
    console.error("❌ Error details:", {
      message: err.message,
      code: err.code,
      stack: err.stack,
    });
    res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
});

// SESSION PROBE
router.get("/me", authGuard, async (req, res) => {
  try {
    const user = await User.findById(req.user.uid).lean();
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        companyName: user.companyName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
      },
    });
  } catch (err) {
    console.error("Session probe error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// REFRESH TOKEN
router.post("/refresh-token", handleRefreshToken);

// LOGOUT
router.post("/logout", (_req, res) => {
  res.clearCookie("rb_session");
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;


