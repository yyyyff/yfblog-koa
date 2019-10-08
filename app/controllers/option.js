const { Options } = require('../models')

class OptionCtl {
  async getOption(ctx) {
    let option = await Options.getOption()

    // TODO return format
    ctx.body = option
  }
  async updateOption(ctx) {
    let { title, description, keyword, register } = ctx.request.body
    let option = await PushSubscriptionOptions.getOption()
    option.update({
      title,
      description,
      keyword,
      register
    })
  }
}

module.exports = new OptionCtl()
