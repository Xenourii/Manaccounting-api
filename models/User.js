var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: ['user'],
        required: true
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birth_date: {type: Date, required: true },
    password: { type: String, required: true },
    address: {type: String, required: true },
    orders: Array,
    created_at: { type: Date, default: Date.now },
    isActivated: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);