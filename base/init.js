const requireDirectory = require("require-directory")
const Router = require("koa-router")
const parser = require("koa-bodyparser")
const errorCatch = require("../middleware/errorCatch")
const { sequelize } = require("../app/models")
class InitManager {
  static initApp(app) {
    InitManager.app = app
    InitManager.router = new Router()
    InitManager.initDB()
    InitManager.useMiddleware()
    InitManager.loadRoutes()
  }

  static initDB() {
    sequelize.sync({
      force: false
    })
  }
  static useMiddleware() {
    // 保证errorCatch在最开始的调用
    InitManager.app.use(errorCatch())
    InitManager.app.use(parser())
  }

  static loadRoutes() {
    function loadModule(module) {
      if (module instanceof Router) {
        InitManager.router.use("/api", module.routes(), module.allowedMethods())
      }
    }

    requireDirectory(module, "../app/routes", {
      visit: loadModule
    })
    InitManager.app.use(InitManager.router.routes(),InitManager.router.allowedMethods())
  }
}

module.exports = InitManager
