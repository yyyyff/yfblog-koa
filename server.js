const Koa = require('koa')
const InitManager = require('./base/init')

const app = new Koa()

InitManager.initApp(app)

app.listen(3030)
