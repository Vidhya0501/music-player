import mongoose from './index.js'

const playlistSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    songs: {
        type: Array,
        default: [],
    }

})

const Playlist=mongoose.model("playlists",playlistSchema)

export default Playlist