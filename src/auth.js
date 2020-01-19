const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const Users = require('./users/model');
const JWT = require('./utils/jwt');

const SECRET = process.env.AUTH_SECRET;

const authenticate = () => {
  const params = {
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      return done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(strategy);

  return {
    attachUserMiddleware: function(req, res, next) {
      const { authorization } = req.headers;

      if (authorization) {
        const user = JWT.decode()(authorization) || {};
        req.user = user;
      }

      next();
    },
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', { session: false });
    }
  };
};
module.exports = authenticate();
