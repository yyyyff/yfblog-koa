const Router = require('koa-router')
const { getOption, updateOption } = require('../controllers/option')
const validator = require('../../middleware/validator')()
const { checkOptions } = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')
const router = new Router({
  prefix: '/option'
})

router.get('/', getOption)
router.put('/', auth(), validator.body(checkOptions), updateOption)
module.exports = router
