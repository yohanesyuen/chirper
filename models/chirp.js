var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chirpSchema = Schema({
  id: String,
  created_at: Date,
  str_id: String,
  author: {type: String, ref: 'User'},
  text: String
});

var Chirp = mongoose.model('Chirp', chirpSchema);

module.exports = Chirp;
