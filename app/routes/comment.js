const Router = require('koa-router')
const { getAllComment, addComment, deleteComment } = require('../controllers/comment')
const validator = require('../../middleware/validator')()
const { checkGetAllComment, checkAddComment, checkDelComment } = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')

const router = new Router({
  prefix: '/comment'
})

router.post('/add', validator.body(checkAddComment), addComment)
router.get('/', auth(), validator.query(checkGetAllComment), getAllComment)
router.delete('/:coid', auth(), validator.params(checkDelComment), deleteComment)

module.exports = router
