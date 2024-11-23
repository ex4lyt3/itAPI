const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/create', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/logout', userController.logout);
router.get('/refresh-token', userController.refreshToken);
router.post('/get-username', userController.getUsername);

module.exports = router;