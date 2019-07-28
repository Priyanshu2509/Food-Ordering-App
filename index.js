const mongoose = require('mongoose');
    const passport = require('passport');
    const path=require('path');
    const session      = require('express-session');
    const jwt = require('jsonwebtoken');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const bcrypt   = require('bcryptjs');

    const express = require('express');
    const app = express();

    const config = require('./config/database');
    const users = require('./routes/userDetails/user');
    const home = require('./routes/homeDetails');
    const allrestaurants = require('./routes/allRestaurants');
    const orderDetails = require('./routes/orderDetails');
    require('./config/passport')(passport);

    mongoose.connect(config.database, {
            useNewUrlParser: true
        })
        .then(function () {
            console.log("Connected to mongodb...");
        })
        .catch(function (err) {
            console.log("Cannot connect to mongodb...", err);
        });

    
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });

    app.use('/api/users', users);
    app.use('/api/home', home);
    app.use('/api/allrestaurants', allrestaurants);
    app.use('/api/orderDetails', orderDetails);

    app.use(function(req,res){
        res.sendFile(__dirname+'/public/index.html');
    });

    app.get('/', (req, res) => {
        res.send('Invalid Endpoint');
    });

    const port = 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));