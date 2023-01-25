const validateSession = require('../utils/validateSession');
const Tracking = require('../models/Tracking');
const Auth = require('../models/Auth');

exports.submitSession = (req, res, next) => {
  const session = req.body;
  Auth.getAuthorizedIds((authorizedIds) => {
    if (authorizedIds.includes(session.deviceId)) {
      if (validateSession(session)) {
        Tracking.submitSession(session, (response) => {
          console.log('Session submitted from device : ', session.deviceId);
          res.status(200).json(response);
        }, next);
      } else {
        console.error('Invalid session format');
        res.status(422).json('Format de la session invalide');
      }
    } else {
      console.error('Unauthorized access attempt from device : ', session.deviceId);
      res.status(401).json('Unauthorized');
    }
  }, next);
};
