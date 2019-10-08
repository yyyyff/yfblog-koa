const Router = require('koa-router')
const validator = require('../../middleware/validator')()
const router = new Router()

let routers = ['/categories', '/tags']
routers.forEach(routerName => {
  router.get(`${routerName}/:slug`, findBySlug)
  router.get(`${routerName}/`, findAll)
  router.post(`${routerName}/add`, addCategory)
  router.put(`${routerName}/:mid`, updateBySlug)
  router.delete(`${routerName}/:mid`, deleteBySlug)
})

module.exports = router
