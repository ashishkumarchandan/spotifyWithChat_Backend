// =============================================
// 🚀🌐 EXPRESS SERVER SETUP - MAIN APPLICATION ENTRY POINT 🌐🚀
// =============================================
import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import corn from "node-cron";
import fileUpload from "express-fileupload";
import cors from "cors";
import { initializeSocket } from "./src/lib/socket.js";
import { fileURLToPath } from "url";
import "colors";

// 🛣️ ROUTE IMPORTS
import userRoutes from "./src/routes/user.route.js";
import adminRoutes from "./src/routes/admin.route.js";
import authRoutes from "./src/routes/auth.route.js";
import songRoutes from "./src/routes/song.route.js";
import albumRoutes from "./src/routes/album.route.js";
import statRoutes from "./src/routes/stat.route.js";

// 🗄️ DATABASE CONNECTION
import { connectDB } from "./src/lib/db.js";

// ⚙️ ENVIRONMENT SETUP
dotenv.config(); // 🔐 Load environment variables

const app = express(); // 🧱 Create Express app
const __dirname = path.resolve(); // 📍 Get current directory path
const PORT = parseInt(process.env.PORT) || 5000; // 🚪 Default to port 5000

// =============================================
// 🌐 SERVER AND SOCKET.IO SETUP
// =============================================
const httpServer = createServer(app); // 🔌 Create HTTP server
initializeSocket(httpServer); // ⚡ Initialize real-time sockets

// =============================================
// 🛡️ MIDDLEWARE SETUP
// =============================================
app.use(
  cors({
    origin: "*", // 🌍 Allow all origins
    credentials: true, // 🔑 Send credentials
  })
);

app.use(express.json()); // 📦 Parse JSON bodies
app.use(clerkMiddleware()); // 👤 Clerk authentication middleware

// 📤 FILE UPLOAD CONFIGURATION
app.use(
  fileUpload({
    useTempFiles: true, // 📁 Use temporary files
    tempFileDir: path.join(process.cwd(), "tmp"), // 📂 Temp directory
    createParentPath: true, // ➕ Create directories if needed
    limits: {
      fileSize: 10 * 1024 * 1024, // ⚖️ 10MB file size limit
    },
  })
);

// =============================================
// 🧹 HOURLY TEMP FILE CLEANUP CRON JOB
// =============================================
const tempDir = path.join(process.cwd(), "tmp"); // 📂 Temp directory path

corn.schedule("0 * * * *", async () => {
  // ⏰ Run at start of every hour
  try {
    // 📂 GET ALL TEMP FILES
    const files = await fs.promises.readdir(tempDir);

    // 🗑️ DELETE ALL FILES IN PARALLEL
    await Promise.all(
      files.map((file) => fs.promises.unlink(path.join(tempDir, file)))
    );

    console.log(`🧹 Deleted ${files.length} temporary files`); // ✅ Cleanup report
  } catch (err) {
    if (err.code === "ENOENT") {
      // 📂 FOLDER DOESN'T EXIST - NO ACTION NEEDED
    } else {
      console.error("❌ CLEANUP ERROR:", err); // 🚨 Visual error
    }
  }
});

// =============================================
// 🗺️ ROUTE MAPPING
// =============================================
app.use("/api/users", userRoutes); // 👥 User management
app.use("/api/admin", adminRoutes); // 👑 Admin controls
app.use("/api/auth", authRoutes); // 🔐 Authentication
app.use("/api/songs", songRoutes); // 🎵 Song endpoints
app.use("/api/albums", albumRoutes); // 💿 Album endpoints
app.use("/api/stats", statRoutes); // 📊 Statistics dashboard

// =============================================
// ❌ GLOBAL ERROR HANDLER
// =============================================
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "⚠️ Internal server error" // 🛡️ Production-safe message
        : `❌ ${err.message}`, // 🔍 Detailed dev error
  });
});

// =============================================
// 🚀 START THE SERVER
// =============================================
httpServer.listen(PORT, () => {
  console.log(`🚀 Server launched → Port ${PORT}`.rainbow.bold); // 🌈 Fun launch message
  connectDB(); // 🗄️ Connect to MongoDB database
});
