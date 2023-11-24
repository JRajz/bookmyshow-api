const express = require('express');

const { Logger } = require('./utilities');
const Config = require('./config');
const initLoader = require('./loaders');
const { sequelize } = require('./loaders/sequelize');

Logger.init();
(async () => {
  try {
    const app = express();

    await initLoader({ expressApp: app });

    app.listen(Config.Port, (err) => {
      if (err) {
        Logger.error('Unable to start server', err);
        process.exit(1);
      }

      Logger.info(`\n
      ################################################
      🛡️  Server listening on port: ${Config.Port} 🛡️
      ################################################\n\n`);
    });
  } catch (e) {
    Logger.error('.. Unable to start server', e);
  }
})();

process.on('SIGINT', async () => {
  try {
    Logger.info('Stopping server');

    await sequelize.close();

    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
});
