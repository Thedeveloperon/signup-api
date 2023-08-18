const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/postsController');
const authenticate = require('../middleware/authenticate');

router.post('/submit', authenticate, PostsController.submitPost);

module.exports = router;
