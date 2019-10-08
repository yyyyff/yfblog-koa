const { Users } = require('../models')
const { SuccessException } = require('../../base/exception')
const { generateToken } = require('../lib/token')
const { authLevel } = require('../../config/config')
class UserCtl {
  async register(ctx) {
    const { username, nickname, password, email } = ctx.request.body

    await Users.create({ username, nickname, password, email })
    throw new SuccessException()
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
      //  throw 权限不对
    }
    let user = await Users.findOne({
      where: { uid }
    })
    if (
      ctx.body.currentPassword !== undefined &&
      ctx.body.newPassword !== undefined
    ) {
      await user.updatePassword(ctx.body.currentPassword, ctx.body.newPassword)
    }
    if (ctx.body.nickname !== undefined) {
      await user.updateNickName(ctx.body.nickname)
    }
  }

  async deleteUser(ctx) {
    let uid = ctx.params.uid
    if (ctx.state.user.uid !== authLevel.ADMIN) {
      // throw 权限不足
    }
    if (ctx.state.user.uid === uid) {
      // throw 不能自己删除自己
    }

    let user = await Users.findOne({
      where: { uid }
    })

    await user.destroy()

    //throw 成功
  }
}

module.exports = new UserCtl()
