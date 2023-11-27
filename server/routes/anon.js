const express = require('express');

const router = express.Router();
const anonCtrl = require('../controllers/anon');

router.get('/', anonCtrl.genAnonId);

module.exports = router;
