const Joi = require('@hapi/joi')

exports.checkRegister = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  nickname: Joi.string()
    .min(1)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  repeat_password: Joi.ref('password'),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net']
    }
  })
}).with('password', 'repeat_password')

exports.checkLogin = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().required()
})
