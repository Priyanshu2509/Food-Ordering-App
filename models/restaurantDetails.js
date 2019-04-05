const mongoose = require('mongoose');
const config= require('../config/database');

const restaurantSchema = mongoose.Schema({
    restaurantName: {
      type: String,
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
  
const restaurantDetails=module.exports = mongoose.model('restaurantDetails', restaurantSchema);
   
//   async function func(restaurantName,restaurantCity,restaurantDescription) {
      
//         const obj = new restaurantDetails({
//           restaurantName,restaurantCity,restaurantDescription
//         });
//         const result = await obj.save();
//         console.log(result);
//     }
  
//   func('Cafe 202','Pune','Continental food');