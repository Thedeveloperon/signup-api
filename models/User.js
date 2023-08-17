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
  static getByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // No user found
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }
}

module.exports = User;
