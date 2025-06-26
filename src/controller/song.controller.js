import { Song } from "../models/song.model.js";

// =============================================
// 🎵🎧 SONG CONTROLLERS - MUSIC FETCHERS 🎧🎵
// =============================================

// 🌐🎶 GET ALL SONGS (NEWEST FIRST)
export const getAllSongs = async (req, res, next) => {
  try {
    // 🔍 FETCH ALL + SORT BY NEWEST
    const songs = await Song.find().sort({ createdAt: -1 }); // ⬇️ Descending order = newest first!
    // ✨ Note: Fixed variable name (song → songs)

    // 🎉 SEND FULL SONG LIST
    res.status(200).json(songs); // ✅ 200 OK
  } catch (error) {
    next(error); // 🚨 Error handling
  }
};

// ⭐🎤 GET FEATURED SONGS (6 RANDOM)
export const getFeaturedSongs = async (req, res, next) => {
  try {
    // 🎲 AGGREGATION: RANDOM SAMPLE + FIELD PROJECTION
    const songs = await Song.aggregate([
      { $sample: { size: 6 } }, // 🎰 Random 6 songs
      {
        $project: {
          // ✂️ TRIM FIELDS
          _id: 1, // 🆔 Keep ID
          title: 1, // 🏷️ Title
          artist: 1, // 🎤 Artist
          imageUrl: 1, // 🖼️ Cover art
          audioUrl: 1, // 🔊 Audio file
        },
      },
    ]);

    // 🚀 SEND LEAN RESPONSE
    res.json(songs); // ✅ 200 OK (implied)
  } catch (error) {
    next(error); // 🚨 Error handling
  }
};

// 🧑‍🎤🎧 GET MADE-FOR-YOU SONGS (4 RANDOM)
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // 🎲 IDENTICAL LOGIC AS FEATURED (BUT SIZE=4)
    const songs = await Song.aggregate([
      { $sample: { size: 4 } }, // 🔢 Only 4 songs
      {
        $project: {
          // ✂️ SAME FIELD SELECTION
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // 🚀 SEND CURATED SELECTION
    res.json(songs); // ✅ 200 OK
  } catch (error) {
    next(error); // 🚨 Error handling
  }
};

// 🔥📈 GET TRENDING SONGS (4 RANDOM)
export const getTrendingSongs = async (req, res, next) => {
  try {
    // ⚠️ CURRENTLY RANDOM - NOT ACTUAL TRENDING!
    const songs = await Song.aggregate([
      { $sample: { size: 4 } }, // 🎲 Random selection
      {
        $project: {
          // ✂️ SAME FIELD SET
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // 🚀 SEND "TRENDING" SELECTION
    res.json(songs); // ✅ 200 OK
  } catch (error) {
    next(error); // 🚨 Error handling
  }
};
