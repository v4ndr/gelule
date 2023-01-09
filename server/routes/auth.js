const express = require('express');

const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/query_pin', authCtrl.queryPin);
router.get('/gen_pin', authCtrl.genPin);

module.exports = router;
