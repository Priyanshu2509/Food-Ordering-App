const express = require('express');

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
    phone: req.body.phone,
    isAdmin: req.body.isAdmin
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: 'Failed to register user'
      });
    } else {

      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: 604800
      });


      res.status(200).json({
        success: true,
        token: 'JWT' + token,
        msg: 'User registered successfully'
      });
    }
  });
});

// Authenticate route
router.post('/authenticate', (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  // var emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  // var phoneFilter = /^http:\/\//;

  // if (emailFilter.test(username)) {
  //   alert('Please enter a valid e-mail address.');
    

  // } else if (phoneFilter.test(username)) {
  //   alert('Please correct your phone number.');
   
  // }

  // else{
  //   alert("ERROR");
  // }




  User.getUserByEmail(email, (err, user) => {
    // if (err)
    // console.log ('error', err.message, err.stack);


    if (!user) {
      return res.status(422).json(null);
    }

    User.passwordCheck(password, user.password, (err, isMatch) => {

      if (isMatch) {
        // const token=User.generateAuthToken();

        var compactUser = new User({
          _id: user._id,
          email: user.email,
          phone: user.phone
        });

        console.log("compactUser", compactUser);
        console.log("user", user);
        const token = jwt.sign(compactUser.toJSON(), config.secret, {
          expiresIn: 604800
        });
        res.status(200).json({
          message: 'Logged In Successfully!',
          success: true,
          token: token,
          user: {
            email: user.email
          }
        });
      } else {

        res.status(400).json({
          msg: 'Wrong Password'
        });

      }

    });
  });
});

router.post('/getinfo', (req, res, next) => {

  var token = req.body.token;
  console.log("token", req.body.token);
  //var data = {};

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      throw err;
    }
    //var id = decoded._id;
    console.log("ID: ", decoded);
    User.findOne({
      '_id': decoded._id
    }, function (err, userData) {
      if (userData != null) {

        res.status(200).json({
          success: true,
          data: userData,
          msg: 'Address found'
        });

      } else if (userData == null) {

        res.status(200).json({
          success: true,
          data: userData,
          msg: 'Address NOT found'
        });

      } else {
        res.status(500).json({
          success: false,
          msg: 'Error at server ...'
        });
      }
    });

  });


});



router.put('/addAddress', (req, res, next) => {

  var newAddress = (req.body.newAddress);
  console.log(newAddress);
  if (newAddress === undefined || newAddress.length == 0) {
    return res.status(422).json({
      message: 'It is an empty address!'
    });
  }

  var userId = req.body.userId;
  console.log("address", req.body.newAddress);
  console.log("id: ", userId);

  User.findOneAndUpdate({
      '_id': userId
    }, {
      $push: {
        address: newAddress
      }
    }, {
      new: true
    },
    function (err, addressAdded) {
      console.log("addressAdded", addressAdded);

      console.log("success");
      console.log(addressAdded);




      if (addressAdded != '') {

        res.status(200).json({
          message: 'address is added successfully!',
          success: true,
        });

      } else {
        res.status(500).json({
          message: 'Error at the server!',
          success: false,
        });
      }


    });
});



// Profile route
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});



module.exports = router;