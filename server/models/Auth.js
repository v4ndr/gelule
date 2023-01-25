/* eslint-disable no-loop-func */
const connection = require('./connection');

class Auth {
  static queryPin(userPin, callback, next) {
    const db = connection.getDb();
    db.query('SELECT pin FROM auth WHERE device IS NULL', (err, res) => {
      if (err) { next(err); } else {
        const validPins = res.rows.map((e) => e.pin);
        if (validPins.some((e) => e === userPin)) {
          callback(true);
        } else {
          callback(false);
        }
      }
    });
  }

  static genPin(callback, next) {
    const db = connection.getDb();
    const genRandomPin = () => (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    let pin = genRandomPin();
    db.query('SELECT pin FROM auth', (err, res) => {
      if (err) { next(err); } else {
        const existingPins = res.rows.map((e) => e.pin);
        while (existingPins.some((e) => e === pin)) {
          pin = genRandomPin();
        }
        db.query('INSERT INTO auth (pin) VALUES ($1)', [pin], (error) => {
          if (error) { next(error); } else {
            callback(pin);
          }
        });
      }
    });
  }

  static addDeviceId(deviceId, userPin, callback, next) {
    const db = connection.getDb();
    db.query('UPDATE auth SET device = $1 WHERE pin = $2', [deviceId, userPin], (err) => {
      if (err) { next(err); } else {
        callback();
      }
    });
  }

  static getAuthorizedIds(callback, next) {
    const db = connection.getDb();
    db.query('SELECT device FROM auth', (err, res) => {
      if (err) { next(err); } else {
        const authorizedIds = res.rows.map((e) => e.device);
        callback(authorizedIds);
      }
    });
  }
}

module.exports = Auth;
