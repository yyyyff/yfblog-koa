const jwt = require('jsonwebtoken')
const { token } = require('../../config/config')

function generateToken(uid, role) {
  return jwt.sign({ uid, role }, token.secret, { expiresIn: token.expiresIn })
}

module.exports = {
  generateToken
}
