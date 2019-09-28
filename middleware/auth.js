const { Forbbiden } = require('../base/exception')
const { verify } = require('jsonwebtoken')
const { token, authLevel } = require('../config/config')
function authorizationHeader(ctx) {
  if (!ctx.header || !ctx.header.authorization) {
    return
  }

  const parts = ctx.header.authorization.split(' ')
  if (parts.length === 2) {
    const schema = parts[0]
    const credentials = parts[1]

    if (/^Bearer$/i.test(schema)) {
      return credentials
    }
  }
}

// level 区分权限
module.exports = (level = authLevel.ADMIN) => {
  return async function jwt(ctx, next) {
    let userToken = authorizationHeader(ctx)
    let decode = {}
    let errMsg = '身份校验失败，请重新登录试试'
    if (!userToken) {
      throw new Forbbiden(errMsg)
    }
    try {
      decode = verify(userToken, token.secret)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        errMsg = '用户身份已过期，请重新登陆'
      }
      throw new Forbbiden(errMsg)
    }

    if (decode.authLevel < level) {
      throw new Forbbiden('权限不足')
    }
    console.log(decode)
    ctx.state.user = decode

    await next()
  }
}
