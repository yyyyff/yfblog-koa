const { Contents } = require('../models')

// getArticle createArticle findBySlug updateById deleteById
class ArticleCtl {
  async getArticle(ctx) {
    const {page = 1,pageSize = 10,keywords,slug,mid} = ctx.query
    
  }
  async createArticle(ctx) {}
  async findBySlug(ctx) {}
  async updateById(ctx) {}
  async deleteById(ctx) {}
}

module.exports = new ArticleCtl()
