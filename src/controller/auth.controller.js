import { User } from "../models/user.model.js";

// =============================================
// 🔐🔄 AUTH CALLBACK CONTROLLER - USER SYNC 🔄🔐
// =============================================

export const authCallback = async (req, res, next) => {
  try {
    // 📦 UNPACK USER DATA FROM AUTH PROVIDER
    const { id, firstName, lastName, imageUrl } = req.body; // 🔑 Clerk user data

    // 🔍 CHECK IF USER EXISTS IN OUR DB
    const user = await User.findOne({ clerkId: id }); // 🕵️‍♂️ Find by Clerk ID

    // ➕ CREATE NEW USER IF NOT FOUND
    if (!user) {
      // ✨ BUILD FULL NAME - Safely handle missing names
      const fullName = `${firstName || ""} ${lastName || ""}`.trim(); // 🧩 Combine names

      // 🧑‍💼 CREATE USER DOCUMENT
      await User.create({
        clerkId: id, // 🔑 Authentication ID
        fullName, // 🏷️ Combined name
        imageUrl, // 🖼️ Profile picture
      });
      // 💡 New user created silently!
    }

    // ✅ ALWAYS RETURN SUCCESS - Whether new or existing
    res.status(200).json({ success: true }); // 🟢 Always true!
  } catch (error) {
    // 🚨 ERROR HANDLING
    console.log("❌ AUTH CALLBACK ERROR", error); // 🔥 Visual error cue
    next(error); // ⏩ Forward to error middleware
  }
};
