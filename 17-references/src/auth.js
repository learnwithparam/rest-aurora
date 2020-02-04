const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const Users = require('./users/model');
const JWT = require('./utils/jwt'); // JWT utils to sign, verify and decode

const SECRET = process.env.AUTH_SECRET; // Auth secret from enviroment

const authenticate = () => {
  const params = {
    secretOrKey: SECRET, // Secret to use for decoding JWT token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // JWT will be send as Authorization header
  };

  // Passport strategy have callback to check whether a user exist or not (Authentication)
  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      return done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Attach passport JWT strategy to passport
  passport.use(strategy);

  return {
    // Middleware to attach req.user to the endpoint
    attachUserMiddleware: function(req, res, next) {
      const { authorization } = req.headers;

      if (authorization) {
        const user = JWT.decode()(authorization) || {};
        req.user = user;
      }

      next();
    },
    // Initialize passport
    initialize: () => {
      return passport.initialize();
    },
    // Middleware to check authetication for a route
    authenticate: () => {
      return passport.authenticate('jwt', { session: false });
    }
  };
};
module.exports = authenticate();
