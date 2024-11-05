const mapService = require('./mapService');

const db = require('../models');
const quiz = db.quiz;
const question = db.question;

async function submitQuiz(reqBody) {
    const place = reqBody.place;
    const highlights = reqBody.highlights;
    const additionalOptions = reqBody.additionalOptions;
    // get more highlights based on area, popularity
    // get restaurants, determined by cuisine, popularity and budget
    let restaurants = await mapService.getHighlights(place,5,"restaurant", {popularity: "popular", budget: "low"}); //additionalOptions is a placeholder
    // get place details from mapSeervice
    const promptData = {
        place: place,
        highlights: highlights,
        restaurants: restaurants,
        additionalOptions: additionalOptions
    }
    return promptData;
}

module.exports = {
    submitQuiz
}