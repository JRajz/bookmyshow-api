const expressLoader = require('./express');
const { sequelize } = require('./sequelize');
const { Logger } = require('../utilities');

// eslint-disable-next-line func-names
const loader = async function ({ expressApp }) {
  await sequelize.authenticate();
  Logger.info('✌️  DB loaded and connected!');

  await expressLoader.loadModules({ app: expressApp });
  Logger.info('✌️  Express loaded');
};

module.exports = loader;
