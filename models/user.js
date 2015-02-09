var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  profile_pic: String,
  str_id: String,
  created_at: Date,
  chirpCount: Number,
  followers: Array,
  following: Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;
