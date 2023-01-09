const connection = require('./connection');

class Auth {
  static async queryPin(userPin, callback) {
    const db = connection.getDb();
    const validPins = await db.collection('pinCodes').find({ valid: true }).toArray();
    if (validPins.some((e) => e.code === userPin)) {
      await db.collection('pinCodes').updateOne({ code: userPin }, { $set: { valid: false } });
      console.log(`Valid pin : ${userPin} is set to valid:false`);
      callback(true);
    } else {
      callback(false);
    }
  }

  static async genPin(callback) {
    const db = connection.getDb();
    let pin = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const existingPins = await db.collection('pinCodes').find().toArray();
    // eslint-disable-next-line no-loop-func
    while (existingPins.some((e) => e.code === pin)) {
      // eslint-disable-next-line no-const-assign
      console.log('pin already exists, regenerating one');
      pin = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    }
    await db.collection('pinCodes').insertOne({ code: pin, valid: true });
    console.log(`pin ${pin} generated with valid true`);
    callback(pin);
  }

  static async addDeviceId(deviceId, callback) {
    const db = connection.getDb();
    const result = await db.collection('authorizedIds').insertOne({ deviceId });
    callback(result);
  }

  static async getAuthorizedDeviceIds(callback) {
    const db = connection.getDb();
    const results = await db.collection('authorizedIds').find().toArray();
    callback(results);
  }

  // DEV ONLY
  static async getValidPins(callback) {
    const db = connection.getDb();
    let results = await db.collection('pinCodes').find({ valid: true }).toArray();
    results = results.map((e) => e.code);
    callback(results);
  }
}

module.exports = Auth;
