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

  static getEnrollNumber(callback, next) {
    const db = connection.getDb();
    db.query('SELECT * FROM enroll_tokens', (err, res) => {
      if (err) { next(err); } else {
        callback(res.rows.length);
      }
    });
  }

  static getAnonNumber(callback, next) {
    const db = connection.getDb();
    db.query('SELECT * FROM anon_ids', (err, res) => {
      if (err) { next(err); } else {
        callback(res.rows.length);
      }
    });
  }
}

module.exports = Dashboard;
