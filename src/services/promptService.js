const OpenAI = require('openai');
const apiConfig = require('../config/apiConfig');
const db = require('../models');

const authService = require('./authServices');

const itinerary = db.itinerary;

const openai = new OpenAI({apiKey: apiConfig.gptToken});

async function createItinerary(data) {
    place = data.place;
    highlights = data.highlights;
    restaurants = data.restaurants;
    additionalOptions = data.additionalOptions;

    console.log(typeof restaurants);
    for (let i = 0, len = restaurants.length; i < len; i++) {
        if (restaurants[i].reviews) {
            delete restaurants[i].reviews;
        }
    }
    const restaurantsStr = JSON.stringify(restaurants);
    const prompt = `Could you generate me an itinerary that is based on the relevant information? There must be lunch and dinner with sightseeing or relevant tourist activities to fill in between the schedule. ONLY use the details provided and nothing else. The answer must be formatted in JSON format, whereby it consists of TimeSlot object {time: "", duration: "", type: "", place: "", details: ""}. Each timeslot object will consist of the time, duration, type of activity (eating/sightseeing/etc), places specifically and the details of the place of interest relevant to that timeslot. Reply only with the JSON object.

                    Here is the relevant information (ONLY USE THIS):
                    District: ${place}
                    Required Places of Interest: ${highlights}
                    Restaurants: ${restaurantsStr}
                    Remove the syntax markdown formatting.`
    console.log(prompt)

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    
    console.log(completion.choices[0].message.content.trim());
    itineraryObject = JSON.parse(completion.choices[0].message.content.trim());
    const itineraryCount = await itinerary.count();
    const itineraryId = itineraryCount + 1;
    console.log("THE ITINERARY ID IS: " + itineraryId);
    newItinerary = await itinerary.create({
        itineraryid: itineraryId, // this is a placeholder
        rating: NaN,
        placesDescription: JSON.stringify(itineraryObject),
        // how do i get the userid lmao
        userid: authService.getUserId(data.username),
        preferences: JSON.stringify(additionalOptions)
    });
    return completion.choices[0].message.content.trim();
}

module.exports = {
    createItinerary
}