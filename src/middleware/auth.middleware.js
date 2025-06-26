// =============================================
// 🔐🛡️ AUTH MIDDLEWARE - ACCESS CONTROL 🛡️🔐
// =============================================
import { clerkClient } from "@clerk/express";

// 🔐 BASIC AUTHENTICATION CHECK
export const protectRoute = async (req, res, next) => {
  // 🚫 NO USER ID? ACCESS DENIED!
  if (!req.auth.userId) {
    return res.status(401).json({
      // ⛔ 401 Unauthorized
      message: "🚫 Unauthorized - you must be logged in", // 🚷 Stop sign visual
    });
  }

  // ✅ USER VERIFIED - PROCEED
  next(); // 🟢 Green light to next middleware
};

// 👑 ADMIN ACCESS CHECK
export const requireAdmin = async (req, res, next) => {
  try {
    // 🔍 FETCH USER FROM CLERK
    const currentUser = await clerkClient.users.getUser(req.auth.userId);

    // 🔑 CHECK ADMIN STATUS BY EMAIL MATCH
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    // 💡 Compare with environment variable

    // 🚫 NOT ADMIN? ACCESS DENIED!
    if (!isAdmin) {
      return res.status(403).json({
        // ⛔ 403 Forbidden
        message: "⛔ Unauthorized - you must be an admin", // 🚧 Admin barrier
      });
    }

    // ✅ ADMIN VERIFIED - PROCEED
    next(); // 👑 Royal proceed permission
  } catch (error) {
    // ❌ ERROR HANDLING
    next(error); // 🚨 Forward to error handler
  }
};
