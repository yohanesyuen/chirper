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
          _self.follow(_target, function(err, state){
            if (err)
              res.json({err: err});
            res.json(state);
          });
        }
        else{
          User.findOne({_id: req.params.id}, function(err, _target){
            if(err){
              return done(err);
            }
            if (_target){
              _self.follow(_target, function(err, state){
                if (err)
                  res.json({err: err});
                res.json(state);
              });
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
          _self.unfollow(_target, function(err, state){
            if (err)
              res.json({err: err});
            res.json(state);
          });
        }
        else{
          User.findOne({_id: req.params.id}, function(err, _target){
            if(err){
              return done(err);
            }
            if (_target){
              _self.unfollow(_target, function(err, state){
                if (err)
                  res.json({err: err});
                res.json(state);
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
