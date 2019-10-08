const { Contents } = require('../models')
const { NotFound } = require('../../base/exception')

class ArticleCtl {
  async getArticle(ctx) {
    const { page = 1, pageSize = 10, keywords = '', slug = null } = ctx.query
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
          arrtibutes: ['mid', 'slug', 'name', 'type'],
          where: { slug }
        }
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['createdAt', 'DESC'], ['order', 'DESC']]
    })

    if (!contents) {
      throw new NotFound('未找到相关文章')
    }

    // todo return format
    return contents
  }
  async createArticle(ctx) {
    const {
      title,
      slug,
      content,
      order = 0,
      authorId,
      type = 'archive',
      allowComment = 1,
      metaIds = []
    } = ctx.request.body
    const newArticle = await Contents.create({
      title,
      slug,
      content,
      order,
      authorId,
      type,
      allowComment
    })
    let metas = await Metas.findAll({ where: { mid: metaIds } })
    metas.forEach(meta => {
      meta.increment('count')
    })
    await newArticle.setMetas(metas)

    //todo return true
  }
  async findBySlug(ctx) {
    const { slug } = ctx.params
    const archive = await Contents.findOne({
      where: { slug },
      include: [
        {
          model: Metas,
          attributes: ['mid', 'name', 'slug', 'type']
        },
        {
          model: Comments,
          attributes: ['coid', 'author', 'authorId', 'url', 'text', 'parent'],
          where: {
            close: {
              [Op.ne]: 1
            }
          },
          include: [
            {
              model: Users,
              arrtibutes: ['nickname', 'avatar']
            }
          ]
        }
      ]
    })
    //todo return archive
  }
  async updateById(ctx) {
    const { cid } = ctx.params
    const { title, slug, content, slug, content, order, metaIds } = ctx.request.body
    let metas = await Metas.findAll({ where: { mid: metaIds } })
    const content = await Contents.findById(cid)
    content.update({ title, slug, content, order })
    content.setMetas(metas)

    //todo return true
  }

  async deleteById(ctx) {
    const { cid } = ctx.params
    await Contents.destroy({ where: { cid } })

    //todo return true
  }
}

module.exports = new ArticleCtl()
