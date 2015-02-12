var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Chirp = require('../models/chirp');

module.exports = function(passport){
  router.get('/', function(req, res) {
    var chirps = {};
    if(req.user){
      var chirp_sources = req.user.following;
      chirp_sources.push(req.user._id);
      Chirp.find()
      .where('author').in(chirp_sources)
      .populate('author')
      .sort('-created_at')
      .exec(function(err, chirps){
        res.render('index', {title:'Chirper', logged_in_user: req.user, chirps: chirps});
      });
    }
    else{
      res.render('index', {title: 'Chirper'});
    }
  });
  return router;
};
