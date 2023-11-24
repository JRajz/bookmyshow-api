const Sequelize = require('sequelize');
const { Models } = require('../loaders/sequelize');
const { Response, Logger, Message } = require('../utilities');
const CityService = require('./CityService');

class MovieService {
  static async getCityMovies({ cityId }) {
    try {
      Logger.info('MovieService: Getting City movies');

      await CityService.getOne(cityId);

      // Getting movies from current date
      const currentDate = new Date();

      const movies = await Models.movie.findAll({
        include: [
          {
            model: Models.show,
            attributes: [],
            required: true,
            include: {
              model: Models.theatre,
              attributes: [],
              where: { city_id: cityId },
            },
            where: {
              show_datetime: {
                [Sequelize.Op.gt]: currentDate, // Compare show_datetime with current date and time
              },
            },
          },
        ],
        group: [['movie_id']],
        attributes: ['movie_id', 'movie_name'],
      });

      return {
        data: movies,
        message: movies.length ? 'Movies found' : 'No Movies found',
      };
    } catch (e) {
      Logger.error('MovieService: Getting City movies', e);

      throw Response.createError(Message.tryAgain, e);
    }
  }
}
module.exports = MovieService;
