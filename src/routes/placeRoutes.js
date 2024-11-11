const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

router.get('/list', placesController.getPlaces);

module.exports = router;