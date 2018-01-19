var router = require('express').Router();

router.use('/user', require('./user/index.js'));
router.use('/products', require('./product/index.js'));
//router.use('/admin', require('/admin/index.js'));

module.exports = router;