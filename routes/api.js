var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');
var utils = require('../utils');

router.use(utils.ensureAuthenticated);

router.get('/follow/:id', function(req, res, done){
  User.findOne({_id: req.user.id}, function(err, _self){
    if(err){
      return done(err);
    }
    if (_self) {
      User.findOne({username: req.params.id}, function(err, _target){
        if(err){
          return done(err);
        }
        if (_target){
          _self.following.remove(_target._id);
          _self.following.push(_target._id);
          _target.followers.remove(_self._id);
          _target.followers.push(_self._id);
          _self.save();
          _target.save();
          res.json({new_state: 'following'});
        }
        else{
          User.findOne({_id: req.params.id}, function(err, _target){
            if(err){
              return done(err);
            }
            if (_target){
              _self.following.remove(_target._id);
              _self.following.push(_target._id);
              _target.followers.remove(_self._id);
              _target.followers.push(_self._id);
              _self.save();
              _target.save();
              res.json({new_state: 'following'});
            }
          });
        }
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
      User.findOne({username: req.params.id}, function(err, _target){
        if(err){
          return done(err);
        }
        if (_target){
          _target = _target;
          _self.following.remove(_target._id);
          _target.followers.remove(_self._id);
          _self.save();
          _target.save();
          res.json({new_state: 'not-following'});
        }
        else{
          User.findOne({_id: req.params.id}, function(err, _target){
            if(err){
              return done(err);
            }
            if (_target){
              _self.following.remove(_target._id);
              _target.followers.remove(_self._id);
              _self.save();
              _target.save();
              res.json({new_state: 'not-following'});
            }
          });
        }
      });
    }
  });
});

module.exports = router;
