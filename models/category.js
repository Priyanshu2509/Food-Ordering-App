const mongoose = require('mongoose');
const config= require('../config/database');

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
  
const category=module.exports = mongoose.model('category', categorySchema);
   
//   async function func(categoryName, restaurantId) {
      
//         const obj = new category({
//           categoryName, restaurantId
          
//         });
//         const result = await obj.save();
//         console.log(result);
//     }
  
//   func('Burgers','5ca5e72b3f1a113f24045836');