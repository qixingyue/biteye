;;;(function(){

hook.ext.hi = function(a,b,c){
    console.log(a,b,c);
    alert("Hi sample hook called from inside hook!");
}

hook.ext.control = function(c){

    c.hi_blank = function(){
        c.jsecho("<h4>Hi , traced from hook function !</h4>");
    }

    return c;

}

})();
