const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');

class PostController{
    static async createPost(req, res) {
        try {
          const userId = req.user.id;
          const { title, content } = req.body;
    
          await User.createPost(userId, title, content);
    
          res.status(201).json({ message: 'Post created successfully' });
        } catch (error) {
          console.error('Create post error:', error);
          res.status(500).json({ message: 'An error occurred while creating the post' });
        }
      }
    
      static async searchPosts(req, res) {
        try {
          const { query } = req.query;
    
          if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
          }
    
          const searchResults = await User.searchPosts(query);
    
          res.status(200).json(searchResults);
        } catch (error) {
          console.error('Search posts error:', error);
          res.status(500).json({ message: 'An error occurred while searching posts' });
        }
      }
}

module.exports = PostController;