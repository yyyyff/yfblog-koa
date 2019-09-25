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
    secretKey: 'yfblog-koa-json-web-token-secretKey',
    expiresIn: 60 * 60
  }
}
