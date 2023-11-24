const HttpStatus = require('http-status-codes');

module.exports = {
  tryAgain: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Please try again',
  },
  invalidCity: {
    code: HttpStatus.NOT_FOUND,
    message: 'Invalid City',
  },
};
