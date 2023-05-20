const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');

const auth = asynchandler(async (req, res, next) => {
  try {
    let token = req.header('x-token');
    if (!token) {
      return res.status(400).send('Token not found');
    }
    let decode = jwt.verify(token, 'jwtSecret');
    req.user = decode.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send('Server error');
  }
});

module.exports = { auth };
