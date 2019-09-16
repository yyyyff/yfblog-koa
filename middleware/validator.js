const Joi = require("@hapi/joi");
const { JoiException } = require("../base/exception");
const containers = {};
const allParams = ["query", "body", "headers", "params"];

// 设置默认规则
allParams.forEach(type => {
  containers[type] = {
    storageName: `original${type}`,
    joi: {
      covert: true,
      allowUnknown: false,
      abortEarly: false
    }
  };
  if (type === "headers") {
    containers[type].joi = Object.assign(containers[type].joi, {
      // 仔细想了一下，这里不设置问题也不大
      allowUnknown: true,
      stripUnknown: false
    });
  }
});

function validatorInstance() {
  const instance = {};

  Object.keys(containers).forEach(type => {
    const container = containers[type];
    instance[type] = function(schema, options = {}) {
      return async function validator(ctx, next) {
        const result = schema.validate(
          type === "params" ? ctx[type] : ctx.request[type],
          options.joi || container.joi
        );

        if (!result.error) {
          // 如果convert为false 可以不用多此一举
          if (type === "params") {
            ctx[container.storageName] = ctx[type];
            ctx[type] = result.value;
          } else {
            ctx.request[container.storageName] = ctx.request[type];
            ctx.request[type] = result.value;
          }

          await next();
        } else {
          throw new JoiException(result.error);
        }
      };
    };
  });
  return instance;
}

module.exports = validatorInstance;
