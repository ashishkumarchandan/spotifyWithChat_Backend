// =============================================
// 💿📀 ALBUM ROUTES - MUSIC COLLECTION ENDPOINTS 📀💿
// =============================================
import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = Router(); // 🧩 Create Express router

// ===================
// 🌐 GET ALL ALBUMS
// ===================
router.get("/", getAllAlbums); // 🔍 Fetch all albums

// =======================
// 🔍 GET ALBUM BY ID + SONGS
// =======================
router.get("/:albumId", getAlbumById); // 🎵 Fetch specific album + populate songs!

export default router; // 🚀 Export ready-to-use album router
