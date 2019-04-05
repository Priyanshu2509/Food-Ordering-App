const mongoose = require('mongoose');

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
        required: true
    }
});
  
//   const foodItems=module.exports = mongoose.model('foodItems', foodItemsSchema);
   
//   async function func(foodName, foodPrice, foodTaxes, subCategoryId) {
      
//         const food = new foodItems({
//           foodName, foodPrice, foodTaxes, subCategoryId
//         });
//         const result = await food.save();
//         console.log(result);
//     }
  
//   func('Veg loaded Pizza', 180, [{taxName:'GST', taxValue: 5},{taxName:'VAT', taxValue: 7.5}], 'c1r1cat1sub2');
