const connection = require('./connection');

class Tracking {
  static submitSession(data, callback, next) {
    const db = connection.getDb();
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const [date] = data.timestamp.split(' ');
    const dateParts = date.split('/');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    dateObject.setMilliseconds(dateObject.getMilliseconds() - tzoffset);
    db.query(
      'INSERT INTO sessions (date, duration, anon_id, engines, queries, domains, raw, satisfaction) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        dateObject.toISOString().slice(0, 19).replace('T', ' '),
        data.duration,
        data.anonId,
        data.query.map((e) => e.domain),
        data.query.map((e) => e.keywords),
        data.visitedDomains,
        data.rawHistory,
        data.satisfaction,
      ],
      (err, result) => {
        if (err) { next(err); } else {
          callback(result);
        }
      },
    );
  }
}

module.exports = Tracking;
