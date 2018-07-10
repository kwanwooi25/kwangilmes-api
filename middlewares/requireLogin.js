const jwt = require('jsonwebtoken');
const { onRequestSuccess, onRequestFail } = require('../utils');
const { JWT_SECRET } = require('../config/keys');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.json(onRequestFail('token is required!'));
  else {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) return res.json(onRequestFail(error));
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
};
