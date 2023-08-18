const db = require('../config/db');

class Post {
  static create(post) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO posts SET ?', post, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Post;
