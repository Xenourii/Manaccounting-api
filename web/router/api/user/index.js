var router = require('express').Router();
var passport = require("passport");
var User = require('../../../../models/User.js');
var hash = require('../../../../helpers/hash.js');

router.use('/register', require('./register.js'));
router.use('/login', require('./login.js'));

router.get("/:Id", passport.authenticate('jwt', { session: false }), function(req, res){

    var id = req.params.Id;
    User.findOne({ id: id, isActivated: true }, function(err, product) {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(500).json(err);
        }
    });
});

router.patch("/:Id", passport.authenticate('jwt', {session: false}), function(req, res){
    User.find({ _id: id, isActivated: true}, function(err, user){
        if(!user)
            res.status(404).json(err);
        
        user.firstname = req.body.Firstname || user.firstname;
        user.lastname = req.body.Lastname || user.lastname;
        user.email = req.body.Email || user.email;
        user.birth_date = req.body.BirthDate || user.birth_date;
        user.password = hash.hashPassword(req.body.Password) || user.password;
        user.address = req.body.Address || user.address;
        user.isActivated = req.body.IsActivated || user.isActivated;

        user.save((err) => {
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
    
    User.findOne({ id: id, isActivated: true}, function(err, user){
        if(!user)
            res.status(401).json(err);
        
        User.findByIdAndUpdate({_id: user._id}, {isActivated: false}, function(err, res){
            if(err)
                res.status(500).json({message: "User not found"});
            res.status(200).json({message: "deleted"});
        });
    });
});

module.exports = router;