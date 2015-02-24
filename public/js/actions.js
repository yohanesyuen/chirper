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

actions.get = function(url, params, callback){
  var xhr = new XMLHttpRequest();

  url += params;

  xhr.onreadystatechange=function()
  {
    if (xhr.readyState==4 && xhr.status==200)
    {
      callback(JSON.parse(xhr.responseText));
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
};

actions.follow = function(id, callback){
  this.get('/api/follow/', id, callback);
};

actions.unfollow = function(id, callback){
  this.get('/api/unfollow/', id, callback);
};

window.actions = actions;
