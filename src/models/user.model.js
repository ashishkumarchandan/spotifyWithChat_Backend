// ======================================
// 👥🪪 USER SCHEMA - PROFILE DEFINITION 🪪👥
// ======================================
import mongoose from "mongoose"; // 🔁 Re-import (safe in modules)

const userSchema = new mongoose.Schema(
  {
    // 👤🔸 FULL NAME - Display name! 🔸👤
    fullName: {
      type: String, // 📝 Text format
      required: true, // ❗ MUST have name!
    },

    // 🖼️🔸 IMAGE URL - Profile picture! 🔸🖼️
    imageUrl: {
      type: String, // 🌐 URL string
      required: true, // ❗ Visual identity!
    },

    // 🔑🔸 CLERK ID - Authentication ID! 🔸🔑
    clerkId: {
      type: String, // 🔐 Unique identifier
      required: true, // ❗ MUST be provided!
      unique: true, // 💠 Only one per user!
    },
  },
  {
    // ⏳🔸 AUTO-TIMESTAMPS - Account timeline! 🔸⏳
    timestamps: true, // ✨ Tracks signup/updates
  }
);

// 🚀 EXPORT USER MODEL - Ready for profiles! 🚀
export const User = mongoose.model("User", userSchema);
