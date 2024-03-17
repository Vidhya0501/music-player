import Song from '../models/Song.js';

 const getAllSongs = async (req, res) => {
  try {
    const song = await Song.find();
    res.send(song);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

 const createSong = async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    filePath: req.body.filePath,
    image:req.body.image,
    duration:req.body.duration
  });

  try {
    const newSong = await song.save();
    res.status(201).send(newSong);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export default{
  getAllSongs,
  createSong
}