var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    id: { type: Number, required: true},
    user_id: { type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    product_id: {type: Number, required: true},
    product_number: {type: Number, required: true},
    created_at: { type: Date, default: Date.now },
    isActivated: { type: Boolean, default: true }
});

module.exports = mongoose.model('Order', orderSchema);