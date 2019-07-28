const express = require('express');
var restaurantDetails = require('./restaurantModel').restaurantDetail;
var category = require('./categoryModel').category;
var subCategory = require('./subCategoryModel').subCategory;
var foodItems = require('./foodItemsModel').foodItems;

function addNewRestaurant(req, res) {
  var restaurantInfo = new restaurantDetails({

    restaurantName: req.body.restaurantName,
    restaurantLocation: req.body.restaurantLocation,
    restaurantCity: req.body.restaurantCity,
    restaurantDescription: req.body.restaurantDescription
  });

  restaurantDetails.find({
    'restaurantName': req.body.restaurantName,
    'restaurantLocation': req.body.restaurantLocation,
    'restaurantCity': req.body.restaurantCity
  }, function (err, existingRestaurant) {
    ifExistsFunction(err, existingRestaurant, restaurantInfo, res);

  });
};
exports.addNewRestaurant = addNewRestaurant;

function addNewCategory(req, res) {

  restaurantDetails.countDocuments({
    _id: req.body.restaurantId
  }, function (err, count) {
    if (count > 0) {
      var categoryInfo = new category({
        categoryName: req.body.categoryName,
        restaurantId: req.body.restaurantId
      });

      category.find({
        categoryName: req.body.categoryName,
        restaurantId: req.body.restaurantId
      }, function (err, existingCategory) {
        ifExistsFunction(err, existingCategory, categoryInfo, res);
      });
    } else {
      res.status(422).json({
        msg: 'Failed to add category as no such restaurant id exists'
      });

    }
  });
}
exports.addNewCategory = addNewCategory;

function addNewSubCategory(req, res) {
  category.countDocuments({
    _id: req.body.categoryId
  }, function (err, count) {
    if (count > 0) {
      var subCategoryInfo = new subCategory({
        subCategoryName: req.body.subCategoryName,
        isVeg: req.body.isVeg,
        categoryId: req.body.categoryId
      });

      subCategory.find({
        subCategoryName: req.body.subCategoryName,
        categoryId: req.body.categoryId
      }, function (err, existingSubCategory) {
        ifExistsFunction(err, existingSubCategory, subCategoryInfo, res);
      });
    } else {
      res.status(422).json({
        msg: 'Failed to add subcategory as no such category id exists'
      });
    }
  });
}
exports.addNewSubCategory = addNewSubCategory;

function addNewFoodItem(req, res) {

  subCategory.countDocuments({
    _id: req.body.subCategoryId
  }, function (err, count) {
    if (count > 0) {

      var foodItemInfo = new foodItems({
        foodName: req.body.foodName,
        foodPrice: req.body.foodPrice,
        foodTaxes: req.body.foodTaxes,
        subCategoryId: req.body.subCategoryId,
        itemType :req.body.itemType,
        foodItemsMappedTo: req.body.foodItemsMappedTo,
        customizable: req.body.customizable,
        qty: req.body.qty
      });

      foodItems.find({
        foodName: req.body.foodName,
        subCategoryId: req.body.subCategoryId
      }, function (err, existingfoodItem) {
        ifExistsFunction(err, existingfoodItem, foodItemInfo, res);
      });
    } else {
      res.status(422).json({
        msg: 'Failed to add fooditem as no such subcategory id exists'
      });
    }
  });
}
exports.addNewFoodItem = addNewFoodItem;

//show restaurants 
function showRestaurantsForCity(req, res) {
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
      res.status(200).json({
        success: true,
        restaurants,
        msg: 'restaurants found...'
      });
    }
  });
};
exports.showRestaurantsForCity = showRestaurantsForCity;

//show foodmenu of restaurant
function showRestaurantsInfoAndMenu(req, res) {

  const restaurantId = req.params.restaurantId;
  var data = {};
  // console.log("FOOD..." , foodItems)
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
      // console.log(restaurant);
      data.restaurantInfo = restaurant;
    }
  });

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
      data.subCategory = data_subcategory;
      var ids = [];
      data_subcategory.forEach((element) => {
        ids.push(element._id);
      })
      return foodItems.find({
        'subCategoryId': {
          $exists: true
        },
        'subCategoryId': {
          $in: ids
        }
      }).exec()

    }).then(function (foodItem) {
      data.foodItems = foodItem;
      
      // console.log('hanu....................')
      console.log(foodItems);

      if (data.foodItems.length == 0 || data.subCategory.length == 0 || data.category.length == 0 || data.restaurantInfo.length == 0) {        
        //  console.log("DATA........",data);
        res.status(200).json({
          success: true,
          data,
          msg: 'fooditems NOT found...'
        });
      }
      
      // console.log(data)
      
      foodItems.find({'itemType' : 'addOn'})
        .then(function(addOns){
          console.log(addOns);
          data.addOn=addOns;
          
          res.status(200).json({
            success: true,
            data,
            msg: 'fooditems found...'
          })  
        }, function(error){
          console.log(error, '...error message');
        
        });
    })
    .catch(function (error) {
      console.log("ERROR...", error.message);
      res.status(500).json({
        success: false,
        msg: 'Error at server...'
      })
    });
};
exports.showRestaurantsInfoAndMenu = showRestaurantsInfoAndMenu;

//common function to check if the result exists in db or not
function ifExistsFunction(error, existResultArray, collection, res) {
  if (!error && existResultArray.length != 0) {
    res.status(422).json({
      success: true,
      msg: 'Already exists, cannot add duplicate enteries'
    });
  } else if (existResultArray.length == 0) {
    collection.save(function (err, result) {
      if (!err) {
        res.status(200).json({
          success: true,
          msg: 'Added successfully'
        });
      } else {
        console.log(err);
        res.status(403).json({
          success: false,
          msg: 'Failed to add'
        });
      }
    });

  } else {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'server error'
    });
  }
}