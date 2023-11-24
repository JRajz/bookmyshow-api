const { celebrate, Joi } = require('celebrate');
const Validate = require('../../middlewares/Validate');

module.exports = {
  getAll: celebrate({
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
  }),
  getCityTheatres: celebrate({
    params: Joi.object().keys({
      cityId: Validate.idReq,
    }),
    query: Joi.object().keys({}),
  }),
  getCityMovies: celebrate({
    params: Joi.object().keys({
      cityId: Validate.idReq,
    }),
    query: Joi.object().keys({}),
  }),
};
