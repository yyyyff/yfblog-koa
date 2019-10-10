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
    const { username, password } = ctx.request.body
    const user = await Users.verifyPassword(username, password)
    const token = generateToken(user.uid, user.authLevel)
    ctx.body = { token }
  }

  async getAllUsers(ctx) {
    const allUsers = await Users.findAll({
      attributes: {exclude: ['password']}
      // TODO authLevel返回格式化
    })
    ctx.body = { allUsers }
  }

  async updateUser(ctx) {
    const uid = parseInt(ctx.params.uid)
    console.log(uid,ctx.state.user)
    if (ctx.state.user.uid !== uid) {
      throw new AuthFailed('只能对自己账户进行操作')
    }
    const user = await Users.findOne({
      where: { uid }
    })
    if (ctx.request.body.currentPassword !== undefined && ctx.request.body.newPassword !== undefined) {
      await user.updatePassword(ctx.request.body.currentPassword, ctx.request.body.newPassword)
    }
    if (ctx.request.body.nickname !== undefined) {
      await user.updateNickName(ctx.request.body.nickname)
    }

    //todo 设计的不好，有空修改
  }

  async deleteUser(ctx) {
    const uid = parseInt(ctx.params.uid)
    if (ctx.state.user.uid === uid) {
      throw new Forbbiden('不能删除自己')
    }

    const user = await Users.findByPk(uid)

    if(!user){
      throw new Forbbiden('无此用户')
    }

    await user.destroy()

    throw new Success('删除成功')
  }
}

module.exports = new UserCtl()
