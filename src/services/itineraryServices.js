const authServices = require('../services/authServices');

const db = require('../models');
const itinerary = db.itinerary;
const comment = db.comment;

async function commentItinerary(itineraryInformation) {
    const itineraryId = req.body.itineraryId;
    const commentText = req.body.comment;
    const rating = req.body.rating;
    const username = authServices.getUsername(req.headers.authorization);
    if (rating < 0 || rating > 5) {
        return "Error";
    }
    try {
        const newComment = await comment.create({
            itineraryId: itineraryId,
            comment: commentText,
            username: username,
            rating: rating,
        });
        return "Success";
    } catch (error) {
        console.error(error);
        return "Error";
    }
}

async function getRating(itineraryId) {
    try {
        const comments = await comment.findAll({
            where: {
                itineraryId: itineraryId
            }
        });
        let totalRating = 0;
        for (let i = 0, len = comments.length; i < len; i++) {
            totalRating += comments[i].rating;
        }
        return totalRating / comments.length;
    } catch (error) {
        console.error(error);
        return "Error";
    }
}

async function getRecommendation(preferences) {
    const popularity = preferences.popularity;
    const budget = preferences.budget;;
    try {
        const itineraries = await itinerary.findAll({
            where: {
                preferences: {
                    budget: budget,
                    popularity: popularity
                }
            }
        });
        let recommendedItineraries = [];
        for (let i = 0, len = itineraries.length; i < len; i++) {
            const currentRating = await getRating(itineraries[i].itineraryId);
            if (currentRating >= rating) {
                recommendedItineraries.push(itineraries[i]);
            }
        }
        return recommendedItineraries;
    } catch (error) {
        console.error(error);
        return "Error";
    }
}