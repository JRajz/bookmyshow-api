const { TheatreService } = require('../services');
const { Response } = require('../utilities');

class TheatreController {
  static async getTheatreShows(req, res) {
    try {
      const params = { ...req.data, ...req.params, ...req.query };

      const srvRes = await TheatreService.getTheatreShows(params);

      Response.success(res, srvRes);
    } catch (e) {
      Response.fail(res, e);
    }
  }
}

module.exports = TheatreController;
