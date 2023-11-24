/* eslint-disable no-param-reassign */
const HttpStatus = require('http-status-codes');

class Response {
  // eslint-disable-next-line default-param-last
  /**
   *
   * @param {*} res
   * @param {*} data - contains response data + message
   * @param {*} statusCode
   * @returns
   */
  static success(res, data = null, statusCode = HttpStatus.OK) {
    const resObj = {
      message: data.message || null,
      data: data || null,
      statusCode,
    };
    delete resObj.data.message; // removing message property from data

    return res.status(statusCode).json(resObj);
  }

  static fail(res, message) {
    const resObj = { error: true };

    // eslint-disable-next-line valid-typeof
    if (typeof message === 'Object') {
      resObj.message = message.message || 'failed';
      resObj.statusCode = message.code || HttpStatus.NOT_FOUND;
    } else {
      resObj.message = message.message || 'failed';
      resObj.statusCode = message.code || HttpStatus.NOT_FOUND;
    }
    resObj.extra = message.extra || {};

    res.status(resObj.statusCode).json(resObj);
  }

  static createError(type, err = null) {
    if (err) {
      return err;
    }

    const e = new Error(type.message);
    e.code = type.code || HttpStatus.INTERNAL_SERVER_ERROR;
    e.name = type.name;
    e.stack = [];

    this.addErrorStackTrace(e, err);

    return e;
  }

  // work on this
  static addErrorStackTrace(obj, err) {
    if (err && 'stack' in err) {
      if (!('extra' in obj)) {
        obj.extra = { stacks: [] };
      } else if (!('stacks' in obj.extra)) {
        obj.extra.stacks = [];
      }

      obj.extra.stacks.push(err.stack.split('\n'));
    }
  }
}

module.exports = Response;
