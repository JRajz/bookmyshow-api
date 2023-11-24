// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');
const Sequelize = require('sequelize');

const { Models } = require('../loaders/sequelize');
const { Response, Logger, Message } = require('../utilities');
const CityService = require('./CityService');

class TheatreService {
  static async getCityTheatres({ cityId }) {
    try {
      Logger.info('TheatreService: Getting City theatre');

      await CityService.getOne(cityId);

      const theatres = await Models.theatre.findAll({
        where: { city_id: cityId },
      });

      return { theatres, message: theatres.length ? 'Theatres Found' : 'Theatres not found' };
    } catch (e) {
      Logger.error('TheatreService: Getting City theatre', e);

      throw Response.createError(Message.tryAgain, e);
    }
  }

  static async getTheatreShows({ theatreId, date }) {
    try {
      Logger.info('TheatreService: Getting theatre shows');

      const payloadMoment = moment(date, 'YYYY-MM-DD');
      let showDatetime;
      if (payloadMoment.isSame(moment(), 'day')) {
        const bookingShowTime = moment().add(30, 'minutes');
        showDatetime = bookingShowTime.format('YYYY-MM-DD HH:mm:ss');
      } else {
        const startOfDayDate = payloadMoment.startOf('day');
        showDatetime = startOfDayDate.format('YYYY-MM-DD HH:mm:ss');
      }
      // eslint-disable-next-line no-param-reassign
      date = moment(date).format('YYYY-MM-DD');

      const shows = await Models.movie.findAll({
        include: [
          {
            model: Models.show,
            attributes: ['show_datetime', [Sequelize.literal('DATE_FORMAT(TIME(show_datetime), "%H:%i")'), 'showTime']],
            required: true,
            where: {
              [Sequelize.Op.and]: [
                Sequelize.where(Sequelize.fn('DATE', Sequelize.col('show_datetime')), '=', date),
                Sequelize.where(Sequelize.col('show_datetime'), '>', showDatetime),
              ],
            },
            include: {
              model: Models.screen,
              attributes: ['screen_id', 'screen_name'],
              where: { theatre_id: theatreId },
            },
          },
        ],
        order: [
          ['movie_id', 'ASC'],
          [Models.show, 'show_datetime', 'ASC'],
        ],
        attributes: ['movie_id', 'movie_name'],
      });

      return { shows };
    } catch (e) {
      Logger.error('TheatreService: Getting theatre shows', e);

      throw Response.createError(Message.tryAgain, e);
    }
  }
}
module.exports = TheatreService;
