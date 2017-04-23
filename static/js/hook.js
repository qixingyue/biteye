;;;(function(){

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
        usejs('hooks/sample');
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
