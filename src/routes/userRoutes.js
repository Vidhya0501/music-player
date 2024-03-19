import express from 'express'
import validate from '../middleware/Validate.js'
import UserController from '../controllers/userController.js'

const router=express.Router()

router.get('/get',UserController.getAllUsers)
router.delete('/delete/:id', UserController.deleteUser)
router.get('/favorite', UserController.getUserFavoriteSongs)

router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.post('/getuser',validate,UserController.getUserById)

export default router