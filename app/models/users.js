const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcrypt')
const { sequelize } = require('../../base/db')

class User extends Model {}

User.init(
  {
    username: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    avatar: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const pwd = bcrypt.hashSync(val, salt)
        this.setDataValue('password', pwd)
      }
    },
    email: {
      type: Sequelize.STRING(50)
    }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

module.exports = {
  User
}
