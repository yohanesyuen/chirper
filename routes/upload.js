var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Chirp = require('../models/chirp');

router.post('/', function(req, res){
  if (req.user){
    var newchirp = new Chirp();
    //var user = req.user;
    newchirp.created_at = new Date();
    if (req.user.str_id)
      newchirp.author = req.user.str_id;
    else{
      User.findOne({username: req.user.username}, function(err, user){
        if (!err && user){
          console.log('Setting str_id for' + user.username);
          user.str_id = user._id.toString();
          newchirp.author = user._id;
          user.save();
        }
      });
    }
    newchirp.text = req.body.content;
    newchirp.save();
    res.send('Received data: ' + JSON.stringify(req.body));
  }
  else
    res.send('ERROR: No user logged in');
});

router.get('/', function(req, res){
  res.send('Upload');
});

module.exports = router;
