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
  last_login: Date,
  followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  following: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

userSchema.pre('save', function(next){
  var user = this;

  if (!user.isModified('password')) return next();

  var password = bCrypt.hashSync(user.password, bCrypt.genSaltSync(10), null);
  user.password = password;
  next();
});

userSchema.methods.comparePassword = function(candidatePassword, done){
  if (!bCrypt.compareSync(candidatePassword, this.password)){
    return done('', false);
  }
  else{
    return done(null, true);
  }
};

userSchema.methods.follow = function(user, done){
  if(!user)
    return done('Invalid User');
  this.following.remove(user._id);
  user.followers.remove(this._id);
  this.following.push(user._id);
  user.followers.push(this._id);
  this.save();
  user.save();
    return done(null, {new_state: user.followers.indexOf(this._id) > -1 ? 'following' : 'not-following'} )
};

userSchema.methods.unfollow = function(user, done){
  if(!user)
    return done('Invalid User');
  this.following.remove(user._id);
  user.followers.remove(this._id);
  this.save();
  user.save();
    return done(null, {new_state: user.followers.indexOf(this._id) > -1 ? 'not-following' : 'following'} )
};

var User = mongoose.model('User', userSchema);

module.exports = User;
