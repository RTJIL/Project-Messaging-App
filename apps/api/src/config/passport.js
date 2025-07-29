import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import { usersService } from '../services/usersService.js'
import { PUB_KEY } from './config.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
}

const strategy = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    const user = await usersService.getUserById({ id: jwt_payload.sub})
    if (user) return done(null, user)
    else return done(null, false)
  } catch (err) {
    return done(err, false)
  }
})

passport.use(strategy)

export default passport
