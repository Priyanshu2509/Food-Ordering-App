const express = require('express');
const router = express.Router();

const config = require('../../config/database');
var orderDetails = require('./orderDetailsModel').orderDetails;

function placeOrder(req, res) {

  var newOrder = new orderDetails({
    userId: req.body.userId,
    userName: req.body.userName,
    restaurantId: req.body.restaurantId,
    restaurantName: req.body.restaurantName,
    restaurantCity: req.body.restaurantCity,
    cart: req.body.cart,
    deliveryAddress: req.body.deliveryAddress,
    paymentDetails: req.body.paymentDetails
  });

  newOrder.save(function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: 'Failed to add the order to DB'
      });
    } else {
      //console.log(order);
      res.status(200).json({
        success: true,
        order: result,
        msg: 'Order added successfully'
      });
    }
  });

}

exports.placeOrder = placeOrder;