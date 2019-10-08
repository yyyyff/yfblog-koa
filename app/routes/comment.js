const Router = require('koa-router')
const router = new Router({
  prefix: '/comment'
})


router.get('/',getAllComment)
router.post('/add',addComment)
router.delete('/:coid',deleteComment)

module.exports = router
