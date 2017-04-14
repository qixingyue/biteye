;(function(){

var config = {
  api:{
      'login':'/api/login.json'
  }
  ,modules:{
      index:{
        name:'首页',
        sub_menus:{
          about:'关于'
        }
      },
      second:{
        name:'设置',
        sub_menus:{
          about:'关于'
        }
      },

  }
};

window_export("config",config);
})();
