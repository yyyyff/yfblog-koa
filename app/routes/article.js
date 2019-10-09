const Router = require('koa-router')
const { getArticle, createArticle,findBySlug,updateById,deleteById } = require('../controllers/content')
const validator = require('../../middleware/validator')()
const {  } = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')
const router = new Router({
  prefix: '/article'
})

router.get('/',getArticle)                  // 获取文章
router.post('/',createArticle)              // 创建文章
router.get('/:slug',findBySlug)             // 查找文章
router.put('/:cid',updateById)               // 修改文章
router.delete('/:cid',deleteById)            // 删除文章
// router.get('/hotArticle',getHotArticle)     // 热门文章

module.exports = router
