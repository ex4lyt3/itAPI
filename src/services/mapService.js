const axios = require('axios'); 
const models = require('../models');
const { act } = require('react');
const apiKey = require('../config/apiConfig').mapToken;

const place = models.place;

const tempPlaceData = {
    "districts": [
        { "name": "Jongno-gu", "closest_station": { "name": "Jonggak Station", "latitude": 37.570161, "longitude": 126.982923 } },
        { "name": "Jung-gu", "closest_station": { "name": "City Hall Station", "latitude": 37.564718, "longitude": 126.977108 } },
        { "name": "Yongsan-gu", "closest_station": { "name": "Yongsan Station", "latitude": 37.529849, "longitude": 126.964561 } },
        { "name": "Seongdong-gu", "closest_station": { "name": "Wangsimni Station", "latitude": 37.561086, "longitude": 127.037628 } },
        { "name": "Gwangjin-gu", "closest_station": { "name": "Konkuk University Station", "latitude": 37.540405, "longitude": 127.069530 } },
        { "name": "Dongdaemun-gu", "closest_station": { "name": "Cheongnyangni Station", "latitude": 37.580178, "longitude": 127.046835 } },
        { "name": "Jungnang-gu", "closest_station": { "name": "Mangu Station", "latitude": 37.594120, "longitude": 127.092057 } },
        { "name": "Seongbuk-gu", "closest_station": { "name": "Gileum Station", "latitude": 37.602839, "longitude": 127.028591 } },
        { "name": "Gangbuk-gu", "closest_station": { "name": "Suyu Station", "latitude": 37.637607, "longitude": 127.025058 } },
        { "name": "Dobong-gu", "closest_station": { "name": "Chang-dong Station", "latitude": 37.653166, "longitude": 127.047731 } },
        { "name": "Nowon-gu", "closest_station": { "name": "Nowon Station", "latitude": 37.655146, "longitude": 127.061031 } },
        { "name": "Eunpyeong-gu", "closest_station": { "name": "Yeonsinnae Station", "latitude": 37.619001, "longitude": 126.921008 } },
        { "name": "Seodaemun-gu", "closest_station": { "name": "Sinchon Station", "latitude": 37.559973, "longitude": 126.942573 } },
        { "name": "Mapo-gu", "closest_station": { "name": "Hongik University Station", "latitude": 37.557192, "longitude": 126.924881 } },
        { "name": "Yangcheon-gu", "closest_station": { "name": "Mokdong Station", "latitude": 37.527366, "longitude": 126.875181 } },
        { "name": "Gangseo-gu", "closest_station": { "name": "Gimpo International Airport Station", "latitude": 37.562434, "longitude": 126.801058 } },
        { "name": "Guro-gu", "closest_station": { "name": "Guro Station", "latitude": 37.503039, "longitude": 126.881212 } },
        { "name": "Geumcheon-gu", "closest_station": { "name": "Gasan Digital Complex Station", "latitude": 37.481074, "longitude": 126.882768 } },
        { "name": "Yeongdeungpo-gu", "closest_station": { "name": "Yeongdeungpo Station", "latitude": 37.515504, "longitude": 126.907623 } },
        { "name": "Dongjak-gu", "closest_station": { "name": "Noryangjin Station", "latitude": 37.513950, "longitude": 126.943830 } },
        { "name": "Gwanak-gu", "closest_station": { "name": "Seoul National University Station", "latitude": 37.481247, "longitude": 126.952739 } },
        { "name": "Seocho-gu", "closest_station": { "name": "Gangnam Station", "latitude": 37.497175, "longitude": 127.027926 } },
        { "name": "Gangnam-gu", "closest_station": { "name": "Gangnam Station", "latitude": 37.497175, "longitude": 127.027926 } },
        { "name": "Songpa-gu", "closest_station": { "name": "Jamsil Station", "latitude": 37.513950, "longitude": 127.100205 } },
        { "name": "Gangdong-gu", "closest_station": { "name": "Gangdong Station", "latitude": 37.535804, "longitude": 127.123027 } }
    ]
}


function getPlaces() {
    return place.findAll();
}

async function getHighlights(place, number, type, additionalOptions) {
    // get place closest station
    const placeQueried = tempPlaceData.districts.find((district) => district.name === place);
    const closestStation = placeQueried.closest_station;
    if (closestStation == null) {
        return "No closest station provided";
    };
    const lat = closestStation.latitude;
    const long = closestStation.longitude;
    // uses nearbysearch on station to retrieve highlights

    const placesUrl = `https://places.googleapis.com/v1/places:searchNearby`;
    
    const data = {
        includedTypes: ["restaurant"],
        locationRestriction: {
          circle: {
            center: {
              latitude: lat,
              longitude: long,
            },
            radius: 500.0
          }
        }
      };

    try {
        const response = await axios.post(
            placesUrl,
            data,
            { headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey, // Replace with your actual API key
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.userRatingCount,places.priceLevel,places.regularOpeningHours,places.reviews,places.types,places.primaryType'
              }
            }
        );

        let actualResponse = [];
        // determine popularity
        // check if is restaurant or POI
        if (additionalOptions.popularity === "popular") {
            for (let i = 0; i < response.data.places.length; i++) {
                console.log(response.data.places[i].userRatingCount, response.data.places[i].rating);
                if (response.data.places[i].userRatingCount > 30 && response.data.places[i].rating > 4) {
                    actualResponse.push(response.data.places[i]);
                }
            }
        } else if (additionalOptions.popularity === "underrated") {
            for (let i = 0; i < response.data.places.length; i++) {
                if (response.data.places[i].userRatingCount < 30 && response.data.places[i].rating > 4) {
                    actualResponse.push(response.data.places[i]);
                }
            }
        }
        // check for restaurants and its price
        if (type.includes('restaurant')) {
            const cuisineType = type.split('_')[0];
            console.log(cuisineType);
            if (cuisineType != "restaurant") {
                actualResponse = actualResponse.filter(place => place.types.includes(`${cuisineType}_restaurant`));
            } else {
                actualResponse = actualResponse.filter(place => place.types.includes('restaurant'));
            }
                if (additionalOptions.budget === "high") {   
                    for (let i = 0; i < actualResponse.length; i++)  {
                        if (actualResponse[i].priceLevel == "PRICE_LEVEL_EXPENSIVE" || actualResponse[i].priceLevel == "PRICE_LEVEL_MODERATE" || actualResponse[i].priceLevel == "PRICE_LEVEL_VERY_EXPENSIVE") {
                            actualResponse.splice(i, 1);
                        }
                    }
                } else if (additionalOptions.budget === "low") {
                    for (let i = 0; i < actualResponse.length; i++)  {
                        if (actualResponse[i].priceLevel == "PRICE_LEVEL_INEXPENSIVE" || actualResponse[i].priceLevel == "PRICE_LEVEL_FREE") {
                            actualResponse.splice(i, 1);
                        }
                    }
                }
        }
        // check for POIs/Highlights
        // can further split into tourist attractions and historical landmarks
        if (type.includes('highlights')) {
            actualResponse = actualResponse.filter(place => place.types.includes('tourist_attraction') || place.types.includes('historical_landmark'));
        }
        return actualResponse.slice(0, number);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getPlaces,
    getHighlights
}

//ignorethis

