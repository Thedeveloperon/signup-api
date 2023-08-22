const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware
const PostController = require('../controllers/postController'); // Import the PostController

// Create a new post
router.post('/submit', authenticate, PostController.submit);

module.exports = router;
