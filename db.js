var mongoose = require('mongoose');

//var mongooseConfig = {url : 'mongodb://localhost/chirper'};
var mongooseConfig = {url : 'mongodb://admin:admin@ds041651.mongolab.com:41651/heroku_app33848434'};
mongoose.connect(mongooseConfig.url);

module.exports = mongoose;
