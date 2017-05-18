;;(function(){

String.prototype.tpl = function(params){
    params = params || {};
    var str = this;
    for(name in params){
        str = str.replace('{' + name + '}',params[name]);
    } 
    return str;
};

String.prototype.upperFirst = function(num=1){
    var xf = this.substr(0,num);
    xf = xf.toUpperCase();
    return xf + this.substr(num);
};

function endn(s){
    s = s || "";
    return s + "\n";
}

function endnn(s){
    s = s || "";
    return s + "\n\n";
}

function extend(obj,ext){
    for(var k in ext){
        obj[k] = ext[k];
    }
}

window.window_export = function(name,fn){
  window[name] = fn;
  if(fn != null && fn.onPageLoad != null){
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

window_export('__hook_nopage',false);

//html can use hook_nopage will not autoload hook js
window_export('usejs',function( names , is_theme = false){
  var path = spath('js/',is_theme);
  if(typeof names == "string"){
    names = names.split("|");
  } 
  for(var index in names){
    var name = names[index];
    if(name == 'hook_nopage') {
        name = 'hook' ;
        window_export('__hook_nopage',true);
    }
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

window_export('extend',extend);
window_export('endn',endn);
window_export('endnn',endn);

})();
