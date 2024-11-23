const authServices = require('../services/authServices');

const db = require('../models');
const itinerary = db.itinerary;
const comment = db.comment;
const { Op } = require("sequelize");

async function viewItinerary(req) {
    const token = req.headers['authorization'];
    // const username = await authServices.getUsername(token);
    const username = req.body.username;
    const userid = await authServices.getUserId(username);
    console.log(userid);

    const itineraries = await itinerary.findAll({
        where: {
            userid: userid
        }
    });
    
    return itineraries; 
}

async function getItinerary(itineraryId) {
    const specificItinerary = await itinerary.findOne({
        where: {
            itineraryid: itineraryId
        }
    });
    if (specificItinerary == null) {
        throw new Error("Itinerary not found");
    }

    specificItinerary.rating = await getRating(specificItinerary.itineraryid);
    if (specificItinerary.rating == NaN) {
        specificItinerary.dataValues.rating = "Unrated";
    }
    // Append rating to specificItinerary
    specificItinerary.dataValues.rating = specificItinerary.rating;
    return specificItinerary;
}

async function commentItinerary(req) {
    const itineraryId = req.body.itineraryid;
    const commentText = req.body.comment;
    const rating = req.body.rating;
    const userid = await authServices.getUserId(req.body.username);
    if (rating < 0 || rating > 5) {
        return "Error";
    }

    const newComment = await comment.create({
        commentid: Math.floor(Math.random() * 1000000),
        itineraryid: itineraryId,
        comment: commentText,
        rating: rating,
        userid: userid
    });
    return "Success";
}

async function getComments(itineraryId) {
    const comments = await comment.findAll({
        where: {
            itineraryid: itineraryId
        }
    });
    for (let i = 0, len = comments.length; i < len; i++) {
        const username = await authServices.getUsername(comments[i].userid);
        comments[i].dataValues.username = username;
    }
    return comments;
}

async function getRating(itineraryId) {
    const comments = await comment.findAll({
        where: {
            itineraryid: itineraryId
        }
    });
    let totalRating = 0;
    for (let i = 0, len = comments.length; i < len; i++) {
        console.log(typeof comments[i].rating);
        totalRating += comments[i].rating;
    }
    console.log(totalRating / comments.length);
    return totalRating / comments.length;
}

async function getRecommendation(preferences) {
    const popularity = preferences.popularity;
    const budget = preferences.budget;
    const preferredRating = 4;
    // filter rating > 4 first

    const itineraries = await itinerary.findAll({
        where: {
            popularity: popularity,
            budget: budget
        }
    });
    let recommendedItineraries = [];
    for (let i = 0, len = itineraries.length; i < len; i++) {
        console.log(itineraries[i].itineraryid);
        const currentRating = await getRating(itineraries[i].itineraryid);
        console.log(currentRating);
        if (currentRating >= preferredRating) {
            recommendedItineraries.push(itineraries[i]);
        }
        console.log(recommendedItineraries);
    }
    return recommendedItineraries;
}

module.exports = {
    viewItinerary,
    commentItinerary,
    getRecommendation,
    getComments,
    getItinerary
}