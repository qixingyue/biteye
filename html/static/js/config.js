;(function(){

var api_prefis = 'http://localhost:8080/';

var wrapper = function(u){
    return api_prefis + u;
}

var config = {
  appname:'biteye'
  ,api:{
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
             ,charts:'图表' 
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
            {type:'datetime', name:'from',placeholder:'开始时间',dvalue:'-3day'}
            ,{ type:'txt', name:'name',placeholder:'name' }
            ,{ type:'txt', name:'value',placeholder:'value' }
          ]
          ,leg:['name','user','value','time']
          ,api:wrapper('sample/query')
      }
      ,sample_V_create:{
          type:'create'
          ,forms:[
            {type:'txt',name:'name',dvalue:'',label:'名称:',placeholder:''} 
            ,{type:'txt',name:'value',dvalue:'',label:'值:',placeholder:''} 
            ,{type:'datetime',name:'time',dvalue:'-3day',label:'创建日期:',placeholder:''} 
            ,{type:'textarea',name:'description',dvalue:'',label:'简单描述:',placeholder:''} 
            ,{type:'select',name:'sel_type',dvalue:'',label:'选择框:',items:{'A':'选项1','B':'选项2'}} 
          ]
          ,submitBack:'?m=sample&a=query'
      }
      ,sample_V_charts:{
          type:'charts'
          ,charts:[
            {type:'pie',api:wrapper('data/pie')}
            ,{type:'line',api:wrapper('data/line')}
            ,{type:'bar',api:wrapper('data/bar')}
            ,{type:'scatter',api:wrapper('data/point')}
          ]
      }
  }
  ,home_page:'?m=index&a=about'
  ,default_message:'Hello world, Keep Calm And Carry On!'
};

window_export("config",config);





})();
