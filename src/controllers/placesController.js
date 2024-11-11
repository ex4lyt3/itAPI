const mapService = require('../services/mapService');

async function getPlaces(req, res, next) {
    try {
        const places = await mapService.getPlaces(req.body);
        res.status(200).send(places);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPlaces
};