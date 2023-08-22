const db = require('../config/db');

class PostController {
  static submit(req, res) {
    try {
      const { content } = req.body;
      const userId = req.user.id; // Get the user ID from the authenticated user
      
      // Insert the post into the database
      const newPost = {
        user_id: userId,
        content,
      };

      db.query('INSERT INTO posts SET ?', newPost, (err, result) => {
        if (err) {
          console.error('Post submission error:', err);
          res.status(500).json({ message: 'Error submitting post' });
        } else {
          res.status(201).json({ message: 'Post submitted successfully' });
        }
      });
    } catch (error) {
      console.error('Post submission error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = PostController;
