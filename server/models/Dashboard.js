/* eslint-disable no-loop-func */
const connection = require('./connection');

class Dashboard {
  static getSessionsData(callback, next) {
    const db = connection.getDb();
    db.query('SELECT * FROM sessions', (err, res) => {
      if (err) { next(err); } else {
        const sessionsData = res.rows.filter((e) => e.raw.length > 0);
        const voidSessionsNumber = res.rows.length - sessionsData.length;
        callback(sessionsData, voidSessionsNumber);
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

  static submitTally(callback, next) {
    const db = connection.getDb();
    db.query('UPDATE tally SET total = total + 1 WHERE id=1', (err) => {
      if (err) { next(err); } else {
        callback();
      }
    });
  }

  static getTallyTotal(callback, next) {
    const db = connection.getDb();
    db.query('SELECT * FROM tally', (err, res) => {
      if (err) { next(err); } else {
        callback(res.rows[0].total);
      }
    });
  }
}

module.exports = Dashboard;
