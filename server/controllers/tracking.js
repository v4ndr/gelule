const validateSession = require('../utils/validateSession');
const Tracking = require('../models/Tracking');

exports.submitSession = (req, res) => {
  const session = req.body;
  if (validateSession(session)) {
    Tracking.submitSession(session, (response) => {
      res.status(200).json(response);
    });
  } else {
    res.status(422).json('Format de la session invalide');
  }
};
