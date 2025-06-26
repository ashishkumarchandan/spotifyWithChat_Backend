// =============================================
// 📊📈 STATS ROUTES - ADMIN ANALYTICS ENDPOINTS 📈📊
// =============================================
import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router(); // 🧩 Create Express router

// =============================
// 🔒 ADMIN DASHBOARD STATS
// =============================
router.get(
  "/",
  protectRoute, // 🛡️ 1. Verify login
  requireAdmin, // 👑 2. Verify admin status
  getStats // 📈 3. Fetch analytics dashboard data
);

export default router; // 🚀 Export ready-to-use stats router
