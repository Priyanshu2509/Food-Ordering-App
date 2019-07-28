const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../routes/userDetails/userModel');
const config = require('./database');
const passport = require('passport');

module.exports =  function() {
  
  // console.log("hello Passport Auth");
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Authorization");
  opts.secretOrKey = config.secret;
  //console.log("opts.jwtFromRequest ",opts.jwtFromRequest );
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      //console.log("jwt_payload",jwt_payload);
      if(err){
        return done(err, false);
      } else if(user){
        console.log(user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
