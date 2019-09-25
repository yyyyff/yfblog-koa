const { User } = require('../models/users')
const { SuccessException } = require('../../base/exception')

class UserCtl {
  async register(ctx) {
    const { username, nickname, password, email } = ctx.request.body

    await User.create({ username, nickname, password, email })
    throw new SuccessException()
  }

  async login(ctx) {
    let { username, password } = ctx.request.body
    const user = await User.verifyPassword(username, password)
  }
}

module.exports = new UserCtl()
