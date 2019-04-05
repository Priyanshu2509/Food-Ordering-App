// const express = require('express');
// const router = express.Router();

// const config = require('../config/database');
// var restaurantDetails= require('../models/restaurantDetails');

// //show cities in drop down at homepage
// router.get('/:city', (req, res, next) => {
//   //console.log("req", req.params.city);

//    restaurantDetails.find({'restaurantCity':req.params.city},function(error,restaurants){

//     if(error) {
//      console.log(error);
//       res.status(500).json({success: false, msg: 'No restaurants could be found...'});

//     } else {
//       console.log(restaurants);
//       res.status(200).json({success: true, restaurants, msg: 'restaurants found...'});
//     }

//    });
// });

// module.exports=router;