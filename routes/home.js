const express = require('express');
const router = express.Router();

const config = require('../config/database');
var restaurantDetails= require('../models/restaurantDetails');

//show cities in drop down at homepage
router.get('/', (req, res, next) => {
   restaurantDetails.find().distinct('restaurantCity',function(error,cities){
    if(error) {
      console.log(error);
      res.status(500).json({success: false, msg: 'No cities could be found...'});

    } else {
      console.log(cities);
      res.status(200).json({success: true, cities, msg: 'Cities found...'});
    }

   });
});

module.exports=router;
