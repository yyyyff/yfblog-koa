const Sequelize = require('sequelize')
const { db, host, port, user, pwd } = require('../config/config').database

const sequelize = new Sequelize(db, user, pwd, {
  dialect: 'mysql',
  host,
  port,
  logging: console.log,
  timezone: '+08:00'
})

sequelize.sync()

module.exports = {
  sequelize
}
