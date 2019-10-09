const Router = require('koa-router')
const validator = require('../../middleware/validator')()
const { checkRegister, checkUpdateUser, checkLogin } = require('../lib/validatorSchema')
const { register, login, updateUser, deleteUser } = require('../controllers/user')
const auth = require('../../middleware/auth')

const router = new Router({
  prefix: '/user'
})

router.post('/register', validator.body(checkRegister), register)
router.post('/login', validator.body(checkLogin), login)
router.put('/:uid', auth(), validator.params(checkUpdateUser), updateUser)
router.delete('/:uid', auth(), deleteUser)

module.exports = router
