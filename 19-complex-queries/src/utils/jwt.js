const jwt = require('jsonwebtoken');
const SECRET = process.env.AUTH_SECRET;

module.exports = {
  signin: options => payload => {
    const opt = Object.assign({}, options, { expiresIn: '1h' });
    return jwt.sign(payload, SECRET, opt);
  },
  verify: options => token => {
    const opt = Object.assign({}, options);
    return jwt.verify(token, SECRET, opt);
  },
  decode: options => token => {
    const opt = Object.assign({}, options);
    const cleanToken = token.replace(/Bearer|bearer/g, '').trim();

    return jwt.decode(cleanToken, opt);
  }
};
