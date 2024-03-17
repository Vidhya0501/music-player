import express from 'express'
import validate from '../middleware/Validate.js'
import UserController from '../controllers/userController.js'

const router=express.Router()

router.get('/get',validate,UserController.getAllUsers)
router.post('/register',validate,UserController.create)
router.delete('/delete/:id',validate,UserController.deleteUser)
router.post('/login',UserController.login)
router.get('/favorite',UserController.getUserFavoriteSongs)

export default router