const mongoose = require('mongoose');
const config = require('../../config/database');
const express = require('express');
const router = express.Router();

const restaurantSchema = mongoose.Schema({
  restaurantName: {
    type: String,
    required: true
  },
  restaurantLocation: {
    type:String,
    required: true
  },
  restaurantCity: {
    type: String,
    required: true
  },
  restaurantDescription: {
    type: String,
    required: true
  }
});
module.exports.restaurantDetail = mongoose.model('restaurantDetail', restaurantSchema);
