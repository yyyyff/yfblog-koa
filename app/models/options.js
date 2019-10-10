const { Sequelize, Model } = require('sequelize')

class Options extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING(200)
        },
        keyword: {
          type: Sequelize.STRING(200)
        },
        register: {
          type: Sequelize.INTEGER(1).UNSIGNED,
          defaultValue: 0
        }
      },
      {
        sequelize,
        tableName: 'options'
      }
    )
  }
}

module.exports = Options
