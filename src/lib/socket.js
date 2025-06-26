// =============================================
// ⚡🔌 SOCKET.IO SERVER - REAL-TIME COMMUNICATIONS 🔌⚡
// =============================================
import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
  // 🌐 CREATE SOCKET SERVER
  const io = new Server(server, {
    cors: {
      origin: "*", // 🌍 Allow all origins
      credentials: true, // 🔑 Send credentials
    },
  });

  // 🗺️ USER TRACKING MAPS
  const userSockets = new Map(); // 👤 UserID → SocketID
  const userActivities = new Map(); // 👤 UserID → Activity Status

  // 🔌 CONNECTION EVENT HANDLER
  io.on("connection", (socket) => {
    console.log("➕ New connection:", socket.id); // 📡 Connection log

    // =============================
    // 👤 USER CONNECTION HANDLING
    // =============================
    socket.on("user_connected", (userId) => {
      // 📌 STORE USER CONNECTION
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle"); // 🛋️ Default status

      // 🔄 BROADCAST ONLINE USERS
      io.emit("users_online", Array.from(userSockets.keys())); // 👥 All online users
      io.emit("activities", Array.from(userActivities.entries())); // 📊 All activities
    });

    // =============================
    // 🔄 ACTIVITY UPDATES
    // =============================
    socket.on("update_activity", ({ userId, activity }) => {
      console.log("🔄 Activity update:", userId, activity); // 📝 Log update
      userActivities.set(userId, activity); // 🆕 Set new status
      io.emit("activity_updated", { userId, activity }); // 📢 Broadcast update
    });

    // =============================
    // ✉️ MESSAGE HANDLING
    // =============================
    socket.on("send_message", async (data) => {
      try {
        // 📦 UNPACK MESSAGE DATA (FIXED TYPOS)
        const { senderId, receiverId, content } = data; // ✨ Fixed spelling

        // 💾 SAVE TO DATABASE
        const message = await Message.create({
          senderId,
          receiverId, // ✨ Fixed spelling
          content,
        });

        // 📤 DELIVER TO RECEIVER
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message); // ✉️ Private delivery
        }

        // ✅ CONFIRM TO SENDER
        socket.emit("message_sent", message); // ✔️ Send confirmation
      } catch (error) {
        console.log("❌ MESSAGE ERROR:", error); // 🚨 Visual error
        socket.emit("message_error", error.message); // ⚠️ Send error to client
      }
    });

    // =============================
    // 🚫 DISCONNECTION HANDLING
    // =============================
    socket.on("disconnect", () => {
      console.log("➖ Disconnected:", socket.id); // 📡 Disconnection log

      // 🔍 FIND DISCONNECTED USER
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId); // 🗑️ Remove from socket map
          userActivities.delete(userId); // 🗑️ Remove from activity map
          break; // ⏭️ Exit loop early
        }
      }

      // 📢 BROADCAST DISCONNECTION
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId); // 👋 Notify all users
        io.emit("users_online", Array.from(userSockets.keys())); // 🔄 Update online list
      }
    });
  });
};
