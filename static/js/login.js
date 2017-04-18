;;;(function(){

var login = {

  init:function(){
     var realLogin = function(){
         var u = $("input[name=email]").val();
         var p = $("input[name=password]").val();
         net.login(u,p,{ok:function(data){
            app.cookie.set("token",data.token,1800);
            app.cookie.set("user",u ,1800);
            window.location.href = "basic.html"; 
         }}); 
         return false;
     };
     $("#login").click(realLogin);
     $("input[name=password]").keyup(function(e){
         if(e.keyCode == 13){
            realLogin(); 
         }
     });
  }

};

$(function(){
    login.init();
});

})();
