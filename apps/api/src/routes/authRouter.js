import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { isAuth } from '../middlewares/isAuth.js'

export const authRouter = Router()

authRouter.get('/verify', isAuth, authController.verify)
authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)