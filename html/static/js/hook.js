;;;(function(){

/*
 * other code you can use hook function like this :
 * hook.filter(<hook_name>,a,b,c...)
 * then hook.ext[hook_name] will be called if it is defined 
 * hook ext can be defined in other files default in the hooks folder , 
 * by usejs in _init function , that can be brought in .
 */
var hook = {

    arguments_arr:function(o_arr,skip=0){
        var m = [];
        for(var i = skip , j = o_arr.length ; i < j ; i++){
            m.push(o_arr[i]); 
        }
        return m;
    }

    ,_read_me:'hook function called!'

    ,_init:function(){
        var htmlname = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
        usejs('hooks/' + htmlname.replace(".html",""));
    }

    ,filter:function(name){
        if(this.ext[name] == null){
            return name; 
        }
        return this.ext[name].apply(this,this.arguments_arr(arguments,1));
    }
    
    ,ext:{}

};

hook._init();
window_export('hook',hook); 
})();
