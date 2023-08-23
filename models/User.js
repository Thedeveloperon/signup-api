/**
 * @module controllers/authController
 */

//Create user api
const db = require('../config/db');

class User {
  static create(user) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  //login api
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // User not found
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }

  //Delete user api
  static deleteUserById(userId) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', userId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  //Get user profile api
  static getUserProfile(userId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, username, email, about FROM users WHERE id = ?', userId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve(null); // User not found
          } else {
            resolve(result[0]);
          }
        }
      });
    });
  }

  //User update profile api
  static updateUserProfile(userId, updatedData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET ? WHERE id = ?', [updatedData, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static createPost(userId, title, content) {
    return new Promise((resolve, reject) => {
      const post = {
        user_id: userId,
        title,
        content,
        created_at: new Date()
      };

      db.query('INSERT INTO posts SET ?', post, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static searchPosts(query) {
    return new Promise((resolve, reject) => {
      const searchQuery = `%${query}%`; // For a case-insensitive partial match

      db.query('SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?', [searchQuery, searchQuery], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }




}

module.exports = User;
