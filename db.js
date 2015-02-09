var mongoose = require('mongoose');

var mongooseConfig = {url : 'mongodb://localhost/chirper'};
mongoose.connect(mongooseConfig.url);

module.exports = mongoose;
