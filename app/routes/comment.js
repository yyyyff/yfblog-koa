const Router = require('koa-router')
const router = new Router({
  prefix: '/comment'
})

router.get('/', async ctx => {
  ctx.body = 'this is comment'
})

module.exports = router
