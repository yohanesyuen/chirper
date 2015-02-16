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
    user.comparePassword(password, function(err, isMatch){
      if (err) return done(err);
      if (isMatch) {
        user.last_login = new Date();
        user.save();
        return done(null, user);
      }
      else
        return done(null, false, {message : 'Invalid Password'});
    });
  });
});

module.exports = function(passport) {
  passport.use('login', loginLocalStrategy);
};
