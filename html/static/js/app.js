;;(function(){

/***
 *
 * some useful function about url,
 * parse querystring and so on.
 *
 * id gettter.
 * _module querystring m value , default index
 * _action querystring a value , default about
 * _pageConfig have page config content , valued by <module>V<action>
 *
 * logout wherever you are call this can logout clear cookie .
 * endwith if string endwith some substr
 * lazyLoad load script by js after load execute some function
 *
 * post get _preAjaxHandler ajax wrapper method
 *
 * cookie function cookie.get cookie.set cookie.remove
 *
 * time function now after formate
 *
 */
var app = {

  _id:1
  ,_module:null
  ,_action:null
  ,_page_id:null
  ,_htmlname:null
  ,_queryArr:[]
  ,_pageConfig:[]
  ,search:function(){
    return window.location.search; 
  }

  ,id:function(){
       return "autoid_" + ( this._id++ ); 
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
        this._queryArr = this.queryArr();
        this._module = this._queryArr['m'] || 'index';
        this._action = this._queryArr['a'] || 'about';
        this._page_id = this._module + '_V_' + this._action;
        this._pageConfig = config.page_config[this._page_id] || { type:'info', message:config.default_message};
        this._htmlname = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
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

  ,onPageLoad:function(){
      if($.fn.jeDate != null) {
          $("input.datetime").jeDate(); 
      }
  }

  ,time:{

      now:function(){
          var n = new Date(); 
          return this.formate(n);
      }

      ,after:function(mi,returnString=true){
          var r = /(-?)(\d+)([a-z]+)/;
          var items = mi.match(r);
          var number = items[2];
          var diff = 1;
          switch(items[3]){
              case 'day':
                  diff = 86400;
                  break;
              case 'minute':
                  diff = 60;
                  break;
              case 'hour':
                  diff = 3600;
                  break;
              case 'week':
                  diff = 604800;
                  break;
          }
          var x = diff * number * 1000;
          if(items[1] == '-'){
              x = -x;
          } 

          var n = new Date();
          n.setTime(n.getTime() + x);
          if(returnString){
              return this.formate(n);
          }else {
              return n; 
          }
          
      }

     ,formate:function(d,fmt = "yyyy-MM-dd hh:mm:ss"){
         var o = {
             "M+": d.getMonth() + 1, 
             "d+": d.getDate(),
             "h+": d.getHours(),
             "m+": d.getMinutes(), 
             "s+": d.getSeconds(),
             "q+": Math.floor((d.getMonth() + 3) / 3),
             "S": d.getMilliseconds()
         };
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
         for (var k in o)
             if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         return fmt;
     }
  
  }

  ,setPageTitle:function(t){
    var title_dom = document.getElementsByTagName('title')[0];
    if  (title_dom){
      var o_title = t.replace("{appname}",config.appname);
      title_dom.innerHTML = o_title;
    }
  }

};

app.init();
window_export("app",app);
})();
