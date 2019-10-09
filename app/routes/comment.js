const Router = require('koa-router')
const { getAllComment,addComment,deleteComment } = require('../controllers/comment')
const validator = require('../../middleware/validator')()
const {  } = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')

const router = new Router({
  prefix: '/comment'
})


router.get('/',getAllComment)
router.post('/add',addComment)
router.delete('/:coid',deleteComment)

module.exports = router
