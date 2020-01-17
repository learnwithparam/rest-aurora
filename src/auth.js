const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const Users = require('./users/model');

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
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', { session: false });
    }
  };
};
module.exports = authenticate();
