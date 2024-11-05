const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/list', quizController.list); // Fix the route path
router.post('/submit', quizController.submit); // Fix the route path

module.exports = router;