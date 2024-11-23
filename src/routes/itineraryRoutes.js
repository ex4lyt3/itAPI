const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// Ensure that the methods are defined in the controller
if (!itineraryController.commentItinerary || !itineraryController.recommendItinerary || !itineraryController.viewItinerary) {
    throw new Error('One or more controller methods are undefined');
}

router.post('/comment', itineraryController.commentItinerary);
router.post('/recommend', itineraryController.recommendItinerary); // similar to quiz, but after taking preferences
router.post('/view', itineraryController.viewItinerary); // view itinerary
router.post('/viewSpecific', itineraryController.viewSpecificItinerary); // view specific itinerary
router.post('/viewComments', itineraryController.viewComments); // view comments of an itinerary

module.exports = router;