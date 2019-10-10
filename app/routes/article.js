const Router = require('koa-router')
const { getArticle, createArticle, findBySlug, updateById, deleteById } = require('../controllers/content')
const validator = require('../../middleware/validator')()
const { checkCreateArticle, checkGetArticle, checkFindBySlug, checkUpdateAndDelArtById } = require('../lib/validatorSchema')
const auth = require('../../middleware/auth')
const router = new Router({
  prefix: '/article'
})

router.get('/', validator.query(checkGetArticle), getArticle) // 获取文章
router.post('/', auth(), validator.body(checkCreateArticle), createArticle) // 创建文章
router.get('/:slug', validator.params(checkFindBySlug), findBySlug) // 文章详情
router.put('/:cid', auth(), validator.params(checkUpdateAndDelArtById), updateById) // 修改文章
router.delete('/:cid', auth(), validator.params(checkUpdateAndDelArtById),deleteById) // 删除文章
// router.get('/hotArticle',getHotArticle)     // 热门文章

module.exports = router
