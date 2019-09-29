const requireDirectory = require('require-directory')
const Router = require('koa-router')
const parser = require('koa-bodyparser')
const errorCatch = require('../middleware/errorCatch')
const { sequelize } = require('../app/models')
class InitManager {
  static initApp(app) {
    InitManager.app = app
    InitManager.initDB()
    InitManager.useMiddleware()
    InitManager.loadRoutes()
  }

  static initDB() {
    sequelize.sync({
      force: true
    })
  }
  static useMiddleware() {
    // 保证errorCatch在最开始的调用
    InitManager.app.use(errorCatch())
    InitManager.app.use(parser())
  }

  static loadRoutes() {
    requireDirectory(module, '../app/routes', {
      visit: loadModule
    })

    function loadModule(module) {
      if (module instanceof Router) {
        InitManager.app.use(module.routes()).use(module.allowedMethods())
      }
    }
  }
}

module.exports = InitManager
