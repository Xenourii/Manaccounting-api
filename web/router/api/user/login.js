var router = require('express').Router();
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var config = require('../../../../config/index.js');
var User = require('../../../../models/User.js');
var bcrypt = require('bcrypt');

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secretKey;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (! user) {
            res.status(401).json({message:"error, id not found"});
        }
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

router.use(passport.initialize());

router.post("/", function(req, res) {
    if(typeof req.body.email == 'undefined' || typeof req.body.password == 'undefined'){
        res.status(400).json({message:"bad request"});
        return;
    }

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function(err, user) {
        if (! user ) {
            res.status(401).json({message:"Bad email / password"});
            return;
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            if (user.isActivated) {
                var payload = {id: user.id};
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.status(200).json({message: "ok", token: token});
            }
            else {
                res.status(401).json({message:"error, account deleted"});
            }
        }
        else {
            res.status(401).json({message:"Bad email / password"}); //passwords did not match
        }
    });
});

module.exports = router;