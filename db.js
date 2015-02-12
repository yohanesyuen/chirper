var mongoose = require('mongoose');

//var mongooseConfig = {url : 'mongodb://localhost/chirper'};
var MONGO_URL;

MONGO_URL = process.env.MONGOLAB_URI || 'mongodb://localhost/chirper';

var mongooseConfig = {url : MONGO_URL};
mongoose.connect(mongooseConfig.url);

module.exports = mongoose;
