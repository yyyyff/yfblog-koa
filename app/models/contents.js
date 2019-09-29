const { Sequelize, Model } = require('sequelize')

class Contents extends Model {

  static getArticle({page = 1,pageSize = 10,keywords = '',slug,mid}){
    
    await Contents.findAll({
      where: {
        type: {
          [Op.notLike]: '%page%'
        },
        [Op.or]:{
          title: {
            [Op.like]: `%${keywords}%`
          },
        }
      }
    })
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
    this.hasMany(models.Comments)
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
