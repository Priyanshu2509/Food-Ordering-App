const mongoose = require('mongoose');
const config = require('../config/database');

const orderDetailsSchema = mongoose.Schema({
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
        type:Object
    },
    paymentDetails:{
        type:Object
    }
});

const orderDetails = module.exports = mongoose.model('orderDetails', orderDetailsSchema);

module.exports.addOrder = function (newOrder, callback) {
    // console.log("order line 34" , newOrder);
    newOrder.save(callback);
}