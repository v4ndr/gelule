const express = require('express');

const router = express.Router();
const logsCtrl = require('../controllers/logs');

router.post('/', logsCtrl.submitLogs);

module.exports = router;
