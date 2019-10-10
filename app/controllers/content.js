const { Contents } = require('../models')
const { Success, NotFound } = require('../../base/exception')

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
      throw new NotFound('未找到相关信息')
    }

    // todo return format
    ctx.body = { contents }
  }
  async createArticle(ctx) {
    const { title, slug, content, order = 0, authorId, type = 'archive', allowComment = 1, metaIds = [] } = ctx.request.body
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
    // metas.forEach(meta => {
    //   meta.increment('count')
    // })
    // increment 适合单个实例自增，虽然用forEach能得到单个实例
    // 但是forEach并不会按照预计进行执行 async/await无效
    await Metas.update({ count: sequelize.literal(`'count'+1`) }, { where: { mid: metaIds } })
    await newArticle.setMetas(metas)

    throw new Success('内容创建成功')
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
    ctx.body = {archive}
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
