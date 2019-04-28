const mongoose = require('mongoose');
const config = require('../config/database');

const orderSchema = mongoose.Schema({
    userId: {
        type: String
    },
    userName:{
        type: String
    },
    cart: {
        type: Object,
    },
    restaurantId: {
        type: String
    },
    restaurantName: {
        type: String
    },
    restaurantCity: {
        type: String
    },
    deliveryAddress:{
        type:String
    },
    paymentDetails:{
        type:Object
    }
});

const orderDetails = module.exports = mongoose.model('orderDetails', orderSchema);

module.exports.addOrder = function (newOrder, callback) {

    newOrder.save(callback);
}