import express from 'express'
import SongRoutes from './songRoutes.js'
import PlaylistRoutes from './playlistRoutes.js'
import UserRoutes from './userRoutes.js'

const router=express.Router()

router.use('/songs',SongRoutes)
router.use('/playlists',PlaylistRoutes)
router.use('/users',UserRoutes)

export default router