;;;(function(){

/*
 * some html document.write and then add handler
 */
var control = {

   _toggle:false

  ,jsecho:function(message,params = false){
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

  ,toggleLeftMenu:function(){
      var html = '<li><a href="javascript:;" id="toggleLeftMenu"> <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span> </a> </li>';
      this.jsecho(html); 
      $("#toggleLeftMenu").click(control._toggleNav);
  }

  ,_toggleNav:function(){

      if(this._toggle){
          $("div.sidebar").animate({"width":"150px","padding":"10px"});
          $("div.main").animate({"margin-left":"120px","padding-left":"40px"});
      }else{
          $("div.sidebar").animate({"width":"0px","padding":"0px"});
          $("div.main").animate({"margin-left":"0px","padding-left":"20px"});
      }

      this._toggle = ! this._toggle;

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
        jsecho(tpl,{'message':message});
  }

  ,form_item:function(config){
      switch(config.type){

          case 'txt':
              return '<input class="form-control m5" type="text" name="' + config.name 
                  + '" placeholder = "' + config.placeholder + '"/>';
          case 'datetime':
              var dvalue = (config.dvalue != null) ? app.time.after(config.dvalue) : app.time.now();
              return '<input class="form-control m5 datetime" type="text" name="' + config.name 
                  + '" placeholder = "' + config.placeholder + '" value="' + dvalue + '"/>';
          case 'textarea':
              var dvalue = (config.dvalue != null) ? config.dvalue : '';
              var params = {
                name:config.name,
                value:dvalue,
                height:( config.height || 120 )
              };
              var tpl = '<textarea class="form-control" name="{name}" style="height:{height}px">{value}</textarea>';
              return tplstr(tpl,params);
          case 'select':
              var tpl = '<select class="form-control" name="{name}">{options}</select>';
              var item_tpl = '<option value="{value}">{text}</option>';
              var item_html = '';
              for(var k in  config.items){
                  var p = {
                     value:k,
                     text:config.items[k] 
                  };
                  item_html += tplstr(item_tpl,p); 
              }
              var params = {
                 name:config.name
                 ,options:item_html
              }
              return tplstr(tpl,params);
          
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
      jsecho(html);
  }

  ,createPage:function(forms,api='',method='post'){
      var me = this;
      var params = {
          'action' : api
          ,'method':method
      };

      var html = '<form class="form-horizontal mform" action="{action}" method="{method}">{fields}{submit}</form>';

      var fields_html = '';
      for(var i = 0 , j = forms.length ; i < j ; i++){
          var tpl = '<div class="form-group"> '
                + '<label class="col-sm-2  control-label" for="id-domain">{label}</label> '
                + '<div class="col-sm-6"> {control}</div> '
                + '<div class="col-sm-2 "> </div> '
                + '</div>';
          var params = {
            'label':forms[i].label,
            'control':me.form_item(forms[i])
          };
          fields_html += tplstr(tpl,params);
      }
      params['fields'] = fields_html;
      var submit_html = '<div class="form-group"> <div class="col-sm-offset-2 col-sm-4"> <button type="submit" class="btn btn-primary">添加</button> <button type="reset" class="btn">重置</button> </div> </div>';
      params['submit'] = submit_html;

      jsecho(html,params);
  }

  ,createCharts:function(charts){

      var charts_html = "";
      var later_js = [];

      for(var i = 0 , j = charts.length ; i < j ; i++){
          var item = charts[i];
          var url = item.api;
          var type = item.type;
          var _id = app.id();
          var params = {
                width: item.width || 528
                ,height: item.height || 400
                ,id:_id
          };
          charts_html += tplstr("<div id='{id}' class='chart_item' style='width:{width}px;height:{height}px'></div>",params);
          var renderHandler = function(config,id){

              return function(){
                  var _item = config;
                  var _id = id;
                  var _title = config.title || 'biteye chart ';
                  var _name = config.name || 'name'
                  net.loadChart(_item.api,{ok:function(x_data){
                      var xx_data = x_data.data;
                      switch(_item.type) {
                          case 'line':
                          case 'bar':
                          case 'scatter':
                            var data = {
                                title:_title,
                                showx:xx_data.showx,
                                ydata:xx_data.ydata
                            }
                            var m = 'create' + _item.type.upperFirst() ;
                            chart[m](_id,data);
                            break;
                          case 'pie':
                            var data = {
                                title:_title,
                                name:_name,
                                ydata:xx_data.ydata
                            }
                            chart.createPie(_id,data);
                      }
                  }});
              }
          
          }
          later_js.push(renderHandler(item,_id));
      }
      
      document.write(charts_html);
      for(var i = 0 , j = later_js.length; i < j ; i++){
          var fn = later_js[i];
          fn();
      }
  
  }

  ,showData:function(data,config){
      $("#dataShow").html("");
      var data = data || [];
      var table_html = '<table class="table table-striped table-hover table-condensed "><thead><th>ID</th>';
      for(var i in config.leg){
          var l = config.leg[i];
          table_html += '<th>' + l +'</th>';
      }
      table_html += '</thead>';
      for(var i = 0 , j = data.length ; i < j ; i++ ){
          var item = data[i];
          table_html += '<tr><td>' + (i+1) + '</td>';
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
      jsecho(html);
  }

  ,loginUser:function(){
      jsecho(app.cookie.get("user"));
  }

  ,hello_world:function(app){
      var params = {
        'app': (app || config.appname)
      }
      this.jsecho('<h2>Hello , Welcome use {app}</h2>',params);
  }

  // type ['success','info','warning','danger'];
  ,simplePanel:function(message,type='info'){
      var params = {
         message:message 
         ,type:type
      };
      this.jsecho('<div class="alert alert-{type}" role="alert">{message}</div>',params);
  }

  // type : ['default','primary','success','info','warning','Danger']
  ,simpleLabel:function(text,type='default'){
      var params = {
         text:text 
         ,type:type
      }
      this.jsecho('<span class="label label-{type}">{text}</span>',params);
  }


  ,dropZone:function(url,message,sub_message,token = ''){
      
      var id = app.id();
      var tpl = '<form method="post" action="{url}" class="dropzone needsclick dz-clickable" id="{id}" enctype="multipart/form-data">'
          + '<div class="dz-message needsclick">'
          + '<span class="shaddow">{message}</span><br>'
          + '<p class="note needsclick shaddow">({sub_message})</p>'
          + '<input type="hidden" name="token" value="{token}"/>'
          + '</div>'
          + '</form>';
      var params = {
          url:url,
          id:id,
          message:message,
          sub_message:sub_message,
          token:token
      }
      this.jsecho(tpl,params);
  }

  ,items_render:function(items,tpl,split="",pre="",post="") {
      var h = pre;
      for(var ii = 0 , jj = items.length; ii < jj ; ii++) {
          h += tpl.tpl(items[ii]) + split; 
      }
      h = h.substring(0,h.length - split.length);
      h += post;
      this.jsecho(h);
  }

  ,hifooter:function(message){
      var year = (new Date()).getYear() + 1900;
      var message = message.tpl({"year":year});
      this.jsecho('<footer class="clearfix"> <p class="pull-right">{message}</p> </footer>',{message:message}); 
  }

  ,markdown:function(md_text){
      if(window['markdown']){
        this.jsecho(markdown.toHTML(md_text));  
      } else {
      }
  }

};

if(window['hook'] && hook != null && hook.ext != null && hook.ext.control != null){
    control = hook.ext.control(control);
}


window_export("control",control);
window_export("jsecho",control.jsecho);
window_export("tplstr",control.tplstr);

})();
