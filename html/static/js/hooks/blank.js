;;;(function(){

hook.ext.hi = function(a,b,c){
    console.log(a,b,c);
    alert("Hi sample hook called from inside hook!");
}

hook.ext.control = function(c){

    c.hi_blank = function(){
        var types = ['success','info','warning','danger'];
        for(var t in types){
            c.simplePanel("Hi , traced from hook function !",types[t]);
        }

        var  types = ['default','primary','success','info','warning','danger'];
        for(var t in types){
            c.simpleLabel(' Find The Big World ! ',types[t]);
        }
    }

    return c;

}

})();
