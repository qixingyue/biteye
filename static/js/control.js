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

  ,infoPage:function(message){
       var tpl =  '<div class="alert alert-block alert-info">'
          + '<button type="button" class="close" data-dismiss="alert">'
          + '<i class="icon-remove"></i>'
          + '</button>'
          + '<i class="icon-ok green"></i>{message}'
        +'</div>';
        document.write(tplstr(tpl,{'message':message}))
  }

  ,bread:function(){
      var bread_item = function(n,m,a='about'){
          var params = {
              'name':n
                  ,'link':'?m=' + m + '&a=' + a
          };
          return tplstr('<li> <a href="{link}">{name}</a> </li>',params);
      }


      var module_link = app._queryArr['m'] || 'index';
      var module_name = config.modules[module_link].name;
      var action = app._queryArr['a'] || 'about';
      var action_name = config.modules[module_link].sub_menus[action];
      var html = '<ul class="breadcrumb">';
      html += '<li> <a href="/"><i class="fa fa-home fa-fw"></i> 首页</a> </li>';
      html += bread_item(module_name,module_link);
      html += bread_item(module_name,module_link,action_name);
      html += '</ul>';
      return html;
  }

};

window_export("control",control);
window_export("jsecho",control.jsecho);
window_export("tplstr",control.tplstr);

})();
