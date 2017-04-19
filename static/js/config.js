;(function(){

var api_prefis = 'http://localhost:8080/';

var wrapper = function(u){
    return api_prefis + u;
}

var config = {
  api:{
      'login':wrapper('api/login')
  }
  ,modules:{
      index:{
          sub_menus:{
            about:'关于' 
          } 
      }
      ,sample:{
          name:'实例'
          ,sub_menus:{
             query:'查看' 
             ,create:'创建' 
          }
      }
      ,settings:{
        name:'设置',
        sub_menus:{
          about:'关于'
        }
      }
  }
  ,page_config:{
      index_V_about:{
         type:'info',
         message:'欢迎使用biteye系统，这是一个数据可视化界面部分!'
      }
      ,sample_V_query:{
          type:'query'
          ,forms:[
            { type:'txt', name:'name',placeholder:'name' }
            ,{ type:'txt', name:'value',placeholder:'value' }
          ]
          ,leg:['name','value']
          ,api:wrapper('sample/query')
      }
      ,sample_V_create:{
          type:'create'
          ,forms:[]
          ,submitBack:'?m=sample&a=query'
      }
  }
  ,home_page:'?m=index&a=about'
  ,default_message:'Hello world, Keep Calm And Carry On!'
};

window_export("config",config);

})();
