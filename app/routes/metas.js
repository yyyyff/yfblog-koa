const Router = require('koa-router')
const { findBySlug, findAll, addMeta, updateByMid, deleteByMid } = require('../controllers/meta')
const validator = require('../../middleware/validator')()
const { checkFindBySlug,checkAddMeta, checkUpdateAndDelMetaByMid } = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')
const router = new Router()

let routers = ['/categories', '/tags']

routers.forEach(routerName => {
  router.get(`${routerName}/:slug`, validator.params(checkFindBySlug), findBySlug)
  router.get(`${routerName}/`, findAll)
  router.post(`${routerName}/add`, auth(), validator.body(checkAddMeta), addMeta)
  router.put(`${routerName}/:mid`, auth(), validator.params(checkUpdateAndDelMetaByMid), updateByMid)
  router.delete(`${routerName}/:mid`, auth(), validator.params(checkUpdateAndDelMetaByMid), deleteByMid)
})

module.exports = router
