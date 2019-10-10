const { Sequelize, Model } = require('sequelize')

class Metas extends Model {
  static init(sequelize) {
    return super.init(
      {
        mid: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        slug: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        type: {
          type: Sequelize.STRING(32),
          defaultValue: 'tags'
        },
        count: {
          type: Sequelize.INTEGER.UNSIGNED,
          defaultValue: 0
        }
      },
      {
        sequelize,
        tableName: 'metas',
        indexes: [
          {
            unique: true,
            fields: ['slug']
          }
        ]
      }
    )
  }

  static associate(models){
    this.belongsToMany(models.Contents,{
      through: {
        model: models.Relationships
      },
      foreignKey: 'mid',
      constraints: false
    })
  }
}

module.exports = Metas
