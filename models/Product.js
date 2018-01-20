var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: { type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    brand: { type: String, required: true},
    memory: { type: String, required: true},
    refresh_rate: { type: String, required: true},
    battery_life: { type: Stream, required: true},
    OS: { type: String, required: true},
    interface: { type: String, required: true},
    guarantee: { type: Number, required: true},
    contact_mail: { type: String, required: true },
    return_address: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    isActivated: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);