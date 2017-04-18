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
           f(page_config);
      }
      
  }

  ,getPageRenderMethod(type){
      var m = 'renderPage' + type;
      if(this[m]){
        return this[m]; 
      }
  }

  ,renderPageinfo(config){
    control.infoPage(config.message); 
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
