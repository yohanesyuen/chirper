var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');
var utils = require('../utils');

router.get('/follow/:id', utils.ensureAuthenticated, function(req, res, done){
  User.findOne({_id: req.user.id}, function(err, _self){
    if (_self && !err) {
      User.findOne({_id: req.params.id}, function(err, _target){
        if (!err && _target){
          _self.following.remove(_target._id);
          _self.following.push(_target._id);
          _target.followers.remove(_self._id);
          _target.followers.push(_self._id);
          _self.save();
          _target.save();
          res.json({new_state: 'following'});
        }
        else
          done(err);
      });
    }
    else
      done(err);
  });
});

router.get('/unfollow/:id', utils.ensureAuthenticated, function(req, res, done){
  User.findOne({_id: req.user.id}, function(err, _self){
    if (_self && !err){
      User.findOne({_id: req.params.id}, function(err, _target){
        if (_target && !err){
          _target = _target;
          _self.following.remove(_target._id);
          _target.followers.remove(_self._id);
          _self.save();
          _target.save();
          res.json({new_state: 'not-following'});
        }
        else
          done(err);
      });
    }
    else
      done(err);
  });
});

router.get('/users/:username', function(req, res, done){
  User.findOne({username: req.params.username}, function(err, user){
    if(user && !err) {
      res.json(user);
    }
    else
      done(err);
  });
});

module.exports = router;
