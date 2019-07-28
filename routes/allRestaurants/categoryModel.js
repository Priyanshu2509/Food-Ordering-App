const mongoose = require('mongoose');
const express = require('express');

const categorySchema = mongoose.Schema({
    categoryName: {
      type: String,
      required: true
    },
    restaurantId: {
        type: String,
        required: true
    }
  });
module.exports.category = mongoose.model('category', categorySchema);
   
