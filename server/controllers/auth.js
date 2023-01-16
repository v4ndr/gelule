require('dotenv').config();
const Auth = require('../models/Auth');

exports.queryPin = (req, res) => {
  const userPin = req.body.pinCode;
  const { deviceId } = req.body;
  if (deviceId) {
    Auth.queryPin(userPin, (valid) => {
      if (valid) {
        Auth.addDeviceId(deviceId, userPin, (response) => {
          console.log(`Device with ID ${deviceId} has been authorized, added to db with insertedId ${response.insertedId}`);
          res.status(200).json({ auth: true });
        });
      } else {
        console.log(`queried pin : ${userPin}, pin is invalid`);
        res.status(200).json({ auth: false });
      }
    });
  } else {
    console.log('no device Id provided');
    res.status(200).json({ auth: false });
  }
};

exports.genPin = (req, res) => {
  const { token } = req.query;
  if (token === process.env.PIN_GEN_TOKEN) {
    Auth.genPin((response) => {
      res.status(200).json(response);
    });
  } else {
    res.status(403).json('Pin generation is only available for authentified admin');
  }
};
