const mongoose = require('mongoose');
const config = require('../../config/database');
const express = require('express');
const router = express.Router();

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

module.exports.orderDetails =mongoose.model('orderDetails', orderDetailsSchema);

// module.exports.addOrder = function (newOrder, callback) {
//     newOrder.save(callback);
// }