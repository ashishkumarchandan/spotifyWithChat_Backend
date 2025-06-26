import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

// =============================================
// 👥💬 USER & MESSAGE CONTROLLERS 💬👥
// =============================================

// 🔍👤 GET ALL USERS (EXCEPT CURRENT USER)
export const getAllUsers = async (req, res, next) => {
  try {
    // 🔐 GET CURRENT USER ID FROM AUTH
    const currentUserId = req.auth.userId; // 🛡️ Authenticated user

    // 🕵️‍♀️ FIND ALL USERS EXCEPT CURRENT USER
    const users = await User.find({
      clerkId: { $ne: currentUserId }, // ❌ Exclude current user
    });

    // 📤 SEND USER LIST
    res.status(200).json(users); // ✅ 200 OK
  } catch (error) {
    next(error); // 🚨 Error handling
  }
};

// 📩💬 GET CONVERSATION MESSAGES
export const getMessages = async (req, res, next) => {
  try {
    // 🔐 GET CURRENT USER ID
    const myId = req.auth.userId; // 🧑‍💼 Me

    // 🆔 GET OTHER USER ID FROM URL
    const { userId } = req.params; // 👥 Conversation partner

    // 🔍 FETCH OUR CONVERSATION HISTORY
    const messages = await Message.find({
      $or: [
        // 🤝 Either direction
        // 💬 Messages FROM them TO me
        { senderId: userId, receiverId: myId },

        // 💬 Messages FROM me TO them
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); // ⬆️ Oldest first (chronological)

    // 🚀 SEND MESSAGES (MISSING IN ORIGINAL - ADDED!)
    res.status(200).json(messages); // ✅ 200 OK
  } catch (error) {
    next(error); // 🚨 Error handling
  }
};
