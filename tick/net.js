;;;(function(){

	var _net = {

		load:function(url,params,handler){
			$.post(url,params,function(data){
				var _total = data.data.total;
				handler && handler(data.data.data.data);	
			});
		}
	
	}	

	window.net = _net;
		
})();
