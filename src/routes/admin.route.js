// =============================================
// 🔐🚀 ADMIN ROUTES - PROTECTED MANAGEMENT ENDPOINTS 🚀🔐
// =============================================
import { Router } from "express";

// 🛡️ IMPORT CONTROLLERS & MIDDLEWARE
import {
  checkAdmin,
  createAlbum,
  deleteAlbum,
  createSong,
  deleteSong,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router(); // 🧩 Create Express router

// 🔒 GLOBAL MIDDLEWARE - PROTECT ALL ADMIN ROUTES!
router.use(
  protectRoute, // 🛡️ 1. Verify user is logged in
  requireAdmin // 👑 2. Verify user has admin privileges
);

// 🔍 ADMIN CHECK ROUTE
router.get("/check", checkAdmin); // ✅ Quick admin status verification

// ============
// 🎵 SONG ROUTES
// ============
router.post("/songs", createSong); // ➕ CREATE new song
router.delete("/songs/:id", deleteSong); // 🗑️ DELETE song by ID

// ============
// 💿 ALBUM ROUTES
// ============
router.post("/albums", createAlbum); // ➕ CREATE new album
router.delete("/albums/:id", deleteAlbum); // 🗑️ DELETE album by ID

export default router; // 🚀 Export ready-to-use router
