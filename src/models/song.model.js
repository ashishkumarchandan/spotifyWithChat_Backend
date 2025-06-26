// ======================================
// 🎵🎤 SONG SCHEMA - TRACK DEFINITION 🎤🎵
// ======================================
import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    // 🏷️🔹 TITLE - Song name! 🔹🏷️
    title: {
      type: String, // 📝 Text format
      required: true, // ❗ MUST have title!
    },

    // 🎤🔹 ARTIST - Who performs it? 🔹🎤
    artist: {
      type: String, // 📝 Text format
      required: true, // ❗ MUST be provided!
    },

    // 🖼️🔹 IMAGE URL - Cover art! 🔹🖼️
    imageUrl: {
      type: String, // 🌐 URL string
      required: true, // ❗ Visual required!
    },

    // 🔊🔹 AUDIO URL - The actual track! 🔹🔊
    audioUrl: {
      type: String, // 🌐 URL string
      required: true, // ❗ MUST have audio!
    },

    // ⏱️🔹 DURATION - Track length (seconds)! 🔹⏱️
    duration: {
      type: Number, // 🔢 Numeric value
      required: true, // ❗ Essential info!
    },

    // 💽🔹 ALBUM LINK - Parent collection! 🔹💽
    albumId: {
      type: mongoose.Schema.Types.ObjectId, // 🔗 Reference ID
      ref: "Album", // ↔️ Connects to Album model
      required: false, // ⚠️ OPTIONAL (may be single)
    },
  },
  {
    // ⏰🔹 AUTO-TIMESTAMPS - CreatedAt/UpdatedAt! 🔹⏰
    timestamps: true, // ✨✨ CRITICAL FIX: Changed to lowercase 's'! ✨✨
  }
);

// 🚀 EXPORT SONG MODEL - Ready for sound waves! 🚀
export const Song = mongoose.model("Song", songSchema);
