const Router = require('koa-router')
const validator = require('../../middleware/validator')()
const {  } = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')
const router = new Router({
  prefix: '/option'
})


router.get('/',auth(),getOption)
router.put('/',auth(),updateOption)
module.exports = router
