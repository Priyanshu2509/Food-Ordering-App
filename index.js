const mongoose = require('mongoose');
const passport = require('passport');
const path=require('path');
const session      = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash    = require('connect-flash');
const morgan       = require('morgan');
const Q = require('q');
const growl = require('growl');

const express = require('express');
const app = express();

const config=require('./config/database');
const users=require ('./routes/user');
const home=require('./routes/home');
const allrestaurants=require('./routes/allrestaurants');
//const foodMenu=require('./routes/foodMenu');
require('./config/passport')(passport);

mongoose.connect(config.database, { useNewUrlParser: true })
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
app.use('/users', users);
app.use('/home', home);
app.use('/allrestaurants', allrestaurants);
//app.use('/foodMenu',foodMenu);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

const port =  3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




 