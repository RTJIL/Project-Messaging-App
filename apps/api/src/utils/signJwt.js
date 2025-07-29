import jwt from 'jsonwebtoken'
import { PRIV_KEY } from '../config/config.js'

export const signJwt = (user) => {
  return new Promise((res, rej) => {
    jwt.sign(
      { sub: user.id, username: user.username, avatar: user.avatarUrl },
      PRIV_KEY,
      { algorithm: 'RS256', expiresIn: '2d' },
      function (err, token) {
        if (err) return rej(err)
        res(token)
      }
    )
  })
}
