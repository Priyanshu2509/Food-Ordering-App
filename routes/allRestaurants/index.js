const express = require('express');
const router = express.Router();

const allRestaurants = require('./allrestaurants');

router.post('/addRestaurant', allRestaurants.addNewRestaurant);
router.post('/addCategory',  allRestaurants.addNewCategory);
router.post('/addSubCategory', allRestaurants.addNewSubCategory);
router.post('/addFoodItem', allRestaurants.addNewFoodItem);
// router.post('/addAddOns', allRestaurants.addNewAddOns);

router.get('/:city',allRestaurants.showRestaurantsForCity);
router.get('/:city/:restaurantId',allRestaurants.showRestaurantsInfoAndMenu);

module.exports = router;    