var router = require('express').Router();
var passport = require("passport");
var Order = require('../../../../models/Order.js');

router.get("/:Id", passport.authenticate('jwt', {session: false}), function(req, res){
    //TODO generate pdf
});

router.post("/", passport.authenticate('jwt', {session: false}), function(req, res){

    var orderId = 0;
    Order.count({}, function(err, count){
        if(err)
            res.status(500).json(err);
        
        orderId = count + 1;

        var order = new Order();
        order.id = orderId;
        order.user_id = req.user;
        order.product_id = req.body.ProductId;
        order.product_number = req.body.ProductNumber;
        order.save((err) => {
            if(err)
                res.status(500).json(err);
            res.status(200).json({Message: "created!", OrderId: orderId});
        });
    });
});

module.exports = router;