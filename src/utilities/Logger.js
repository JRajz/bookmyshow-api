const winston = require('winston');

let LoggerInstance = null;

const stringifyProperties = (info) => {
  const skip = ['message', 'timestamp', 'level'];
  let response = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const key in info) {
    if (Object.prototype.hasOwnProperty.call(info, key)) {
      const value = info[key];
      if (!skip.includes(key) && value) {
        response += ` [${key}=${value}]`;
      }
    }
  }

  return response;
};

class Logger {
  static init({ level = 'info' } = {}) {
    const transports = [];

    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(winston.format.cli(), winston.format.simple()),
      }),
    );

    const loggerLevels = {
      fatal: 0,
      alert: 1,
      error: 2,
      warn: 3,
      info: 4,
      debug: 5,
      trace: 6,
    };

    LoggerInstance = winston.createLogger({
      level,
      levels: loggerLevels,
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.printf(
          (info) => `[${info.timestamp}] [${info.level}] [${info.message}] ${stringifyProperties(info)}`,
        ),
      ),
      transports,
    });

    LoggerInstance.info('Starting logging service');
  }

  static _log(level, message, meta) {
    if (meta instanceof Error) {
      // eslint-disable-next-line no-param-reassign
      meta = {
        name: meta.name || '',
        message: meta.message,
        stack: meta.stack,
      };
    }

    LoggerInstance.log(level, message, meta);
  }

  static info(message, meta = {}) {
    Logger._log('info', message, meta);
  }

  static error(message, error) {
    Logger._log('error', message, error);
  }
}

module.exports = Logger;
