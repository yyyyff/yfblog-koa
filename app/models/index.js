const fs = require('fs')
const path = require('path')
const sequelize = require('../../base/db')

// const UsersModel = require('./users')

// const models = {
//   Users: UsersModel.init(sequelize)
// }

const models = {}
fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))
    models[model.name] = model.init(sequelize)
  })

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

module.exports = db
