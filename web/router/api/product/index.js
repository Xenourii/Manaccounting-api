var router = require('express').Router();
var passport = require("passport");
var Product = require('../../../../models/Product.js');

router.get("/:param", passport.authenticate('jwt', { session: false }), function(req, res){

    var id = req.params.param;
    Product.findOne({ id: id, isActivated: true }, function(err, product) {
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json(err);
        }
    });
});

router.get("/all", passport.authenticate('jwt', {session: false}), function(req, res){
    Product.find({ isActivated: true}, function(err, products){
        if(products){
            res.status(200).json(products);
        }
        else {
            res.status(404).json(err);
        }
    });
});

module.exports = router;