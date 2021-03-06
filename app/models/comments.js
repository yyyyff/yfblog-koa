const { Sequelize, Model } = require('sequelize')

class Comments extends Model {
  static init(sequelize) {
    return super.init(
      {
        coid: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        cid: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        author: {
          type: Sequelize.STRING(200),
        },
        authorId: {
          type: Sequelize.INTEGER.UNSIGNED
        },
        mail: {
          type: Sequelize.STRING(200),
        },
        url: {
          type: Sequelize.STRING(200)
        },
        ip: {
          type: Sequelize.STRING(64),
        },
        agent: {
          type: Sequelize.STRING(20)
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        parent: {
          type: Sequelize.INTEGER(10)
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      },
      {
        sequelize,
        tableName: 'comments',
        indexes: [
          {
            fields: ['cid']
          }
        ]
      }
    )
  }
  static associate(models) {
    this.belongsTo(models.Contents, {
      foreignKey: 'cid',
      targetKey: 'cid',
      onDelete:'CASCADE',
      constraints: false
    })
    this.hasOne(models.Users, {
      foreignKey: 'uid',
      sourceKey:'authorId',
      constraints: false

    })
  }
}

module.exports = Comments
