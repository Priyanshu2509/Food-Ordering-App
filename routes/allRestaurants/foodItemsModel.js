const mongoose = require('mongoose');
const config = require('../../config/database');
const express = require('express');
const router = express.Router();

const foodItemsSchema = mongoose.Schema({
    foodName: {
      type: String,
      required: true
    },
    foodPrice: {
        type: Number,
        required: true
    },
    foodTaxes:[{ 
      taxName : {type:String},
      taxValue: {type: Number}
    }],
    subCategoryId:{
        type: String,
        
    },
    // customizable:{
    //   type: Boolean,
    //   required:true
    // },
    foodItemsMappedTo : {
      type: Array
    },
    itemType: {
      type: String,
      required: true
    },
    qty:{
      type: Number
    }
});
  
module.exports.foodItems = mongoose.model('foodItems', foodItemsSchema);
   