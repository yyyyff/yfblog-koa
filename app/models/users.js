const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const { sequelize } = require('../../base/db')
const { env, authLevel } = require('../../config/config')
const { AuthFailed } = require('../../base/exception')

class User extends Model {
  static async verifyPassword(username, password) {
    const user = await User.findOne({
      where: {
        username
      }
    })
    if (!user) {
      throw new AuthFailed('用户不存在')
    }

    const comparePwd = bcrypt.compareSync(password, user.password)
    if (!comparePwd) {
      throw new AuthFailed('密码不正确')
    }

    return user
  }
}

User.init(
  {
    username: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING(32)
    },
    avatar: {
      type: Sequelize.STRING(255),
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
    },
    authLevel: {
      type: Sequelize.INTEGER,
      defaultValue: env === 'dev' ? authLevel.ADMIN : authLevel.GUEST
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
