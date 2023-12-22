'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

var sequelizeDB = {}

const addModels = (db, schema) => {
  let folders = fs.readdirSync(__dirname)

  folders = folders?.map(v => path.join(__dirname, v))?.filter(v => fs?.lstatSync(v)?.isDirectory())

  var files = []

  for (var folder of folders) {
    files.push({
      [folder]: fs.readdirSync(folder).filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
      })
    })
  }

  files = files?.flat()

  for (var obj of files) {
    var [dbPath, fileList] = Object.entries(obj)[0]
    for (var y of fileList) {
      var model = require(path.join(dbPath, y))(db, Sequelize.DataTypes, schema)
      sequelizeDB[model.name] = model
    }
  }

  Object.keys(sequelizeDB).forEach(modelName => {
    if (sequelizeDB[modelName].associate) {
      sequelizeDB[modelName].associate(sequelizeDB)
    }
  })
}

module.exports = addModels