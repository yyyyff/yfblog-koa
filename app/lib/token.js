const jwt = require('jsonwebtoken')
const { token } = require('../../config/config')

function generateToken(uid, authLevel) {
  return jwt.sign({ uid, authLevel }, token.secret, { expiresIn: token.expiresIn })
}

module.exports = {
  generateToken
}
