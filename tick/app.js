;;;(function(){

	var acters = {

		text_expire:function(_id,text,expire,class_ = 'mini'){
			if(!cache.have(_id)){
				var acter = $("<div alt='big world' class='item " + class_ + "'><div class='info'></div></div>")
				acter.find('.info').html(text);
				app.container.append(acter);
				cache.set(_id,acter);
				cache.gc.push(['_remove',_id,(new Date()).getTime() + expire * 1000 ])
			}
		}	

	};

	var cache = {
		keys:[]
		,set:function(k,v){
			this[k]	= v;
			if(this.keys.indexOf(k) == -1){
				this.keys.push(k);	
			}
		}	
		,get:function(k){
			return this[k];	
		}
		,have:function(k){
			return this[k] != null && this[k] != false;
		}
		,clear:function(){
			for(var i = 0 , l = this.keys.length ; i < l ; i++){
				this.set(this.keys[i],null);	
			}	
		}
	};

	var time_util = {
		range:function(_end,seconds){
			var end = dateFormat(_end,'yyyy-MM-dd hh:mm:ss');
			if(!cache.have('start')){
				_start = new Date();
				_start.setTime(_start.getTime() + seconds * 1000);
			} else {
				_start = cache.get('start');
			}
			cache.set('start',_end);
			from = dateFormat(_start,'yyyy-MM-dd hh:mm:ss');
		   	return [from,end];
		}
	};

	var make_params = function(time_range,query_){
		var params = {
			p:1
			,streams:1
			,limit:3000
			,query:query_
			,from:time_range[0]
			,to:time_range[1]
		};
		return params;
	}

	var config = {
		//配置，单位是秒
		items:[

			{
				container:'#tick'
				,title:'sslvpn 5分钟内的登陆用户'
				,live : 300 
				,name:'main',
				fresh: 60 ,
				fetch:{
					url:'/search/getdata/vpn_s_login',
					params:function(live){
						var time_range = time_util.range(new Date(),-live);
						return make_params(time_range,' (log_type:asg_user_log_login) ');
					}
				}
				,render:function(_x_data,config_item){
					var _x_username = _x_data.username;
					var _id = _x_data.token + _x_data.username;
					acters.text_expire(_id,_x_username + "</br>" + _x_data.log_time,config_item.live);
				}
			}

			,{
				container:'#tick'
				,title:'sslvpn 20秒内数据流量 '
				,live : 20
				,name:'byworld',
				fresh: 20 ,
				fetch:{
					url:'/search/getdata/vpn_s_traffic',
					params:function(live){
						var time_range = time_util.range(new Date(),-live);
						return make_params(time_range,'*');
					}
				}
				,render:function(_x_data,config_item){
					var text = _x_data.SrcIP + "</br>" + _x_data.dstIP + ":" + _x_data.dst_port;
					var _id = text;

					var regular_ports = [80,443];
					var class_ = "mini ";
					if(regular_ports.indexOf(Number(_x_data.dst_port)) == -1) {
						class_ += "red" ;
					}
					acters.text_expire(_id,text,config_item.live,class_);
				}
			}

		]
	};

	var hooks = {
	};


	var app = {

		container:false
		,goon:true

		,init:function(index){
			var me = this;

			var config_item = config.items[index];
			if(config_item == null) {
				return;	
			}

			me.container = $(config_item.container);
			me.container.find(".title").html(config_item.title);
			cache.gc = [];
			me.timers = [];
			me.named_timers = {};

			var timer = window.setTimeout(function(){
				me.fresh(config_item);	
			},10);
			me.named_timers[config_item.name + "_start"] = timer;

			var gc_timer = window.setInterval(function(){
				me.gc();
			},1000);	
			me.timers.push(gc_timer);
		}

		,fresh:function(config_item){
			var name = config_item['name'];
			var me = this;
			if(config_item['fetch'] != null){
				var _fetch= config_item['fetch'];
				net.load(_fetch.url,_fetch.params(config_item.live),function(data){
					me.shift_count(data.length);
					if(hooks[name] != null){
						data = hooks[name](data);
					}
					me.render(data,config_item);			
				});
			}
			if(me.goon){
				me.named_timers[config_item.name + "_next"] = window.setTimeout(function(){
					me.fresh(config_item);	
				},config_item.fresh * 1000);	
			}
		}

		,render:function(data,config_item){
			var me = this;
			for(var i = 0 , l = data.length ; i < l ; i++){
				var _x_data = data[i];
				config_item.render(_x_data,config_item);
			}
			if(me.container.find(".item").length == 0) {
				me.container.append("<div class='stay'>暂时没有数据</div>");	
			} else {
				me.container.find(".stay").remove();
			}
		}

		,gc:function(force=false){
			var me = this;
			if(cache.gc == null) return;
			var item_len = me.container.find(".item").length;
			for(var i = 0 , l = cache.gc.length ; i < l ; i++){
				if(cache.gc[i] == false) continue;
				var _x_now = new Date().getTime();
				if(_x_now >= cache.gc[i][2] || force){
					var _id = cache.gc[i][1];
						if(cache.have(_id)){
							cache.get(_id).remove();
							cache.set(_id,null);
							cache.gc[i] = false;
						}
				}
			}
		}

		,stop_timers:function(){
			if(app.timers != null) {
				for(var i = 0 , l = app.timers.length ; i < l ; i++){
					window.clearInterval(app.timers[i]);	
				}	
			}
			if(app.named_timers != null){
				for(var n in app.named_timers){
					window.clearTimeout(app.named_timers[n]);	
				}
			}
		}

		,reset:function(index = 0){
			var me = this;	
			me.stop_timers();
			me.gc(true);
			if(me.container != false) {
				me.container.find(".title").html("");
			}
			cache.clear();
			me.init(index);
			me.links_append();
		}

		,links_append:function(){
			var me = this;
			var links_span = "<span class='links'>";
			for(var i = 0 , l = config.items.length; i < l ; i++){
				links_span += "<span><a href='javascript:;' title='" + config.items[i].title +  "'>" + i + "</a></span>";
			}
			links_span += "</span>";
			me.container.find(".title").append(links_span);
			me.container.find(".links a").click(function(){
				var x_attr = $(this).html();
				me.reset(x_attr);
			});

			var settings_link = $('<a href="javascript:;" style="float:left;margin-left:15px;"><i class="fa fa-cogs fa-lg"></i></a>' );
			me.container.find(".title").append(settings_link);
			me.container.find(".title").append("<span class='recent_count' style='float:left;margin-left:15px;'>0,0,0,0</span>");
			me.count_list = [];
			settings_link.click(function(){
				console.log("filter options!" + new Date());	
			});
		}

		,shift_count:function(new_count){
			this.count_list.push(new_count);
			if(this.count_list.length > 10) {
				this.count_list.shift();
			}
			this.container.find(".recent_count").html(this.count_list.join(","));
		}

	};

	$(function(){
		app.reset(0);		
	});

	window.app = app;
	window.cache = cache ;

	window.tick = {
		'app':app,
		'cache':cache,
		'acters':acters
	};
		
})();
