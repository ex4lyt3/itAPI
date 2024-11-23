const mapService = require('../services/mapService');
const axios = require('axios');

async function getPlaces(req, res, next) {
    try {
        const places = await mapService.getPlaces(req.body);
        res.status(200).send(places);
    } catch (error) {
        next(error);
    }
}

async function getHighlights(req, res, next) {
    try {
        const highlights = await mapService.getHighlights(req.body.place, 10, "highlights", {popularity: "popular"});
        res.status(200).send(highlights);
    } catch (error) {
        next(error);
    }
}

async function getHighlightsPhoto(req, res, next) {
    try {
        console.log(req.params.placeid)
        const photoUrl = await mapService.getHighlightsPhoto(req.query.placeid);
        console.log(photoUrl);
        const resolvedUrl = await axios.get(photoUrl, { maxRedirects: 0 }).catch(err => err.response.headers.location);
        console.log(resolvedUrl);
        const response = await axios.get(resolvedUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'image/jpeg');
        res.status(200).send(response.data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPlaces,
    getHighlights,
    getHighlightsPhoto
};