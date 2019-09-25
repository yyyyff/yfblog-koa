const Router = require('koa-router')
const { Exception } = require('../../base/exception')
const validator = require('../../middleware/validator')()
const Joi = require('@hapi/joi')
const router = new Router({
  prefix: '/article'
})

router.get('/', async ctx => {
  ctx.body = 'this is article'
})

router.get('/newest', async (ctx, next) => {
  if (true) {
    const error = new Exception('test error exception', 12345, 400)
    throw error
  }
})

const querySchema = Joi.object({
  id: Joi.number().required()
})

router.get('/test/:id', async (ctx, next) => {
  ctx.body = typeof ctx.params.id
})

router.get('/:id', validator.params(querySchema), async (ctx, next) => {
  ctx.body = typeof ctx.params.id
})

module.exports = router
