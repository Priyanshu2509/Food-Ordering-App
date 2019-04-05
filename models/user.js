const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const config= require('../config/database');

//User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  phone: {
      type: Number,
      required: true
  },

});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};
  
module.exports.getUserByEmail = function(email, callback) {
    const query = {email:email};
    User.findOne(query, callback);
};

module.exports.getUserByPhone = function(phone, callback) {
  const query = {phone:phone};
  User.findOne(query, callback);
};

module.exports.passwordCheck=function(passwordEntered, hashPassword, callback){
  bcrypt.compare(passwordEntered, hashPassword, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) 
              throw err;
          newUser.password = hash; 
          newUser.save(callback);
        });
    });
}

