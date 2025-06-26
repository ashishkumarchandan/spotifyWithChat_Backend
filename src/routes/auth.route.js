// =============================================
// 🔐🔄 AUTH ROUTES - AUTHENTICATION ENDPOINTS 🔄🔐
// =============================================
import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router(); // 🧩 Create Express router

// =============================
// 🔄 AUTH CALLBACK WEBHOOK
// =============================
router.post("/callback", authCallback); // 🌐💬 Handle auth provider callbacks

export default router; // 🚀 Export ready-to-use auth router
