var router = require('express').Router();

router.use('/register', require('./register.js'));
//router.use('/login', require('./login.js'));

module.exports = router;