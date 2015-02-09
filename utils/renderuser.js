var renderUser = function(req, res, params, done){
  if (typeof params === 'function'){
    done = params;
  }
  var data = {};
  if (params.user)
    data.user = params.user;
  var view = params.view;
  data.title = 'Chirper';
  if (req.isAuthenticated()){
    data.logged_in_user = req.user;
    if (typeof data.user === 'undefined')
      data.user = req.user;
    data.user['is_self'] = req.user.username === data.user.username ? true : false;
  }
  if (typeof data.user !== 'undefined') {
    if (typeof data.user.profile_pic === 'undefined')
      data.user.profile_pic = null;
    if (!data.user.profile_pic)
      data.user.profile_pic = 'https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120';
  }

  if (data.feed){
    var chirps = feed.chirps;
    data.chirps = chirps;
  }

  data.message = req.flash('message');
  res.render(view, data);
  if (typeof done === 'function')
    return done();
};

module.exports = renderUser;
