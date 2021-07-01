const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/reminder', require('./reminder'));
router.use('/keepin', require('./keepin'));
router.use('/my', require('./my'));

module.exports = router;