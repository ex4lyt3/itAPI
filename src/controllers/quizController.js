const { itinerary } = require('../models');
const promptService = require('../services/promptService');
const { submitQuiz } = require('../services/quizService');

function list(req, res, next) {
    // Implementation for listing quizzes
}

async function submit(req, res, next) {
    try {
        const promptData = await submitQuiz(req.body);
        const itineraryObject = await promptService.createItinerary(promptData);
        res.json(itineraryObject);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    list,
    submit
}