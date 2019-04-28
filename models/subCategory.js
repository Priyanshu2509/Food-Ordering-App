const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subCategoryName: {
      type: String,
      required: true
    },
    isVeg: {
      type: Boolean,
      required:true
    },
    categoryId: {
        type: String,
        required: true
    }
  });
  
const subCategory=module.exports = mongoose.model('subCategory', subCategorySchema);
   
//   async function func(subCategoryName, isVeg, categoryId) {
      
//         const obj = new subCategory({
//           subCategoryName, isVeg, categoryId
          
//         });
//         const result = await obj.save();
//         console.log(result);
//     }
  
//   func('Non-alcoholic drinks','1', '5ca5eaf2a2b71c322424f4c7');