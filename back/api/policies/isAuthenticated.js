var jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  var token = req.headers['x-access-token']
  if (token) {
    jwt.verify(token, 'secret', function (err, decoded) {
      if (err) {
        return res.status(403).send({success: false, message: 'Failed to authenticate token'})
      } else {
        req.user = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({success: false, message: 'No token provided'})
  }
};
