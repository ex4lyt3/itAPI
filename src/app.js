const express = require('express');
const cors = require('cors');
const multer = require('multer');

const users = require('./routes/userRoutes');
const quiz = require('./routes/quizRoutes');
const itinerary = require('./routes/itineraryRoutes');
const places = require('./routes/placeRoutes');

const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

const upload = multer(); // Initialize multer for parsing multipart/form-data

app.use(upload.none()); // Use multer to parse form-data

app.use("/user", users);
app.use("/quiz", authMiddleware.authenticateToken, quiz);
app.use("/itinerary",authMiddleware.authenticateToken,itinerary);
app.use("/places", places);

app.use(errorHandler.errorHandler);
//
const db = require('./models');
db.sequelize.sync({}).then(() => { // Remove drop and re-sync option
    console.log("Database synchronized.")
    app.listen(3000, () => {
        console.log(`Server listening on port ${3000}`)
    });
});
//
module.exports = app;