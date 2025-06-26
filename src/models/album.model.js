// 🎵🔥 ALBUM SCHEMA - MUSIC COLLECTION BLUEPRINT 🔥🎵
import mongoose from "mongoose";

// 📀✨ DEFINING OUR ALBUM STRUCTURE ✨📀
const albumSchema = new mongoose.Schema(
  {
    // 🏷️🔸 TITLE - Album name! 🔸🏷️
    title: {
      type: String,       // 📜 Text format
      required: true,     // ❗ MUST have a title!
    },
    
    // 🎤🔸 ARTIST - Who created it? 🔸🎤
    artist: {
      type: String,       // 📜 Text format
      required: true,     // ❗ MUST be provided!
    },
    
    // 🖼️🔸 IMAGE URL - Album cover art! 🔸🖼️
    imageUrl: {
      type: String,       // 🌐 URL string
      required: true,     // ❗ Visual is essential!
    },
    
    // 📅🔸 RELEASE YEAR - When did it drop? 🔸📅
    releasedYear: {
      type: Number,       // 🔢 Numeric year
      required: true,     // ❗ Chronology matters!
    },
    
    // 🎶🔸 SONGS - Tracklist magic! 🔸🎶
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,  // 🔗 Reference ID
        ref: "Song",                          // ↔️ Connects to Song model
      },
    ],
  },
  {
    // ⏳🔸 AUTO-TIMESTAMPS - CreatedAt/UpdatedAt! 🔸⏳
    timestamps: true,     // ✨ Automatic time tracking
  }
);

// 🚀 EXPORT ALBUM MODEL - Ready for database blastoff! 🚀
export const Album = mongoose.model("Album", albumSchema);