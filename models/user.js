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
  else
    return done(null, this);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
