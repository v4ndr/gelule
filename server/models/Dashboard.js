/* eslint-disable no-loop-func */
const connection = require('./connection');

class Dashboard {
  static getSessionsData(callback, next) {
    const db = connection.getDb();
    db.query('SELECT * FROM sessions', (err, res) => {
      if (err) { next(err); } else {
        const sessionsData = res.rows.filter((e) => e.raw.length > 0);
        callback(sessionsData);
      }
    });
  }

  static getValidPins(callback, next) {
    const db = connection.getDb();
    db.query('SELECT pin FROM auth WHERE device IS NULL', (err, res) => {
      if (err) { next(err); } else {
        const validPins = res.rows.map((e) => e.pin);
        callback(validPins);
      }
    });
  }
}

module.exports = Dashboard;
