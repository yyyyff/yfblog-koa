const requireDirectory = require("require-directory");
const Router = require("koa-router");
const parser = require("koa-bodyparser");
const errorCatch = require('../middleware/errorCatch')

class InitManager {
  static initApp(app) {
    InitManager.app = app;
    InitManager.useMiddleware()
    InitManager.loadRoutes();
  }

  static useMiddleware(){
    // 保证errorCatch在最开始的调用
    InitManager.app.use(errorCatch())
    InitManager.app.use(parser())
  }

  static loadRoutes() {
    requireDirectory(module, "../app/api", {
      visit: loadModule
    });

    function loadModule(module) {
      if (module instanceof Router) {
        InitManager.app.use(module.routes());
      }
    }
  }
}

module.exports = InitManager;
