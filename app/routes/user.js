const Router = require('koa-router')
const validator = require('../../middleware/validator')()
const { checkRegister, checkLogin } = require('../lib/validatorSchema')
const { register, login,updateUser,deleteUser } = require('../controllers/user')
const auth = require('../../middleware/auth')
const router = new Router({
  prefix: '/user'
})


router.post('/register', validator.body(checkRegister), register)
router.post('/login', validator.body(checkLogin),login)
router.put('/:uid',auth(),updateUser)
router.delete('/:uid',auth(),deleteUser)
router.get('/authtest',auth(),async ctx =>{
  ctx.body = ctx.state.user
})
module.exports = router
