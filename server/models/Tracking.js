const connection = require('./connection');

class Tracking {
  static async submitSession(data, callback) {
    const db = connection.getDb();
    const result = await db.collection('searchSessions').insertOne(data);
    callback(`Success, session was submited with id : ${result.insertedId}`);
  }
}

module.exports = Tracking;
