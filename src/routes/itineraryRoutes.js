const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.post('/comment', itineraryController.commentItinerary);
router.post('/recommend', itineraryController.recommendItinerary); // similar to quiz, but after taking preferences