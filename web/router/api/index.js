var router = require('express').Router();

router.use('/user', require('./user/index.js'));
router.use('/product', require('./product/index.js'));
router.use('/products', require('./products/index.js'));
router.use('/order', require('./order/index.js'));
//router.use('/admin', require('/admin/index.js'));

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Welcome home');
});

module.exports = router;