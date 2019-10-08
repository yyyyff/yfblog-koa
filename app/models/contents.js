const { Sequelize, Model } = require('sequelize')
const { NotFound } = require('../../base/exception')
class Contents extends Model {
  static async getArticle({
    page = 1,
    pageSize = 10,
    keywords = '',
    slug = null
  }) {
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
      throw new NotFound('未找到相关文章')
    }

    return contents
  }

  static async createArticle({
    title,
    slug,
    content,
    order = 0,
    authorId,
    type = 'archive',
    allowComment = 1,
    metaIds = []
  }) {
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
    metas.forEach(meta=>{
      meta.increment('count')
    })
    await newArticle.setMetas(metas)

    //todo  return true
  }

  static async findBySlug({ slug }) {
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
    //todo return archive
  }

  static async updateById({ cid, title, slug, content, order, metaIds }) {
    let metas = await Metas.findAll({ where: { mid: metaIds } })
    Contents.findByPk(cid).then(oldContent => {
      Contents.update({ title, slug, content, order })
      Contents.setMetas(metas)
    })
    //todo return true
  }

  static async deleteById({ cid }) {
    await Contents.destroy({ where: { cid } })
  }

  static init(sequelize) {
    return super.init(
      {
        cid: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        slug: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT
        },
        order: {
          type: Sequelize.INTEGER.UNSIGNED,
          defaultValue: 0
        },
        authorId: {
          type: Sequelize.INTEGER.UNSIGNED
        },
        type: {
          type: Sequelize.STRING(16),
          defaultValue: 'archive'
        },
        viewNum: {
          type: Sequelize.INTEGER(10).UNSIGNED,
          defaultValue: 0
        },
        commentsNum: {
          type: Sequelize.INTEGER(10).UNSIGNED,
          defaultValue: 0
        },
        allowComment: {
          type: Sequelize.INTEGER(1),
          defaultValue: 1
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updateAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      },
      {
        sequelize,
        tableName: 'contents',
        indexes: [
          {
            unique: true,
            fields: ['slug']
          }
        ]
      }
    )
  }
  static associate(models) {
    this.hasMany(models.Comments, { onDelete: 'CASCADE' })
    this.belongsTo(models.Users, {
      foreignKey: 'authorId',
      targetKey: 'uid',
      constraints: false
    })
    this.belongsToMany(models.Metas, {
      through: {
        model: models.Relationships
      },
      foreignKey: 'cid',
      constraints: false
    })
  }
}

module.exports = Contents
