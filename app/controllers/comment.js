const { Comments } = require('../models')
const { Success } = require('../../base/exception')

class CommentCtl {
  async getAllComment(ctx) {
    const { page = 1, pageSize = 10 } = ctx.query
    let comments = await Comments.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['createdAt', 'DESC']]
    })

    ctx.body = { comments }
    //todo return format
  }
  async addComment(ctx) {
    const { cid, author, authorId, mail, url, ip, agent, text, parent } = ctx.request.body
    await Comments.create({
      cid,
      author,
      authorId,
      mail,
      url,
      ip,
      agent,
      text,
      parent
    })
    throw new Success('添加评论成功')
  }
  async deleteComment() {
    const { coid } = ctx.params
    await Comments.destroy({ where: coid })
    throw new Success('删除评论成功')
  }
}

module.exports = new CommentCtl()
