const express = require('express');
const router = express.Router();

const { register } = require('../controlles/User.js');

router.route('/register').post(register);

module.exports = router;