/**
 * @module controllers/authController
 */


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
}

module.exports = User;
