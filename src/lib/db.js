// =============================================
// 🗄️🔌 DATABASE CONNECTION - MONGODB SETUP 🔌🗄️
// =============================================
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // 🌐 CONNECTING TO DATABASE...
    const conn = await mongoose.connect(process.env.MONGODB_URI); // 🔑 Using URI from environment

    // 🎉 SUCCESS MESSAGE WITH HOST INFO
    console.log(`✅ Connected to MongoDB → ${conn.connection.host}`.rainbow); // 🌈 Fun visual
  } catch (error) {
    // 🚨 ERROR HANDLING
    console.log("❌ DATABASE CONNECTION FAILED!".red.bold); // 🔥 Visual alert
    console.log("Error details:", error); // 🔍 Detailed error

    // ☠️ CRITICAL FAILURE - SHUTDOWN PROCESS
    console.log("🛑 Shutting down application...".yellow);
    process.exit(1); // 💥 Exit with failure code
  }
};
