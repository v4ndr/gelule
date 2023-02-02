const express = require('express');

const router = express.Router();
const dashboardCtrl = require('../controllers/dashboard');

router.get('/monit', dashboardCtrl.monit);

module.exports = router;
