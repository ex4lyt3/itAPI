const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

router.get('/list', placesController.getPlaces);
router.post('/highlights', placesController.getHighlights);
router.get('/highlightsPhoto', placesController.getHighlightsPhoto);

module.exports = router;