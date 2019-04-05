const express = require('express');
const router = express.Router();
const Q=require('q');

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
      console.log(restaurants);
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
console.log(req.params.city,req.params.restaurantId);
const city = req.params.city;
const restaurantId = req.params.restaurantId;

category.find({
    'restaurantId': req.params.restaurantId
  })
  .then(function (data_category) {
    var promises = [];
    for (var i = 0; i < data_category.length; i++) {
      var subPromise = subCategory.find({
        'categoryId': data_category._id
      }).exec()
      promises.push(subPromise);
    }
    Q.allSettled(promises)
      .then(function (data_subcategory) {
        for (var i = 0; i < data_subcategory.length; i++) {
          var subPromise = foodItems.find({
            'subCategoryId': data_subcategory._id
          }).exec()
          promises.push(subPromise);
        }
      });
      Q.all(promises).then(function(restaurants){
      res.status(200).json({
        success: true,
        restaurants,
        msg: 'fooditems found...'
      })
      .catch(function(error){ 
        console.log(error.message);
        res.status(500).json({
          success: false,
          msg: 'fooditems NOT found...'
        });
      });
     })
});
//console.log(promises);


  

  // Q.fcall()
  //   .then(promisedStep2)
  //   .then(promisedStep3)
  //   .then(promisedStep4)
  //   .then(function (value4) {
  //     // Do something with value4
  //   })
  //   .catch(function (error) {
  //     // Handle any error from all above steps
  //   })
  //   .done();

  //  restaurantDetails.find({'city': req.params.city, 'restaurantName':req.params.restaurant,function(error,restaurant){
  //   json.restaurant=restaurant;
  //     category.find({'restaurantId': restaurant._id, function(error, category){
  //       json.category=category;
  //         subCategory.find({'categoryId: '})
  //     })
  //  }});


// var promise = Q.fcall(function () {
//     return "Fixed value";
// });
// promise.then(function (val) {
//     console.log(val);
// });
});

module.exports = router;