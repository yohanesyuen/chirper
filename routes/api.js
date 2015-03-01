var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');
var Chirp = require('../models/chirp');
var utils = require('../utils');

router.use(utils.ensureAuthenticated);

router.get('/follow/:id', function(req, res, done){
  User.findOne({_id: req.user.id}, function(err, _self){
    if(err){
      return done(err);
    }
    if (_self) {
      User
      .find()
      .or([{_id: req.params.id}, {username: req.params.id}])
      .exec(function(err, user){
        user = user[0];
        if(err)
          done(err);
        if(!user)
          done(null, false);
        _self.follow(user, function(err, state){
          if (err)
            res.json({err: err});
          res.json(state);
        });
      });
    }
  });
});

router.get('/unfollow/:id', function(req, res, done){
  User.findOne({_id: req.user.id}, function(err, _self){
    if(err){
      return done(err);
    }
    if (_self){
      User
      .find()
      .or([{_id: req.params.id}, {username: req.params.id}])
      .exec(function(err, user){
        user = user[0];
        if(err)
          done(err);
        if(!user)
          done(null, false);
        _self.unfollow(user, function(err, state){
          if (err)
            res.json({err: err});
          res.json(state);
        });
      });
    }
  });
});

router.get('/users/feed', function(req, res, done){
  if(req.user){
    var chirp_sources = req.user.following;
    chirp_sources.push(req.user._id);
    Chirp.find()
    .where('author').in(chirp_sources)
    .populate('author', 'username')
    .sort('-created_at')
    .exec(function(err, chirps){
      res.json(chirps);
    });
  }
  else
    res.json({err: 'This call is only available to authenticated users'});
});

module.exports = router;
