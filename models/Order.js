var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    id: { type: Number, required: true},
    user_id: { type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    orders: { type: Array, required: true},
    created_at: { type: Date, default: Date.now },
    isActivated: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);