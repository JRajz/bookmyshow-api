const router = require('express').Router();
const { TheatreController } = require('../controllers');
const validation = require('../utilities/Validation/theatreValidation');

router.get('/:theatreId/shows', validation.getTheatreShows, TheatreController.getTheatreShows);

module.exports = router;
