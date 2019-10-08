const zh = require('zh_cn')
const { Metas } = require('../models')

function getType(ctx){
  ctx.url.indexOf('tag') !== -1 ? 'tags':'category'
}

class MetaCtl {
  async findAll(ctx) {
    const data = await Metas.findAll({
      where: {type:getType(ctx)}
    })

    //TODO return data
  }
  async findBySlug(ctx) {
    let slug = ctx.params.slug
    const data = await Metas.findOne({
      where: {slug},
      include: [
        {
          model: Contents,
          attributes:['cid','title','slug','order'],
          where: {type: 'archive'}
          // TODO pagesize limit? 
        }
      ]
    })
  }
  async addMeta(ctx) {
    const {mid,name,slug,type=getType(ctx)} = ctx.body
    
    if(!slug){
      slug = zh(name,{
        style:zh.STYLE_NORMAL
      })
    }
    let newMeta = await Metas.create({
      mid,name,slug,type
    })

    //TODO return newMeta
  }
  async updateByMid(ctx) {
    const mid = ctx.params.mid
    const {name,slug} = ctx.body
    Metas.findByPk(mid).then(oldMetas=>{
      Metas.update({name,slug})
    })

    //TODO return true
  }
  async deleteByMid(ctx) {
    const mid = ctx.params.mid
    const meta = await Metas.findByPk(mid)
    await meta.destroy()

    //TODO retrun true
  }
}

module.exports = new MetaCtl()
