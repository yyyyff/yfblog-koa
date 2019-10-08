const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../base/db')

class Options extends Model {
  static async getOption(){
    const option = await Options.findAll({
      limit: 1
    })
    return option
  }
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
          primaryKey: true
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
