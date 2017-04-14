;;;(function(){

var control = {

  jsecho:function(message,params = false){
    params = params || [];
    document.write(this.tplstr(message,params));  
  }

  ,tplstr:function(str,params){
    for(name in params){
      str = str.replace('{' + name + '}',params[name]);
    } 
    return str;
  }

  ,jsimage:function(name){
      jsecho('<image src="' + static_root + 'img/' + name + '"/>');
  }

  ,module_menu:function(){
      var module = app._queryArr['m'] || 'index';
      for(var m in config.modules){
        var params = {
          name:m,
          text:config.modules[m].name,
          cssclass: module == m ? 'active' : ''
        };
        //jsecho("<li class='{cssclass}'><a href='?m={name}'><span class='fa fa-th-large fa-fw'></span> {text}</a></li>",params);
        jsecho("<li class='{cssclass}'><a href='?m={name}'>{text}</a></li>",params);
      }
  }
  
  ,left_menu:function(){
      var module = app._queryArr['m'] || 'index';
      var action = app._queryArr['a'] || 'about';
      var moduel_config = config.modules[module];
      for(var k in moduel_config.sub_menus){
          var params = {
              text : moduel_config.sub_menus[k],
              cssclass : k == action ? 'active' : '',
              name:module,
              action:k
          };
          jsecho('<li class="{cssclass}"><a href="?m={name}&a={action}"><span class="fa fa-th-large fa-fw"></span>  {text}</a></li>',params);
      
      }
  }

};

window_export("control",control);
window_export("jsecho",control.jsecho);
window_export("tplstr",control.tplstr);

})();
