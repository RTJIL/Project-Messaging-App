import { Router } from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { chanenlsController } from '../controllers/channelsController.js'

export const channelsRouter = Router()

channelsRouter.get('/', isAuth, chanenlsController.getAllChannels)
channelsRouter.post('/', isAuth, chanenlsController.getOrCreateChannel)
