var router = require('express').Router();
var passport = require("passport");
var Order = require('../../../../models/Order.js');
var Product = require('../../../../models/Product.js');
var fs = require('fs');
var pdf = require('html-pdf');

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
            

            Product.findOne({ id: req.body.ProductId }, function(err, product) {
                if(err)
                    res.status(500).json(err);
                
                var priceAll = product.price * req.body.ProductNumber;
                var priceExtax = (product.price * 0.833) * req.body.ProductNumber;

                var html = "<!DOCTYPE html><html><head><style>h1 {text-align: center;}table, th, td {border: 1px solid black;border-collapse: collapse;}</style></head><body><h1>Invoice</h1><table style=\"width:100%\"><tr><th>Name Product</th><th>Number</th><th>Price (ex-Tax)</th><th>Price (Including all taxes)</th></tr><tr><td>"+ product.name +"</td><td>"+ req.body.ProductNumber +"</td><td>€"+ priceExtax +"</td><td>€"+ priceAll +"</td></tr></table></body></html>";
                var options = { format: 'Letter' };
                
                pdf.create(html, options).toFile('./Public/invoice_'+ orderId +'.pdf', function(err, res) {
                if (err) return console.log(err);
                }); 
            });
        });
    });
});

module.exports = router;