const Router = require('koa-router')
const { findBySlug, findAll, addCategory, updateByMid, deleteByMid } = require('../controllers/meta')
const validator = require('../../middleware/validator')()
const {} = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')
const router = new Router()

let routers = ['/categories', '/tags']
routers.forEach(routerName => {
  router.get(`${routerName}/:slug`, findBySlug)
  router.get(`${routerName}/`, findAll)
  router.post(`${routerName}/add`, auth(), addCategory)
  router.put(`${routerName}/:mid`, auth(), updateByMid)
  router.delete(`${routerName}/:mid`, auth(), deleteByMid)
})

module.exports = router
