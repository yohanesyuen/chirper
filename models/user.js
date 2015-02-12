var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

var userSchema = Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  profile_pic: String,
  str_id: String,
  created_at: Date,
  chirpCount: Number,
  followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  following: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
