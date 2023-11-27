const connection = require('./connection');

class Anon {
  static checkIfAnonIdExists(anonId, callback, next) {
    const db = connection.getDb();
    db.query(
      'SELECT value FROM anon_ids WHERE value=($1)',
      [anonId],
      (err, result) => {
        if (err) { next(err); } else {
          callback(result);
        }
      },
    );
  }

  static addAnonId(anonId, callback, next) {
    const db = connection.getDb();
    db.query(
      'INSERT INTO anon_ids (value) VALUES ($1)',
      [anonId],
      (err, result) => {
        if (err) { next(err); } else {
          callback(result);
        }
      },
    );
  }

  static addEnrollToken(token, callback, next) {
    const db = connection.getDb();
    db.query(
      'INSERT INTO enroll_tokens (value) VALUES ($1)',
      [token],
      (err, result) => {
        if (err) { next(err); } else {
          callback(result);
        }
      },
    );
  }

  static getEnrollTokens(callback, next) {
    const db = connection.getDb();
    db.query(
      'SELECT value FROM enroll_tokens',
      [],
      (err, result) => {
        if (err) { next(err); } else {
          callback(result);
        }
      },
    );
  }
}

module.exports = Anon;
