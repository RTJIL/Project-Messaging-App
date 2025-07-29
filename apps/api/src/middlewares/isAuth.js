import passport from '../config/passport.js'

export const isAuth = (req, res, next) =>
  passport.authenticate('jwt', { session: false })(req, res, next)
