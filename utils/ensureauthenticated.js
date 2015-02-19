var ensureAuthenticated = function(req, res, next){
  if (typeof req.isAuthenticated === 'function'){
    if (req.isAuthenticated())
      return next();
    else
      res.redirect('/');
  }
  else
    res.redirect('/');
};

module.exports = ensureAuthenticated;
