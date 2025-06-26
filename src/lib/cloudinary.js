// =============================================
// ☁️📸 CLOUDINARY CONFIG - MEDIA UPLOAD SERVICE 📸☁️
// =============================================
import { v2 as cloudinary } from "cloudinary"; // 🌩️ Cloud service SDK
import dotenv from "dotenv"; // 🔐 Environment loader

// ⚙️ LOAD ENVIRONMENT VARIABLES
dotenv.config(); // 📁 Loads .env file secrets

// 🔧 CONFIGURE CLOUDINARY CONNECTION
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ☁️ Your cloud ID
  api_key: process.env.CLOUDINARY_API_KEY, // 🔑 Public key
  api_secret: process.env.CLOUDINARY_API_SECRET, // 🗝️ Private key (keep safe!)
});

// 🚀 EXPORT READY-TO-USE CLOUDINARY INSTANCE
export default cloudinary; // ⚡ Use for uploads/fetching media
