import mongoose from './index.js'

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: Array,
    default:[]
  },
  genre: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  duration:{
    type:String,
    required:true
  }
});

const Song = mongoose.model('songs', songSchema);

export default Song;