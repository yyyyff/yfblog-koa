const { Sequelize, Model } = require('sequelize')

class Relationships extends Model {
  static init(sequelize) {
    return super.init(
      {
        cid: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        mid: {
          type: Sequelize.INTEGER.UNSIGNED,
        }
      },
      {
        sequelize,
        tableName: 'relationships'
      }
    )
  }
}

module.exports = Relationships
