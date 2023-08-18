const Post = require('../models/Post');

class PostsController {
  static async submitPost(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.user.id; // Extracted from JWT token

      const newPost = { title, content, user_id: userId };
      await Post.create(newPost);

      res.status(201).json({ message: 'Post submitted successfully' });
    } catch (error) {
      console.error('Submit post error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = PostsController;
