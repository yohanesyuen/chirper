actions = {};

actions.post = function(url, params){
  var xhr = new XMLHttpRequest();
  if (typeof params === 'undefined'){
    params = url;
    url = '/action';
  }
  else {
    url = url;
    params = params;
  }

  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//  xhr.setRequestHeader("Content-length", params.length);
//  xhr.setRequestHeader("Connection", "close");
  console.log('POST: ' + params);
  xhr.send(params);
};

actions.follow = function(id){
  var param = '';
  param += "action=follow";
  param += "&params=" + id;
  console.log(param);
  this.post(param);
};

actions.unfollow = function(id){
  var param = '';
  param += "action=unfollow";
  param += "&params=" + id;
  console.log(param);
  this.post(param);
};

window.actions = actions;
