const validateSession = require('../utils/validateSession');
const Tracking = require('../models/Tracking');

exports.submitSession = (req, res, next) => {
  const session = req.body;
  if (validateSession(session)) {
    Tracking.submitSession(session, (response) => {
      console.log('Session submitted from anonId : ', session.anonId);
      res.status(200).json(response);
    }, next);
  } else {
    console.error('Invalid session format');
    res.status(422).json('Format de la session invalide');
  }
};
