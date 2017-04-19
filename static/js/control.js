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
        if(m == 'index') continue;
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

  ,form_item:function(config){
      switch(config.type){

          case 'txt':
              return '<input class="form-control m5" type="text" name="' + config.name 
                  + '" placeholder = "' + config.placeholder + '"/>';
                  
          
      }
  }

  ,queryPage:function(forms){
      var me = this;
      var html = ' <div id="search_panel" class="well well-sm content-filter"> <form id="sForm" action="" method="" class="form-inline" name="form" id="form">'; 

      for(var i = 0 , j = forms.length ; i < j ; i++){
          html += me.form_item(forms[i]) ;
      }

      html += '<button id="submit" type="button" class="btn btn-sm btn-success" >搜索</button>';
      html += '</form></div>';
      var blankTable = '<div id="dataShow"></div>';
      html += blankTable;
      document.write(html);
  }

  ,showData:function(data,config){
      $("#dataShow").html("");
      var data = data || [];
      var table_html = '<table class="table table-striped table-hover table-condensed "><thead>';
      for(var i in config.leg){
          var l = config.leg[i];
          table_html += '<th>' + l +'</th>';
      }
      table_html += '</thead>';
      for(var i = 0 , j = data.length ; i < j ; i++ ){
          var item = data[i];
          table_html += '<tr>';
          for(var m in config.leg){
              var l = config.leg[m];
              table_html += '<td>' + item[l] +'</td>';
          }
          table_html += '</tr>';
      }
      // debugger;
      table_html += '</table>';
      $("#dataShow").html(table_html);
      $("#dataShow table").dataTable();
      
      
  }

  ,bread:function(){
      var bread_item = function(n,m,a='about'){
          if(n == null){
            return ''; 
          }
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
      html += '<li> <a href="' + config.home_page + '"><i class="fa fa-home fa-fw"></i> 首页</a> </li>';
      html += bread_item(module_name,module_link);
      html += bread_item(action_name,module_link,action);
      html += '</ul>';
      document.write(html);
  }

  ,loginUser:function(){
      document.write(app.cookie.get("user"));
  }

};

window_export("control",control);
window_export("jsecho",control.jsecho);
window_export("tplstr",control.tplstr);

})();
