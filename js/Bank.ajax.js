// Ajax模块
(function(window){
	var edition = "1.1.0";
	Bank.ajax = function(obj){
		var initial = {
			url:"#",
			type:"get",
			data:{},
			dataType:"text",
			async:true,
			jsonp:"callback",
			success:function(data){console.log(data);}
		};
		for(var k in obj){
			initial[k] = obj[k];
		};
		// 处理数据
		var dump = "";
		for( var v in initial.data){
			dump += v + "=" + initial.data[v] + "&";
		};
		dump = dump.substring(0,dump.length-1);
		dump = encodeURI(dump);
		// 处理jsonp跨域请求
		if(inital.dataType === "jsonp"){
			var cd = "Bankjs" + (edition + Matc.random()).replace(/\D/g,"") + (new Data().getTime());
			if(inital.jsonpcallback){
				cd = inital.jsonpcallback;
			};
			window[cd] = function(data){
				inital.success(data);
			};
			var script = document.createElement("script");
			script.src = inital.url + "?"+ inital.jsonp + "=" + cd + "&" + dump;
			var head = Bank("head")[0];
			head.appendChild(script);
			return false;
		};
		// 创建xhr对象
		var xhr = null;
		if( window.XMLHttpRequest ){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		};
		// 准备发送
		if(inital.type === "get"){
			inital.url += "?" + dump;
		};
		xhr.open(initial.type,initial.url,initial.async);
		// 发送信息
		var sendTxt = null;
		if(inital.type === "post"){
			sendTxt = dump;
			// 设置请求头
			xhr.setRequestHeader("Content-Type","Application/x-wwww-form-urlencoded");
		};
		xhr.send(sendTxt);
		// 处理同步请求
		if(!inital.async){
			var data = xhr.responseText;
			if(inital.dataType === "json"){
				data = Json.parse(data);
				return data;
			};
			return data;
		};
		// 异步请求处理数据
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				var data = xhr.responseText;
				if(inital.dataType === "json"){
					data = Json.parse(data);
				};
				inital.success(data);
			};
		};
	}
}))(window)