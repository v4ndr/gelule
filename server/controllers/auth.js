require('dotenv').config();
const Auth = require('../models/Auth');

exports.queryPin = (req, res, next) => {
  const userPin = req.body.pinCode;
  const { deviceId } = req.body;
  if (deviceId) {
    if (/^[0-9]{4}$/.test(userPin)) {
      Auth.queryPin(userPin, (valid) => {
        if (valid) {
          Auth.addDeviceId(deviceId, userPin, () => {
            console.log(`${userPin}, pin is valid. Device ${deviceId} has been authorized`);
            res.status(200).json({ auth: true });
          }, next);
        } else {
          console.log(`queried pin : ${userPin}, pin is invalid`);
          res.status(200).json({ auth: false });
        }
      }, next);
    }
  } else {
    console.log('no device Id provided');
    res.status(200).json({ auth: false });
  }
};

exports.genPin = (req, res, next) => {
  const { token } = req.query;
  if (token === process.env.PIN_GEN_TOKEN) {
    Auth.genPin((response) => {
      console.log('Pin generated : ', response);
      res.status(200).json(response);
    }, next);
  } else {
    console.error('Pin generation is only available for authentified admin');
    res.status(403).json('Pin generation is only available for authentified admin');
  }
};
