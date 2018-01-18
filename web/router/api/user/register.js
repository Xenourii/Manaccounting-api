var router = require('express').Router();
var User = require('../../../../models/User.js');
var hash = require('../../../../helpers/hash.js');

router.post('/', function(req, res) {
    if (typeof req.body.email != 'undefined' && 
        typeof req.body.password != 'undefined' &&
        typeof req.body.firstname != 'undefined' &&
        typeof req.body.lastname != 'undefined' &&
        typeof req.body.birth_date != 'undefined' &&
        typeof req.body.address != 'undefined') 
    {   

        var newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            birth_date: req.body.birth_date,
            password: hash.hashPassword(req.body.password),
            address: req.body.address
        })
        .save(function(err){
            if(err){
                return  res.status(401).json({message:"fail to create user (email already used)"});
            }
            res.status(201).json({message:"user saved with success!"});
        });
        
    }
    else {
        res.status(400).json({message:"bad request"});
    }
});

router.post('/IsEmailAvailable', function(req, res) {
    var email = req.body.email;
    if (typeof email != 'undefined') {   
        User.findOne({ email: email }, function(err, user) {
            if (user) {
                res.status(200).json({message: 'false'});
            }
            else {
                res.status(200).json({message: 'true'});
            }
        });
    }
    else {
        res.status(400).json({message:"bad request"});
    }
});

module.exports = router;