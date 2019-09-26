const { Forbbiden } = require('../base/exception')

function authorizationHeader(ctx) {
  if ((!ctx, header || !ctx.header.authorization)) {
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
module.exports = level => {
  let level = level || 0
  return async function jwt(ctx, next) {
    let token = authorizationHeader(ctx)
    if (!token) {
      throw new Forbbiden()
    }
  }
}
