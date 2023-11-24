const { celebrate, Joi } = require('celebrate');
const Validate = require('../../middlewares/Validate');

module.exports = {
  getTheatreShows: celebrate({
    params: Joi.object().keys({
      theatreId: Validate.idReq,
    }),
    query: Joi.object().keys({
      date: Validate.dateReq,
    }),
  }),
};
