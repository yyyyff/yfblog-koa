const Router = require('koa-router')
const validator = require('../../middleware/validator')()
const { checkRegister, checkLogin } = require('../lib/validatorSchema')
const { register, login } = require('../controllers/user')

const router = new Router({
  prefix: '/user'
})

router.post('/register', validator.body(checkRegister), register)
router.post('/login', validator.body(checkLogin), login)
module.exports = router
