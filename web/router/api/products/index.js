var router = require('express').Router();
var passport = require("passport");
var Product = require('../../../../models/Product.js');

router.get("/", passport.authenticate('jwt', {session: false}), function(req, res){
    Product.find({ isActivated: true}, function(err, products){
        if(products){
            res.status(200).json(products);
        }
        else {
            res.status(500).json(err);
        }
    });
});

module.exports = router;