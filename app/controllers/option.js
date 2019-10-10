const { Options } = require('../models')
const { Success } = require('../../base/exception')
class OptionCtl {
  async getOption(ctx) {
    let option = await Options.findByPk(1, {
      attributes: { exclude: ['id'] }
    })

    // TODO return format
    ctx.body = { option }
  }
  async updateOption(ctx) {
    let option =  await Options.findByPk(1)
    const update = await option.update({
      ...ctx.request.body
    })
    throw new Success('配置更改成功')
  }
}

module.exports = new OptionCtl()
