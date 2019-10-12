const { Comments, Contents } = require('../models')
const { Success, NotFound, Forbbiden } = require('../../base/exception')

class CommentCtl {
  async getAllComment(ctx) {
    const { page = 1, pageSize = 10 } = ctx.query
    let comments = await Comments.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['ContentCid','UserUid'] }
    })

    ctx.body = { comments }
    //todo return format
  }
  async addComment(ctx) {
    const { cid, author, mail, url, ip, agent, text, parent } = ctx.request.body
    const authorId = ctx.state.user.uid
    const content = await Contents.findByPk(cid)
    if (!content) {
      throw new NotFound('没有找到对应的文章，请联系管理员')
    }
    if (!content.allowComment) {
      throw new Forbbiden('这篇文章禁止评论')
    }

    if (authorId) {
      await Comments.create({
        cid,
        authorId,
        ip,
        agent,
        text,
        parent
      })
    } else {
      await Comments.create({
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
    throw new Success('添加评论成功')
  }
  async deleteComment(ctx) {
    const { coid } = ctx.params
    const comment = await Comments.findByPk(coid)
    if (!comment) {
      throw new Forbbiden('没有这条评论，请刷新数据重试')
    }
    await comment.destroy()

    throw new Success('删除评论成功')
  }
  // TODO 判断父子
}

module.exports = new CommentCtl()
