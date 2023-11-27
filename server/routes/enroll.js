const express = require('express');

const router = express.Router();
const anonCtrl = require('../controllers/anon');

router.post('/', anonCtrl.addEnrollToken);
router.get('/', anonCtrl.getEnrollTokens);

module.exports = router;
