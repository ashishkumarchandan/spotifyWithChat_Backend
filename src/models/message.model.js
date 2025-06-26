// 🌈✨ MESSAGE SCHEMA - CHAT MESSAGE STRUCTURE ✨🌈
import mongoose from "mongoose";

// 🧩 DEFINING OUR MESSAGE BLUEPRINT 🧩
const messageSchema = new mongoose.Schema(
    {
        // 👤🔹 SENDER ID - Who sent it? 🔹👤
        senderId: {
            type: String,       // 📦 String format
            required: true,     // ❗ MUST be provided!
        },
        
        // 👥🔹 RECEIVER ID - Who gets it? 🔹👥
        receiverId: {
            type: String,       // 📦 String format
            required: true,     // ❗ MUST be provided!
        },
        
        // 💌🔹 MESSAGE CONTENT - The actual text! 🔹💌
        content: {
            type: String,       // 📜 Text data
            required: true,     // ❗ Can't be empty!
        },
    },
    {
        // ⏰🔹 AUTO-TIMESTAMPS - Magic time tracking! 🔹⏰
        timestamps: true,       // ✨ Auto-adds createdAt/updatedAt
    }
);

// 🚀 EXPORT THE MESSAGE MODEL - Ready for launch! 🚀
export const Message = mongoose.model("Message", messageSchema);