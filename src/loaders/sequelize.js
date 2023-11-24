const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const Config = require('../config');

const basename = path.basename(__filename);
const Models = {};

const modelsPath = `${__dirname}/../models`;

// eslint-disable-next-line max-len
const sequelize = new Sequelize(Config.Database.Name, Config.Database.User, Config.Database.Password, {
  host: Config.Database.Host,
  dialect: Config.Database.Dialect,
  charset: Config.Database.Charset,
  collate: Config.Database.Collate,
  benchmark: true, // log query time
  logQueryParameters: true,
  // eslint-disable-next-line no-console
  logging: Config.Database.LogQuery && console.log,
});

fs.readdirSync(modelsPath)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(`${modelsPath}/${file}`)(sequelize, Sequelize.DataTypes);
    Models[model.name] = model;
  });

Object.keys(Models).forEach((modelName) => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models);
  }
});

module.exports = {
  Models,
  sequelize,
};
