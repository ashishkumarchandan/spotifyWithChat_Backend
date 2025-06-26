import { Album } from "../models/album.model.js";

// =============================================
// 💿📀 ALBUM CONTROLLERS - MUSIC COLLECTIONS 📀💿
// =============================================

// 🌐🔍 GET ALL ALBUMS
export const getAllAlbums = async (req, res, next) => {
  try {
    // 🗂️ FETCH ALL ALBUMS FROM DATABASE
    const albums = await Album.find(); // 🔍 Empty query = get everything!

    // 🎉 SEND RESPONSE - Array of albums
    res.status(200).json(albums); // ✅ 200 OK status
  } catch (error) {
    // ❌ ERROR HANDLING - Pass to error middleware
    next(error); // 🚨 Let central handler deal with it
  }
};

// 🔎💿 GET ALBUM BY ID + SONGS
export const getAlbumById = async (req, res, next) => {
  try {
    // 🆔 EXTRACT ALBUM ID FROM URL PARAMETERS
    const { albumId } = req.params; // 📦 Comes from /albums/:albumId

    // 🔍📀 FETCH ALBUM + POPULATE SONGS
    const album = await Album.findById(albumId).populate("songs");
    // 💡 populate() replaces song IDs with full song documents!

    // 🚫 ALBUM NOT FOUND HANDLING
    if (!album) {
      return res.status(404).json({
        // ❌ 404 Not Found
        message: "🔍 Album not found - Wrong ID?", // ❓ Helpful clue
      });
    }

    // 🎉 SEND COMPLETE ALBUM DATA WITH SONGS
    res.status(200).json(album); // ✅ 200 OK - Full album object
  } catch (error) {
    // ❌ ERROR HANDLING
    next(error); // 🚨 Forward to error handler
  }
};
