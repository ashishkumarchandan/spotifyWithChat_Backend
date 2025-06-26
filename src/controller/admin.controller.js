import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// 🌩️🔄 CLOUDINARY UPLOAD HELPER
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      // ✨ FIXED TYPO: resut → result
      resource_type: "auto",
    });
    return result.secure_url; // 🔗 Return secure URL
  } catch (error) {
    console.log("❌ CLOUDINARY UPLOAD ERROR", error); // 🚨 Visual error cue
    throw new Error("🌩️ Cloudinary upload failed"); // 🌩️ Metaphor
  }
};

// ======================================
// 🎵🎧 SONG CONTROLLERS 🎧🎵
// ======================================

// ➕ CREATE SONG ➕
export const createSong = async (req, res, next) => {
  try {
    // 🛑 FILE CHECK - Validate required files
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      // ✨ CRITICAL FIX: Added missing ! operators
      return res.status(400).json({ message: "🚫 Missing audio/image files" }); // 🚫 Stop sign visual
    }

    // 📦 UNPACK DATA
    const { title, artist, albumId, duration } = req.body;
    const { audioFile, imageFile } = req.files; // 🧩 Destructure

    // ☁️ UPLOAD MEDIA
    const audioUrl = await uploadToCloudinary(audioFile); // 🔊 Audio
    const imageUrl = await uploadToCloudinary(imageFile); // 🖼️ Image

    // 🎵 CREATE SONG DOCUMENT
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null, // ⚠️ Handle optional album
    });

    await song.save(); // 💾 Save to DB

    // 🔄 UPDATE ALBUM IF LINKED
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id }, // ➕ Add song to album
      });
    }

    res.status(201).json(song); // 🎉 Success response
  } catch (error) {
    console.log("❌ CREATE SONG ERROR", error); // 🚨 Visual error
    next(error);
  }
};

// 🗑️ DELETE SONG 🗑️
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params; // 🆔 Get song ID

    // 🔍 FIND SONG
    const song = await Song.findById(id);

    // 🔄 REMOVE FROM ALBUM IF LINKED
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id }, // ➖ Remove song reference
      });
    }

    await Song.findByIdAndDelete(id); // 💥 Delete song

    res.status(200).json({ message: "✅ Song deleted successfully" }); // ✅ Success visual
  } catch (error) {
    console.log("❌ DELETE SONG ERROR", error);
    next(error);
  }
};

// ======================================
// 💿📀 ALBUM CONTROLLERS 📀💿
// ======================================

// ➕ CREATE ALBUM ➕
export const createAlbum = async (req, res, next) => {
  try {
    // 🛑 FILE CHECK
    if (!req.files?.imageFile) {
      // 🖼️ Check for cover art
      return res.status(400).json({ message: "🚫 Missing album cover" });
    }

    // 📦 UNPACK DATA (FIXED FIELD NAME: releaseYear → releasedYear)
    const { title, artist, releasedYear: releaseYear } = req.body; // ✨ CRITICAL FIX: Renamed to match model
    const { imageFile } = req.files;

    // ☁️ UPLOAD COVER ART
    const imageUrl = await uploadToCloudinary(imageFile);

    // 💿 CREATE ALBUM DOCUMENT
    const album = new Album({
      title,
      artist,
      imageUrl,
      releasedYear: releaseYear, // 📅 Now using correct field name
    });

    await album.save(); // 💾 Save to DB

    res.status(201).json(album); // 🎉 Success
  } catch (error) {
    console.log("❌ CREATE ALBUM ERROR", error);
    next(error);
  }
};

// 🗑️ DELETE ALBUM 🗑️
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params; // 🆔 Album ID

    // 💥 DELETE ALL RELATED SONGS
    await Song.deleteMany({ albumId: id }); // 🧹 Cleanup child documents

    // 💥 DELETE ALBUM
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "✅ Album deleted successfully" }); // ✅ Success
  } catch (error) {
    console.log("❌ DELETE ALBUM ERROR", error);
    next(error);
  }
};

// ======================================
// 🔐 ADMIN CHECK 🔐
// ======================================

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true }); // 👑 Always returns admin status
};
