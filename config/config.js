module.exports = {
  env: 'dev', // dev: 开发 prod: 生产
  database: {
    db: 'yfblog',
    host: 'localhost',
    port: 3306,
    user: 'root',
    pwd: '123456'
  },
  token: {
    secret: 'yfblog-koa-json-web-token-secretKey',
    expiresIn: 60 * 60
  },
  authLevel: {
    ADMIN: 99,
    GUEST: 49,
    USER: 1
  }
}
