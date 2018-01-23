var router = require('express').Router();
var passport = require("passport");
var Product = require('../../../../models/Product.js');

router.get("/:Id", passport.authenticate('jwt', { session: false }), function(req, res){

    var id = req.params.Id;
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

//TODO: Only post, patch and delete with admin auth.
router.post("/", passport.authenticate('jwt', {session: false}), function(req, res){

    var product = new Product();
    product.id = req.body.Id;
    product.name = req.body.Name;
    product.price = req.body.Price;
    product.description = req.body.Description;
    product.category = req.body.Category;
    product.brand = req.body.Brand;
    product.memory = req.body.Memory;
    product.refresh_rate = req.body.RefreshRate;
    product.OS = req.body.Os;
    product.interface = req.body.Interface;
    product.guarantee = req.body.Guarantee;
    product.contact_mail = req.body.ContactMail;
    product.return_address = req.body.ReturnAddress;
    product.isActivated = req.body.IsActivated;

    product.save((err, res) => {
        if(err)
            res.status(500).json(err);
        res.status(200).json({message: "added!"});
    });
});

router.patch("/:Id", passport.authenticate('jwt', {session: false}), function(req, res){

    Product.find({ id: id, isActivated: true}, function(err, product){
        if(!product)
            res.status(404).json(err);
        
        product.id = req.params.Id || product.id;
        product.name = req.body.Name || product.name;
        product.price = req.body.Price || product.price;
        product.description = req.body.Description || product.description;
        product.category = req.body.Category || product.category;
        product.brand = req.body.Brand || product.brand;
        product.memory = req.body.Memory || product.memory;
        product.refresh_rate = req.body.RefreshRate || product.refresh_rate;
        product.OS = req.body.Os || product.OS;
        product.interface = req.body.Interface || product.interface;
        product.guarantee = req.body.Guarantee || product.guarantee;
        product.contact_mail = req.body.ContactMail || product.contact_mail;
        product.return_address = req.body.ReturnAddress || product.return_address;
        product.isActivated = req.body.IsActivated || product.isActivated;

        product.save((err, res) => {
            if(err)
                res.status(500).json(err);
            res.status(200).json({message: "updated!"});
        });
    });
});

router.delete("/:Id", passport.authenticate('jwt', {session: false}), function(req, res){
    var id = req.param.Id;
    if(!id)
        res.status(400).json({message: "Invalid id."});
    
    Product.findOne({ id: id, isActivated: true}, function(err, product){
        if(!product)
            res.status(401).json(err); //Check status code
        
        Product.findByIdAndUpdate({_id: product._id}, {isActivated: false}, function(err, res){
            if(err)
                res.status(500).json({message: "Product not found"});
            res.status(200).json({message: "deleted"});
        });
    });
});

module.exports = router;