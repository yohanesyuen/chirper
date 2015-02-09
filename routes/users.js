var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Chirp = require('../models/chirp');

var renderUser = require('../utils/renderuser');

/* GET users listing. */
router.get('/',function(req, res){
  User.find(function(err, users){
    if (req.user)
      res.render('users', {logged_in_user: req.user, users: users});
    else
      res.render('users', {users: users});

  });
});

router.get('/:id', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user){
    if (!err && user){
      renderUser(req, res, {view: 'user', user: user});
    }
    else{
      User.findOne({username: req.params.id}, function(err, user){
        if (!err && user){
          Chirp.find({author: user.str_id}, function(err, chirps){
            user.chirpCount = chirps.length;
            renderUser(req, res, {view: 'user', user: user});
          });
        }
        else{
          res.redirect('/');
        }
      });
    }
  });
//  res.send('respond with a resource');
});

module.exports = router;
