var LocalStrategy = require('passport-local');
var User = require('../models/user.js');
var bCrypt = require('bcrypt-nodejs');

var loginLocalStrategy = new LocalStrategy({passReqToCallback : true}, function(req, username, password, done){
  User.findOne({username: username}, function(err, user) {
    if (err){
      return done(err);}
    if (!user){
      return done(null, false, req.flash('message', 'No such user'));
    }
    if (!bCrypt.compareSync(password, user.password)){
      return done(null, false, req.flash('message', 'Invalid password'));
    }
    console.log( user.firstName + ' logged in at ' + new Date().toUTCString());
    return done(null, user);
  });
});

module.exports = function(passport) {
  passport.use('login', loginLocalStrategy);
};
