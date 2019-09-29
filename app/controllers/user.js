const { Users } = require('../models')
const { SuccessException } = require('../../base/exception')
const { generateToken } = require('../lib/token')
class UserCtl {
  async register(ctx) {
    const { username, nickname, password, email } = ctx.request.body

    await Users.create({ username, nickname, password, email })
    throw new SuccessException()
  }

  async login(ctx) {
    let { username, password } = ctx.request.body
    const user = await Users.verifyPassword(username, password)
    const token = generateToken(user.uid,user.authLevel)
    ctx.body = {token}
  }
}

module.exports = new UserCtl()
