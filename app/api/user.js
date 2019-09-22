const Router = require('koa-router')
const Joi = require('@hapi/joi')
const validator = require('../../middleware/validator')()
const { User } = require('../models/users')

const router = new Router({
  prefix: '/user'
})

const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
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

router.post('/register', validator.body(registerSchema), async ctx => {
  const { username, password, email } = ctx.request.body

  User.create({
    username,
    password,
    email
  })
})

module.exports = router
