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

import userRoutes from "./src/routes/user.route.js";
import adminRoutes from "./src/routes/admin.route.js";
import authRoutes from "./src/routes/auth.route.js";
import songRoutes from "./src/routes/song.route.js";
import albumRoutes from "./src/routes/album.route.js";
import statRoutes from "./src/routes/stat.route.js";
import { connectDB } from "./src/lib/db.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const port = parseInt(process.env.PORT) || 5000;

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(process.cwd(), "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

const tempDir = path.join(process.cwd(), "tmp");

corn.schedule("0 * * * *", async () => {
  try {
    // 📂 Read all files in temp directory
    const files = await fs.promises.readdir(tempDir);

    // 🗑️ Delete all files in parallel
    await Promise.all(
      files.map((file) => fs.promises.unlink(path.join(tempDir, file)))
    );

    console.log(`🧹 Deleted ${files.length} temporary files`);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Folder doesn't exist - no action needed
    } else {
      console.error("Cleanup error:", err);
    }
  }
});

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
});

httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
