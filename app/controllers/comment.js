const { Comments } = require('../models')

class CommentCtl {
  async getAllComment(ctx) {
    const { page = 1, pageSize = 10 } = ctx.query
    let comments = await Comments.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['createdAt', 'DESC']]
    })

    //todo return comments
  }
  async addComment(ctx) {
    const {
      cid,
      author,
      authorId,
      mail,
      url,
      ip,
      agent,
      text,
      parent
    } = ctx.request.body
    if (authorId) {
      const comment = await Comments.create({
        cid,
        authorId,
        ip,
        agent,
        text,
        parent
      })
    } else {
      const comment = await Comments.create({
        cid,
        author,
        mail,
        url,
        ip,
        agent,
        text,
        parent
      })
    }
  }
  async deleteComment() {
    const { coid } = ctx.params
    const comment = await Comments.destroy({ where: coid })
  }
}

module.exports = new CommentCtl()
