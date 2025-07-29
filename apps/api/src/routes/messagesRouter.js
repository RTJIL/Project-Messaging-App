import { Router } from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { messagesController } from '../controllers/messagesController.js'

export const messagesRouter = Router()

messagesRouter.get('/', isAuth, messagesController.getAllMessages)
messagesRouter.get('/:id', isAuth, messagesController.getMessagesById)

messagesRouter.post('/:channelId', isAuth, messagesController.createMessage)
