;;(function(){

var basic = {

  init:function(){

  }
  ,onLoad:function(){
      $("#logout").click(app.logout);
  }

  ,pageContent:function(){
      var page_config = app._pageConfig;
      //渲染页面的方法,renderPage+type
      var f = this.getPageRenderMethod(page_config.type);
      if(f){
           f(page_config,this);
      }
      
  }

  ,getPageRenderMethod(type){
      var m = 'renderPage' + type;
      if(this[m]){
        return this[m]; 
      }
  }

  ,renderPageinfo(config,me){
      control.infoPage(config.message); 
  }

  ,filterParams:function(params,config){
    return params; 
  }

  ,renderPagequery(config,me){
      control.queryPage(config.forms);
      $('#submit').click(function(){
          var params = {};
          $("#sForm input").each(function(){
              var name = $(this).attr("name");
              params[name]  = $(this).val();
          });
          params = me.filterParams(params,config);
          console.log(params);
          net.querySample(config,params,{ok:function(data){
              control.showData(data.data,config);
          }});
      });
  }
  ,renderPagecreate(config){
  
  }

};
 
if(app.cookie.get("token") == null){
    window.location.href = "login.html";
    app.logined = false;
} else {
    basic.init();
    $(basic.onLoad)
    window_export('basic',basic);
}


})();
