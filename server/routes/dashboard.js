const express = require('express');

const router = express.Router();
const dashboardCtrl = require('../controllers/dashboard');

router.get('/monit', dashboardCtrl.monit);
router.post('/tally', dashboardCtrl.submitTally);

module.exports = router;
