const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // Create this middleware

router.post('/signup', AuthController.signup);
router.get('/profile', authenticate, AuthController.getUserProfile);
router.post('/login', AuthController.login); // Add this line

module.exports = router;
