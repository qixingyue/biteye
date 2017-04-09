;;(function(){

window.window_export = function(name,fn){
  window[name] = fn;
};


var config = {
  'api':{
      'login':'/api/login.json'
  }
};

var loaded_js = {} , loaded_css = {};

window_export('config',config);

window_export('usejs',function( names , is_theme = false){
  var path = '/static/js/';
  if(is_theme){
    path = '/static/bootstrap/js/';
  }
  if(typeof names == "string"){
    names = names.split("|");
  } 
  for(var index in names){
    var name = names[index];
    if(name in loaded_js && loaded_js[name] == is_theme) {
      document.write('');  
    } else {
        document.write('<script type="text/javascript" src="' + path + name + '.js"></script>');
        loaded_js[name] = is_theme;
    }
  }
});

window_export('usecss',function( names , is_theme = false){
  var path = '/static/css/';
  if(is_theme){
    path = '/static/bootstrap/css/';
  }
  if(typeof names == "string"){
    names = names.split("|");
  } 
  for(var index in names){
    var name = names[index];
    if(name in loaded_css && loaded_css[name] == is_theme) {
      document.write('');  
    } else {
        document.write('<link href="' + path + name +'.css" rel="stylesheet"> ');
        loaded_css[name] = is_theme;
    }
  }
});

})();
