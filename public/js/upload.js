var upload = function(url, params){
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
  console.log('POST: ' + params);
  xhr.send(params);
};

var chirp = function(contents) {
  var params = '';
  params += 'content=';
  params += contents;
  upload('/upload', params);
};

$('.chirp-btn').click(function(){
  var contents = $('.chirp-content').val();
  chirp(contents);
});

window.upload = upload;
