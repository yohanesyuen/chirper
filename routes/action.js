var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');

var follow = function(self, target){
  User.findOne({_id: self._id}, function(err, _self){
    if (_self && !err) {
      User.findOne({_id: target}, function(err, _target){
        if (!err && _target){
          _target = _target;
          _self.following.remove(_target._id);
          _self.following.push(_target._id);
          _target.followers.remove(_self._id);
          _target.followers.push(_self._id);
          _self.save();
          _target.save();
        }

      });
    }
  });
};


var unfollow = function(self, target){
  User.findOne({_id: self._id}, function(err, _self){
    if (_self && !err) {
      User.findOne({_id: target}, function(err, _target){
        if (!err && _target){
          _target = _target;
          _self.following.remove(_target._id);
          _target.followers.remove(_self._id);
          _self.save();
          _target.save();
        }

      });
    }
  });
};

router.post('/', function(req, res){
//  console.log(req.body);
  var action = req.body.action;
  params = req.body.params;
  if (action === 'follow')
    follow(req.user, params);
  if (action === 'unfollow')
    unfollow(req.user, params);
  res.redirect('/users/'+params);
});
module.exports = router;
