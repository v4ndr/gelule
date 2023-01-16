const validateSession = require('../utils/validateSession');
const Tracking = require('../models/Tracking');
const Auth = require('../models/Auth');

exports.submitSession = (req, res) => {
  const session = req.body;
  Auth.getAuthorizedIds((authorizedIds) => {
    if (authorizedIds.includes(session.deviceId)) {
      if (validateSession(session)) {
        Tracking.submitSession(session, (response) => {
          res.status(200).json(response);
        });
      } else {
        res.status(422).json('Format de la session invalide');
      }
    } else {
      res.status(401).json('Unauthorized');
    }
  });
};
