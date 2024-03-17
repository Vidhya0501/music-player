import express from 'express';
import SongController from '../controllers/songController.js';

const router = express.Router();

router.get('/get', SongController.getAllSongs);
router.post('/create', SongController.createSong);

export default router;