;;(function(){

var app = {

  _queryArr:[]
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
      this._queryArr = this.queryArr();
  }

  ,logout:function(){
      location.href = "login.html";  
  }

};
app.init();

window_export("app",app);
})();
