const express = require('express');
const router = express.Router();
const Q = require('q');

const config = require('../config/database');
var restaurantDetails = require('../models/restaurantDetails');
var category = require('../models/category');
var subCategory = require('../models/subCategory');
var foodItems = require('../models/foodItems');

//show restaurants 
router.get('/:city', (req, res, next) => {
  //console.log("req", req.params.city);

  restaurantDetails.find({
    'restaurantCity': req.params.city
  }, function (error, restaurants) {

    if (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        msg: 'No restaurants could be found...'
      });

    } else {
      //console.log(restaurants);
      res.status(200).json({
        success: true,
        restaurants,
        msg: 'restaurants found...'
      });
    }

  });
});

//show foodmenu of restaurant
router.get('/:city/:restaurantId', (req, res, next) => {
  console.log(req.params.city, req.params.restaurantId);
  const city = req.params.city;
  const restaurantId = req.params.restaurantId;
  var data = {};
  var result = {};
  //var id=req.params.restaurantId;

  restaurantDetails.findOne({
    '_id': restaurantId
  }, function (error, restaurant) {
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        msg: 'No restaurant could be found...'
      });

    } else {
      console.log(restaurant);
      data.restaurantInfo = restaurant;
    }
  });

  console.log(typeof req.params.restaurantId);
  console.log("rest:", req.params.restaurantId);

  //var categories = [];
  category.find({
      'restaurantId': {
        $exists: true
      },
      'restaurantId': restaurantId
    }).exec()
    .then(function (data_category) {
      var ids = [];
      data_category.forEach((element) => {
        ids.push(element._id);
      })
      //console.log("category:", data_category);
      //console.log("ids:", ids);
      data.category = data_category;
      return subCategory.find({
        'categoryId': {
          $exists: true
        },
        'categoryId': {
          $in: ids
        }
      }).exec()
    })
    .then(function (data_subcategory) {
      //console.log("subcat",data_subcategory);
      data.subCategory = data_subcategory;
      var ids = [];
      data_subcategory.forEach((element) => {
        //console.log("element", element); 
        ids.push(element._id);
        //console.log(ids); 
      })
      return foodItems.find({
        'subCategoryId': {
          $exists: true
        },
        'subCategoryId': {
          $in: ids
        }
      }).exec()

    }).then(function (foodItems) {
      data.foodItems = foodItems;
      //console.log(typeof data.category)
      
      if (data.foodItems.length == 0 || data.subCategory.length == 0 || data.category.length == 0 || data.restaurantInfo.length==0) {
        res.status(200).json({
          success: true,
          data,
          msg: 'fooditems NOT found...'
        });
      }
      res.status(200).json({
        success: true,
        data,
        msg: 'fooditems found...'
      })
    })
    .catch(function (error) {
      console.log("ERROR...", error.message);
      res.status(500).json({
        success: false,
        msg: 'Error at server...'
      })
    });
});



module.exports = router;