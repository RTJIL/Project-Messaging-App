import { usersService } from '../services/usersService.js'

export const usersController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await usersService.getAllUsers()
      res.status(200).json(users)
    } catch (err) {
      next(new Error(`⛔Cannot get all users: ${err}`))
    }
  },

  getUserById: async (req, res, next) => {
    const id = Number(req.params.id)

    try {
      const users = await usersService.getUserById({ id: id })
      res.status(200).json(users)
    } catch (err) {
      next(new Error(`⛔Cannot get users by id: ${err}`))
    }
  },
}
