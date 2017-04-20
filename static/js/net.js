;;;(function(){

var net = {

    login:function(u,p,handlers = {}){
        var url = config.api.login;
        app.post(url,{u:u,p:p},function(data){
            var login_ok_handler = handlers.ok || function(){};
            var login_failed_handler = handlers.bad|| function(data){
                console.log(data);
                alert(data.message);
            };
            if(data.login == true){
                login_ok_handler(data); 
            } else {
                login_failed_handler(data);
            }
        });
    }

    ,querySample:function(config,params,handlers){
        app.post(config.api,params,function(data){
            var postQuery = handlers.ok || function(){};
            var bad_handler = handlers.bad|| function(data){
                console.log(data);
                alert(data.message);
            };
            if(data.have == true){
                postQuery(data); 
            } else {
                bad_handler(data);
            }

        });
    }

};

window_export("net",net);

})();
