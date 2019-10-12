const { Op, literal } = require('sequelize')
const zh = require('zh_cn')
const { Contents, Metas, Comments, Users } = require('../models')
const { Success, NotFound } = require('../../base/exception')

class ArticleCtl {
  async getArticle(ctx) {
    const { page = 1, pageSize = 10, keywords = '' } = ctx.query
    let contents = await Contents.findAll({
      where: {
        type: {
          [Op.notLike]: '%page%'
        },
        [Op.or]: {
          title: {
            [Op.like]: `%${keywords}%`
          }
        }
      },
      include: [
        {
          model: Metas,
          attributes: ['mid', 'slug', 'name', 'type'],
          through: {attributes:[]} // 不展示Relationships表
        }
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['createdAt', 'DESC'], ['order', 'DESC']]
    })

    if (contents.length === 0) {
      throw new NotFound('未找到相关信息')
    }

    // todo return format
    ctx.body = { contents }
  }
  async createArticle(ctx) {
    const { title, slug, content, order = 0, type = 'archive', allowComment = 1, metaIds = [] } = ctx.request.body
    // 所有获取用户信息的操作，都应该在auth里完成
    let authorId = ctx.state.user.uid
    let saveSlug =
      slug ||
      zh(title, {
        style: zh.STYLE_NORMAL
      }).join('_')
    const hasSlug = await Contents.findAll({ where: { slug:saveSlug } })
    if (hasSlug.length !== 0) {
      const D = new Date()
      let timestamp = D.getTime()
      saveSlug = `${saveSlug}_${timestamp}`
    }
    const newArticle = await Contents.create({
      title,
      slug:saveSlug,
      content,
      order,
      authorId,
      type,
      allowComment
    })
    if (metaIds.length > 0) {
      let metas = await Metas.findAll({ where: { mid: metaIds } })
      // metas.forEach(meta => {
      //   meta.increment('count')
      // })
      // increment 适合单个实例自增，虽然用forEach能得到单个实例
      // 但是forEach并不会按照预计进行执行 async/await无效
      await Metas.update({ count: literal(`'count'+1`) }, { where: { mid: metaIds } })
      await newArticle.setMetas(metas)
    }

    throw new Success('内容创建成功')
  }
  async findBySlug(ctx) {
    const { slug } = ctx.params
    const archive = await Contents.findOne({
      where: { slug },
      include: [
        {
          model: Metas,
          attributes: ['mid', 'name', 'slug', 'type'],
          through: {attributes:[]}
        },
        {
          model: Comments,
          attributes: ['coid', 'author', 'authorId', 'url', 'text', 'parent'],
          include: [
            {
              model: Users,
              arrtibutes: ['nickname', 'avatar']
            }
          ]
        }
      ]
    })
    ctx.body = { archive }
  }
  async updateById(ctx) {
    const { cid } = ctx.params
    const { title, slug, content, order, metaIds } = ctx.request.body
    let metas = await Metas.findAll({ where: { mid: metaIds } })
    const oldContent = await Contents.findById(cid)
    oldContent.update({ title, slug, content, order })
    oldContent.setMetas(metas)

    throw new Success('内容更新成功')
  }

  async deleteById(ctx) {
    const { cid } = ctx.params
    await Contents.destroy({ where: { cid } })

    throw new Success('内容已删除')
  }
}

module.exports = new ArticleCtl()
