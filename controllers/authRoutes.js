const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login); // Add this line

module.exports = router;
