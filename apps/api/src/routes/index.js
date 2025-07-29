import { Router } from 'express'
import { usersRouter } from './usersRouter.js'
import { authRouter } from './authRouter.js'
import { messagesRouter } from './messagesRouter.js'
import { channelsRouter } from './channelsRouter.js'

export const routes = Router()

routes.use('/users', usersRouter)
routes.use('/auth', authRouter)
routes.use('/messages', messagesRouter)
routes.use('/channels', channelsRouter)
