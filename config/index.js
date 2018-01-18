var dotenv = require('dotenv');
var mongoose = require('mongoose');

function createSecretKey(size)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()-_=+[]{};:,.<>/?";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


var secretKey = createSecretKey(32);

dotenv.config();

mongoose.connect('mongodb://' + process.env.DB_HOST+
                ':' + process.env.DB_PORT +
                '/' + process.env.DB_NAME)
                .then(() => {
                    console.log("Connected to database!");
                })
                .catch(err => {
                    console.log("Database error connection... Please verify your configuration in the .env file.");
                });

module.exports.secretKey = secretKey;