const { Users } = require('../models')
const { Forbbiden, Success, AuthFailed } = require('../../base/exception')
const { generateToken } = require('../lib/token')

class UserCtl {
  async register(ctx) {
    const { username, nickname, password, email } = ctx.request.body

    await Users.create({ username, nickname, password, email })
    throw new Success()
  }

  async login(ctx) {
    let { username, password } = ctx.request.body
    const user = await Users.verifyPassword(username, password)
    const token = generateToken(user.uid, user.authLevel)
    ctx.body = { token }
  }

  async updateUser(ctx) {
    let uid = ctx.params.uid
    if (ctx.state.user.uid !== uid) {
      throw new AuthFailed('只能对自己账户进行操作')
    }
    let user = await Users.findOne({
      where: { uid }
    })
    if (ctx.body.currentPassword !== undefined && ctx.body.newPassword !== undefined) {
      await user.updatePassword(ctx.body.currentPassword, ctx.body.newPassword)
    }
    if (ctx.body.nickname !== undefined) {
      await user.updateNickName(ctx.body.nickname)
    }
  }

  async deleteUser(ctx) {
    let uid = ctx.params.uid
    if (ctx.state.user.uid === uid) {
      throw new Forbbiden('不能删除自己')
    }

    let user = await Users.findOne({
      where: { uid }
    })

    await user.destroy()

    throw new Success('删除成功')
  }
}

module.exports = new UserCtl()
