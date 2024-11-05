const authService = require('../services/authService');
const itineraryService = require('../services/itineraryService');

function create() {
    return;
}

async function commentItinerary(req, res, next) {
    const verification = authService.verifyUsername(req.body.username, req.body.token);
    if (verification == true) {
        const status = itineraryService.commentItinerary(itineraryInformation);
        res.status(200).send("Comment added");
    }
}

async function recommendItinerary(req, res, next) {
    const preferences = req.body.preferences;
    const itineraries = itineraryService.getRecommendation(preferences);
    res.status(200).send(itineraries);
}

module.exports = {
    create
}