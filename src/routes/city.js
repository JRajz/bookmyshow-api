const router = require('express').Router();
const { CityController } = require('../controllers');
const validation = require('../utilities/Validation/cityValidation');

router.get('', validation.getAll, CityController.getAll);

router.get('/:cityId(\\d+)/theatres', validation.getCityTheatres, CityController.getCityTheatres);

router.get('/:cityId(\\d+)/movies', validation.getCityMovies, CityController.getCityMovies);

module.exports = router;
