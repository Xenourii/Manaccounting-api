var router = require('express').Router();
var passport = require("passport");
var Order = require('../../../../models/Order.js');
var Product = require('../../../../models/Product.js');
var fs = require('fs');
var pdf = require('html-pdf');

function getProduct(id){
    var promise = Product.findOne({ id: id}).exec();
    return promise;
};

router.post("/", passport.authenticate('jwt', {session: false}), async function(req, res){

    var orderId = 0;
    Order.count({}, function(err, count){
        if(err)
            res.status(500).json(err);
        
        orderId = count + 1;

        var order = new Order();
        order.id = orderId;
        order.user_id = req.user;
        order.products_id = req.body.ProductsId;
        order.products_number = req.body.productsNumber;

        order.save((err) => {
            if(err)
                res.status(500).json(err);
            res.status(201).json({Message: "order created!", OrderId: orderId});
        });

        console.log("4");
        var productHtml = "";

        ///////////////////////////////////
        for (var i = 0; i < order.products_id.length; i++){


            var promise = getProduct(req.body.ProductId);
            promise.then(function(jedis){
            jedis.forEach(function(jedi){
                console.log(jedi.name);
            });
            }).error(function(error){
            console.log(error);
            });


            Product.findOne({ id: req.body.ProductId}).exec()
            .then(function(product){
                console.log("6");
                productHtml += "<tr><td>"+ product.name +"</td><td>"+ order.products_number[i] +"</td><td>€"+ (product.price *0.833 ) * order.products_number[i] +"</td><td>€"+ product.price * order.products_number[i] +"</td></tr>";
                console.log("7");
            }).catch(function(err){
                res.status(500).json(err);
            });
        }
        console.log("8");

        var html = "<!DOCTYPE html><html><head><style>h1 {text-align: center;}table, th, td {border: 1px solid black;border-collapse: collapse;}</style></head><body><h1>Invoice</h1><table style=\"width:100%\"><tr><th>Name Product</th><th>Number</th><th>Price (ex-Tax)</th><th>Price (Including all taxes)</th></tr>" + productHtml + "</table></body></html>";
        var options = { format: 'Letter' };
        
        pdf.create(html, options).toFile('./Public/invoice_'+ orderId +'.pdf', function(err, res) {
        if (err) return console.log(err);
        });
        
    });
});

module.exports = router;