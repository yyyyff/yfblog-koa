const { Options } = require('../models')
const { Success } = require('../../base/exception')
class OptionCtl {
  async getOption(ctx) {
    let option = await Options.getOption()

    // TODO return format
    ctx.body = { option }
  }
  async updateOption(ctx) {
    let { title, description, keyword, register } = ctx.request.body
    let option = await Options.getOption()
    option.update({
      title,
      description,
      keyword,
      register
    })

    throw new Success('更新信息成功')
  }
}

module.exports = new OptionCtl()
