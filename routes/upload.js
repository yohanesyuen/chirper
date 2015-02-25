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
    newchirp.save(function(err){
      if(!err){
        var chirp_sources = req.user.following;
        chirp_sources.push(req.user._id);

        Chirp.find()
        .where('author').in(chirp_sources)
        .populate('author')
        .sort('-created_at')
        .exec(function(err, chirps){
          res.render('feed', {chirps: chirps});
        });
      }
    });
//    res.send('Received data: ' + JSON.stringify(req.body));
  }
  else
    res.send('ERROR: No user logged in');
});

router.get('/', function(req, res){
  res.send('Upload');
});

module.exports = router;
