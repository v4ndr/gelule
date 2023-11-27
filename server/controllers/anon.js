/* eslint-disable no-restricted-syntax */
require('dotenv').config();
const Anon = require('../models/Anon');

exports.genAnonId = (req, res, next) => {
  const anonId = Math.floor(100000 + Math.random() * 900000);
  // const anonId = 164148;
  Anon.checkIfAnonIdExists(anonId, (result) => {
    if (result.rows.length > 0) {
      this.genAnonId(req, res, next);
    } else {
      Anon.addAnonId(anonId, (result2) => {
        if (result2.rowCount === 1) {
          res.status(200).json({ anonId });
        }
      }, next);
    }
  }, next);
};

exports.addEnrollToken = (req, res, next) => {
  console.log('add token');
  const { token } = req.body;
  console.log(req.body);
  Anon.addEnrollToken(token, (result) => {
    if (result.rowCount === 1) {
      res.status(200).json({ message: 'success' });
    }
  }, next);
};

exports.getEnrollTokens = (req, res, next) => {
  Anon.getEnrollTokens((result) => {
    const tokens = [];
    for (const row of result.rows) {
      tokens.push(row.value);
    }
    res.status(200).json({ tokens });
  }, next);
};
