var LocalStrategy = require('passport-local');
var User = require('../models/user.js');
var bCrypt = require('bcrypt-nodejs');

var signupLocalStrategy = new LocalStrategy({passReqToCallback : true}, function(req, username, password, done) {
  process.nextTick(function(){
    User.findOne({'username' : username}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('message','User Already Exists'));
      }
      else {
        var newUser = new User({
          username: username,
          password: password,
          email: req.param('email'),
          firstName: req.param('firstName'),
          lastName: req.param('lastName'),
          created_at: new Date(),
          chirpCount: 0,
          followers: [],
          following: [],
          profile_pic: null,
          str_id: ''
        });

        newUser.save(function(err) {
          if (err){
            console.log('Error in Saving user: '+err);
            throw err;
          }
          console.log('User Registration succesful');
          return done(null, newUser);
        });
      }
    });
  });
});

module.exports = function(passport){
  passport.use('signup', signupLocalStrategy);
};
