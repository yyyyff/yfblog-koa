const { Exception } = require("../base/exception");
const { env } = require("../config/config");

const isDev = env === "dev";

const errorCatch = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      const isException = error instanceof Exception;
      if (isDev && !isException) {
        throw error;
      }

      if (isException) {
        ctx.body = {
          msg: error.msg,
          errorCode: error.errorCode,
          request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = error.status;
      } else {
        ctx.body = {
          msg: "可能遇到了非同寻常的错误，正在排查中",
          error_code: 3333,
          request: `${ctx.method} ${ctx.path}`
        };
        ctx.status = 500;
      }
    }
  };
};

module.exports = errorCatch;
