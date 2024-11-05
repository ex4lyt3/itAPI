const express = require('express');
const cors = require('cors');
const multer = require('multer');

const users = require('./routes/userRoutes');
const quiz = require('./routes/quizRoutes');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

const upload = multer(); // Initialize multer for parsing multipart/form-data

app.use(upload.none()); // Use multer to parse form-data

app.use("/user", users);
app.use("/quiz", authMiddleware.authenticateToken, quiz);

const db = require('./models');
db.sequelize.sync({}).then(() => {
    console.log("Drop and re-sync db.")
    app.listen(3000, () => {
        console.log(`Server listening on port ${3000}`)
    });
});

module.exports = app;