const authService = require('../services/authServices');
const itineraryService = require('../services/itineraryServices');

function create() {
    return;
}

async function commentItinerary(req, res, next) {
    try {
        const status = await itineraryService.commentItinerary(req);
        res.status(200).send("Comment added");
    } catch (error) {
        next(error);
    }
}

async function recommendItinerary(req, res, next) {
    try {
        const itineraries = await itineraryService.getRecommendation(req.body);
        res.status(200).send(itineraries);
    } catch (error) {
        next(error);
    }
}

async function viewItinerary(req, res, next) {  
    try {
        const itineraries = await itineraryService.viewItinerary(req);
        res.status(200).send(itineraries);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    commentItinerary,
    recommendItinerary,
    viewItinerary
};