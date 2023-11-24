const { CityService, TheatreService, MovieService } = require('../services');
const { Response } = require('../utilities');

class CityController {
  static async getAll(req, res) {
    try {
      const srvRes = await CityService.getAll();

      Response.success(res, srvRes);
    } catch (e) {
      Response.fail(res, e);
    }
  }

  /**
   * @info - getting all theatres list of a city
   */
  static async getCityTheatres(req, res) {
    try {
      const params = { ...req.data, ...req.params };

      const srvRes = await TheatreService.getCityTheatres(params);

      Response.success(res, srvRes);
    } catch (e) {
      Response.fail(res, e);
    }
  }

  /**
   * @info - getting all movies running in the city
   */
  static async getCityMovies(req, res) {
    try {
      const params = { ...req.data, ...req.params };

      const srvRes = await MovieService.getCityMovies(params);

      Response.success(res, srvRes);
    } catch (e) {
      Response.fail(res, e);
    }
  }
}

module.exports = CityController;
