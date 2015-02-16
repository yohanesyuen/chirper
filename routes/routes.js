var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Chirp = require('../models/chirp');

var isAuthenticated = function(req, res, next){
  if (typeof req.isAuthenticated === 'function') {
    if (req.isAuthenticated())
      return next();
    else
      res.redirect('/');
  }
  else
    res.redirect('/');
};

var renderUser = require('../utils/renderuser');

module.exports = function(passport) {
  /* index route */
  router.use('/', require('./index')(passport));

  router.use('/action', require('./action'));

  router.use('/api', require('./api'));

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  }));

  router.get('/signup',function(req, res) {
    renderUser(req, res, {view: 'signup'});
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.use('/users', require('./users'));

  router.use('/upload', require('./upload'));

  return router;
};
