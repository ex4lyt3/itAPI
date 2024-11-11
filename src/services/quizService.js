const mapService = require('./mapService');

const db = require('../models');
const quiz = db.quiz;
const question = db.question;

async function submitQuiz(reqBody) {
    const place = reqBody.place;
    const highlights = reqBody.highlights;
    const additionalOptions = reqBody.additionalOptions;
    const cuisine = reqBody.cuisine + "_";
    const popularity = reqBody.popularity;
    const budget = reqBody.budget;
    const username = reqBody.username;
    if (place == null || highlights == null || cuisine == null || popularity == null || budget == null) {
        throw new Error("Invalid request");
    }
    // get more highlights based on area, popularity
    let restaurants = await mapService.getHighlights(place, 5, `${cuisine}restaurant`, { popularity: popularity, budget: budget });
    const promptData = {
        place: place,
        highlights: highlights,
        restaurants: restaurants,
        budget: budget,
        popularity: popularity,
        cuisine: cuisine,
        username: reqBody.username
    }
    return promptData;
}

module.exports = {
    submitQuiz
}