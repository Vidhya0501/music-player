import express from 'express'
import SongRoutes from './songRoutes.js'
import PlaylistRoutes from './playlistRoutes.js'
import UserRoutes from './userRoutes.js'

const router=express.Router()

router.use('/song',SongRoutes)
router.use('/playlist',PlaylistRoutes)
router.use('/user',UserRoutes)

export default router