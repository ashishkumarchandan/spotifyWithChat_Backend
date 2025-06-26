// =============================================
// 👥💬 USER ROUTES - PROFILE & MESSAGING ENDPOINTS 💬👥
// =============================================
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";

const router = Router(); // 🧩 Create Express router

// =============================
// 🔐 GET ALL OTHER USERS
// =============================
router.get(
  "/",
  protectRoute, // 🛡️ Verify authentication
  getAllUsers // 👥 Fetch all users except current user
);

// =============================
// 🔐 GET CONVERSATION HISTORY
// =============================
router.get(
  "/message/:userId", // 🆔 Dynamic user ID parameter
  protectRoute, // 🛡️ Verify authentication
  getMessages // 💬 Fetch messages between current user and :userId
);

export default router; // 🚀 Export ready-to-use user router
