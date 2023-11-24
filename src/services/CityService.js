const { Models } = require('../loaders/sequelize');
const { Logger, Response, Message } = require('../utilities');

class CityService {
  static async getOne(cityId) {
    try {
      Logger.info('CityService: Validating City');

      const city = await Models.city.findOne({
        where: {
          city_id: cityId,
        },
      });

      if (city) {
        return true;
      }

      throw Response.createError(Message.invalidCity);
    } catch (e) {
      Logger.error('CityService: Validating City', e);

      throw Response.createError(Message.tryAgain, e);
    }
  }

  static async getAll() {
    try {
      Logger.info('CityService: Getting all cities');

      const cities = await Models.city.findAll({
        order: ['city_name'],
      });

      return { cities };
    } catch (e) {
      Logger.error('CityService: Getting all cities', e);

      throw Response.createError(Message.tryAgain, e);
    }
  }
}
module.exports = CityService;
