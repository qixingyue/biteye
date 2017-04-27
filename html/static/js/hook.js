;;;(function(){

/*
 * other code you can use hook function like this :
 * <hooks>/<htmlname>.js will be loaed even not exits .
 *
 * useful hooks :
 * hook.ext.control  define extension to control for a single page.
 *
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
        if(__hook_nopage == false) {
            var htmlname = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
            usejs('hooks/' + htmlname.replace(".html",""));
        }
    }

    ,ext:{}

};

hook._init();
window_export('hook',hook); 
})();
