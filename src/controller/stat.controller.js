import { Album } from "../models/album.model";
import { Song } from "../models/song.model";
import { User } from "../models/user.model";

export const getStats = async (req, res, next) => {
    try{
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([])
    }catch(error){
        next(error);
    }
}