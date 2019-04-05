const express = require('express');
const growl = require('growl');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

// Signup route
router.post('/signup', (req, res, next) => {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        phone: req.body.phone
    });
    User.addUser(newUser, (err, user) => {
    if(err) {
      console.log(err);
      res.status(500).json({success: false, msg: 'Failed to register user'});
      growl('Failed to register user!');

    } else {
      res.status(200).json({success: true, msg: 'User registered successfully'});
      growl('successful register');
    }
    });
});

// Authenticate route
router.post('/authenticate', (req, res, next) => {

    const email= req.body.email;
    const password= req.body.password;

      User.getUserByEmail(email, (err, user)=>{
        if(err)
         throw err;
        
        if(!user){
          return res.json({success:false, msg:'User not found'});
        }
        
        User.passwordCheck(password, user.password, (err, isMatch)=>{
          if (err) {throw err; }

          else if(isMatch) {
            const token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 604800
            });
            res.status(200).json({
              success: true,
              token: 'JWT '+token,
              user: {
                email: user.email
              }
            });
          } 
          else {

            res.status(500).json({success: false, msg: 'Wrong Password'});
            
          }
        
        });
      });  
});


// Profile route
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});

//Validate route
// router.get('/validate', (req, res, next) =>{
//   res.send('VALIDATE');
// });


module.exports = router;