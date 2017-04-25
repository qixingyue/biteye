;;;(function(){

hook.ext.hi = function(a,b,c){
    console.log(a,b,c);
    alert("Hi sample hook called from inside hook!");
}

hook.ext.control = function(c){

    c.hi = function(){
       console.log(c) ;
    }

    return c;

}

})();
