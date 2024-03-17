import express from 'express'
// import validate from '../middleware/Validate.js'
import PlaylistController from '../controllers/playlistController.js'

const router=express.Router()

router.get("/", PlaylistController.getPlaylists);
router.get("/:id", PlaylistController.getPlaylist);
router.post("/create", PlaylistController.createPlaylist);
router.patch("/:id", PlaylistController.editPlaylist);

export default router