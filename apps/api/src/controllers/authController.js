import bcrypt from 'bcrypt'
import { usersService } from '../services/usersService.js'
import { signJwt } from '../utils/signJwt.js'

export const authController = {
  register: async (req, res, next) => {
    const { username, password } = req.body

    try {
      const notUnique = await usersService.getUserById({ username })
      if (notUnique) {
        const err = new Error('Validation failed')
        err.status = 400
        err.fields = { username: '❌ Username already taken' }
        return next(err)
      }

      const hashedPass = await bcrypt.hash(password, 10)
      const user = await usersService.createUser({
        username,
        password: hashedPass,
      })
      res.status(200).json(user)
    } catch (err) {
      next(new Error(`⚠️ DB Error: ${err.message}`))
    }
  },

  login: async (req, res, next) => {
    const { username, password } = req.body

    try {
      const user = await usersService.getUserById({ username })

      if (!user) {
        const err = new Error('Validation failed')
        err.status = 400
        err.fields = { username: '❌ User not found' }
        return next(err)
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        const err = new Error('Validation failed')
        err.status = 400
        err.fields = { password: '⚠️ Wrong password' }
        return next(err)
      }

      const token = await signJwt(user)
      res.json(token)
    } catch (err) {
      return next(new Error(`⚠️ DB Error: ${err.message}`))
    }
  },

  verify: async (req, res, next) => {
    res.status(200).json({ message: 'User is authenticated', user: req.user })
  },
}
