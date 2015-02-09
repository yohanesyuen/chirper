var login = require('./login.js');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(passport){
  var authLocalSerializer = function (user, done) {
    done(null, user._id);
  };

  var authLocalDeserializer = function (id, done) {
    User.findById(id, function(err, user) {
      console.log();
      done(err, user);
    });
  };

  passport.serializeUser(authLocalSerializer);
  passport.deserializeUser(authLocalDeserializer);

  login(passport);
  signup(passport);
};
