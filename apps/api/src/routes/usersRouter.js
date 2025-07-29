import { Router } from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { usersController } from '../controllers/usersController.js'

export const usersRouter = Router()

usersRouter.get('/', isAuth, usersController.getAllUsers)
usersRouter.get('/:id', isAuth, usersController.getUserById)