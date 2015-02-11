var mongoose = require('mongoose');

var MONGO_URI;
MONGO_URI = 'mongodb://localhost/chirper' || process.env.MONGOLAB_URI;
console.log(MONGO_URI);
var mongooseConfig = {url : MONGO_URI};
mongoose.connect(mongooseConfig.url);

module.exports = mongoose;
