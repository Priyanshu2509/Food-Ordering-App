    const mongoose = require('mongoose');
    const passport = require('passport');
    const path = require('path');
    
    const bodyParser = require('body-parser');
    
    const express = require('express');
    const app = express();

    const config = require('./config/database');
    const users = require('./routes/user');
    const home = require('./routes/home');
    const allrestaurants = require('./routes/allrestaurants');
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
    // app.use(express.static(__dirname + '/public'));

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


    // app.get('*', function(req, res) {
    //     res.sendFile(path.join(__dirname + '/public/index.html'));
    // });

    app.use(function(req,res){
        res.sendFile(__dirname+'/public/index.html');
    })
    // app.get('/', (req, res) => {
    //     res.send('Invalid Endpoint');
    // });
    const port = 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));