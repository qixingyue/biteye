;;(function(){

window.window_export = function(name,fn){
  window[name] = fn;
  if(fn.onPageLoad != null){
    $(fn.onPageLoad); 
  }
};

function spath(type,is_theme=false){
  var path = static_root + type;
  if(is_theme){
    path = static_root + 'bootstrap/' + type;
  }
  return path;
}

var loaded_js = {} , loaded_css = {};
static_root = '../static/';

window_export('usejs',function( names , is_theme = false){
  var path = spath('js/',is_theme);
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
  var path = spath('css/',is_theme);
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

window_export('static_dir',function(static_dir){
  static_root = static_dir;
});

})();
