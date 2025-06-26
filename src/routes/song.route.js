// =============================================
// 🎵🎧 SONG ROUTES - MUSIC ENDPOINTS 🎧🎵
// =============================================
import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controller/song.controller.js";

const router = Router(); // 🧩 Create Express router

// =============================
// 🔒 ADMIN-ONLY: ALL SONGS
// =============================
router.get(
  "/",
  protectRoute, // 🛡️ 1. Verify login
  requireAdmin, // 👑 2. Verify admin status
  getAllSongs // 🗂️ 3. Fetch all songs (newest first)
);

// =============================
// ⭐ FEATURED SONGS (PUBLIC)
// =============================
router.get("/featured", getFeaturedSongs); // 🎰 6 random songs

// =============================
// 🧑‍🎤 MADE-FOR-YOU (PUBLIC)
// =============================
router.get("/made-for-you", getMadeForYouSongs); // 🎯 4 personalized picks

// =============================
// 🔥 TRENDING SONGS (PUBLIC)
// =============================
router.get("/trending", getTrendingSongs); // 📈 4 "trending" tracks

export default router; // 🚀 Export ready-to-use song router
