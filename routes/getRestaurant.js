// const express = require('express');
// const router = express.Router();

// const config = require('../config/database');
// var restaurantDetails = require('../models/restaurantDetails');

// router.get('/:restaurantId', (req, res, next) =>{

//     console.log("hello");
//     var id=req.params.restaurantId;

//     restaurantDetails.findOne({'_id': id}
//       , function (error, restaurant) {
//         if (error) {
//             console.log(error);
//             res.status(500).json({
//               success: false,
//               msg: 'No restaurant could be found...'
//             });
      
//           } else {
//             //console.log(restaurant);
//             res.status(200).json({
//               success: true,
//               restaurant,
//               msg: 'restaurant is found...'
//             });
//           }
//     });  
    
// });

// module.exports = router;