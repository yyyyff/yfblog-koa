const zh = require('zh_cn')
const { Metas, Contents } = require('../models')
const { Success,Unique,Forbbiden } = require('../../base/exception')

function getType(ctx) {
  return ctx.url.indexOf('tag') !== -1 ? 'tags' : 'categories'
}

class MetaCtl {
  async findAll(ctx) {
    const data = await Metas.findAll({
      where: { type: getType(ctx) }
    })
    ctx.body = { data }
    //TODO return format
  }
  async findBySlug(ctx) {
    let slug = ctx.params.slug
    const data = await Metas.findOne({
      where: { slug },
      include: [
        {
          model: Contents,
          attributes: ['cid', 'title', 'slug', 'order'],
          where: { type: 'archive' }
          // TODO pagesize limit?
        }
      ]
    })
    ctx.body = { data }
  }
  async addMeta(ctx) {
    const { name, slug } = ctx.request.body
    const type = getType(ctx)
    let saveSlug =
      slug ||
      zh(name, {
        style: zh.STYLE_NORMAL
      }).join('_')

    const hasSlug = await Metas.findAll({ where: { slug: saveSlug } })
    if (hasSlug.length !== 0) {
      saveSlug = `${saveSlug}_1`
    }
    await Metas.create({
      name,
      slug: saveSlug,
      type
    })

    throw new Success('添加成功')
  }
  async updateByMid(ctx) {
    const mid = ctx.params.mid
    const { name, slug } = ctx.request.body
    if (slug) {
      const hasSlug = await Metas.findAll({ where: { slug } })
      if(hasSlug.length !== 0){
        throw new Unique()
      }
    }

    const meta = await Metas.findByPk(mid)
    await meta.update({name,slug})

    throw new Success('更新成功')
  }
  async deleteByMid(ctx) {
    const mid = ctx.params.mid
    const meta = await Metas.findByPk(mid)
    if(!meta){
      throw new Forbbiden('无此标签')
    }
    await meta.destroy()

    throw new Success('删除成功')
  }
}

module.exports = new MetaCtl()
