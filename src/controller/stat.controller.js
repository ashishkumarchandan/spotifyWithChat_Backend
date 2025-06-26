import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

// =============================================
// 📊📈 STATS CONTROLLER - ANALYTICS DASHBOARD 📈📊
// =============================================

export const getStats = async (req, res, next) => {
  try {
    // 🚀 PARALLEL DATA FETCHING - All stats at once!
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        // ⚡ Parallel execution
        // 1️⃣ SONG COUNT
        Song.countDocuments(), // 🎵 Total songs

        // 2️⃣ ALBUM COUNT
        Album.countDocuments(), // 💿 Total albums

        // 3️⃣ USER COUNT
        User.countDocuments(), // 👥 Total users

        // 4️⃣ UNIQUE ARTIST COUNT (COMPLEX AGGREGATION)
        Song.aggregate([
          // 🔄 COMBINE SONGS + ALBUMS
          {
            $unionWith: {
              coll: "albums", // 💽 Merge album collection
              pipeline: [], // 📦 No extra processing
            },
          },

          // 🧩 GROUP BY ARTIST (DISTINCT)
          {
            $group: {
              _id: "$artist", // 🎤 Group by artist name
            },
          },

          // 🔢 COUNT UNIQUE ARTISTS
          {
            $count: "count", // 🧮 Final count of groups
          },
        ]),
      ]);

    // 📦 PACKAGE RESULTS
    res.status(200).json({
      totalSongs, // 🎵
      totalAlbums, // 💿
      totalUsers, // 👥
      totalArtists: uniqueArtists[0]?.count || 0, // 🎤 Handle empty case
    });
  } catch (error) {
    // 🚨 ERROR HANDLING
    console.log("❌ STATS FETCH ERROR", error); // 🔥 Visual error cue
    next(error); // ⏩ Forward to error middleware
  }
};
