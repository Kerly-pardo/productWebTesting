var jwt = require('jsonwebtoken');
var config = require('./config.json');

/**
 * @description This method use with receive a Bearer token in by request header HTTP POST through middleware
 * from Node.JS and expressJS and response No Content Request. Use method or verb POST
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function verifyToken(req, res, next) {
  try {
    var bearerHeader = req.header('Authorization');
    var parts = bearerHeader.split(' ');

    if (parts) {
      if (parts && parts.length === 2) {
        var token = parts[1];
        jwt.verify(token, config.secret,
          function (err, decoded) {
            if (decoded) {
              next();
            } else {
              return res.status(401).json({error: 'Invalid Token'});
            }
          });
      }
    }
  } catch (err) {
    return res.status(401).json({error: 'Invalid Token'});
  }
}

module.exports = verifyToken;