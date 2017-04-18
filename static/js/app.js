;;(function(){

var app = {

  _module:null
  ,_action:null
  ,_page_id:null
  ,_queryArr:[]
  ,_pageConfig:[]
  ,search:function(){
    return window.location.search; 
  }

  ,queryArr:function(){
      var u = location.search.substr(1);
      if(u == ""){
        return {};  
      } else {
        var arr = {};
        var items = u.split("&");
        for(var i in items){
          var kv = items[i].split("=");
          arr[kv[0]] = kv[1];
        }
        return arr;
      }  
  }

  ,init:function(){
      if(this.endwith(location.pathname,"basic.html")) {
        this._queryArr = this.queryArr();
        this._module = this._queryArr['m'] || 'index';
        this._action = this._queryArr['a'] || 'about';
        this._page_id = this._module + '_V_' + this._action;
        this._pageConfig = config.page_config[this._page_id] || { type:'info', message:config.default_message};
      }
  }

  ,logout:function(){
      app.cookie.remove("token");
      location.href = "login.html";  
  }

  ,endwith:function(str,tail){
      return str.substr(-tail.length)  == tail;
  }

  ,lazyLoad:function(src,onLoadFn){
      var script = document.createElement('script'); 
      script.src = src;
      script.onload = onLoadFn;
      document.body.appendChild(script);
  }
  ,post(url,data,fnHandler){
      var me = this;
      $.ajax({
        type:'POST'
        ,url:url
        ,data:data
        ,success:me._preAjaxHandler(fnHandler)
      });
  }
  ,get(url,fnHandler){
      var me = this;
      $.ajax({
        type:'GET'
        ,url:url
        ,success:me._preAjaxHandler(fnHandler)
      });
  }
  ,_preAjaxHandler:function(okHandler){
      var realHanlder = function(message){
          var result = $.parseJSON(message);
          if(result.success) {
               okHandler(result.data);
          } else {
              app.ajaxErrorHandler(result.message); 
          }
      }
      return realHanlder;
  }
  ,ajaxErrorHandler:function(message){
      console.error("ajax error Happend ! Message Is : " + message);
  }
  ,simpleTrace:function(message){
      console.log(message); 
  }

  ,cookie:{

      set:function(name,value,seconds=300,path='/'){
          var exp = new Date();
          exp.setTime(exp.getTime() + seconds * 1000);
          document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ';path='+path;
      }

      ,get:function(name){
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
          if(arr=document.cookie.match(reg)){
              return unescape(arr[2]);
          }else{
              return null;
          }
      }

      ,remove:function(name){
          return this.set(name,null,-1000);
      }
  
  }

};
app.init();

window_export("app",app);
})();
