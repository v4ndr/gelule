const express = require('express');

const router = express.Router();
const trackingCtrl = require('../controllers/tracking');

router.post('/submit_session', trackingCtrl.submitSession);

module.exports = router;
