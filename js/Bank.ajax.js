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
		if(initial.dataType === "jsonp"){
			var cd = "Bankjs" + (edition + Math.random()).replace(/\D/g,"") + (new Date().getTime());
			if(initial.jsonpcallback){
				cd = initial.jsonpcallback;
			};
			window[cd] = function(data){
				initial.success(data);
			};
			var script = document.createElement("script");
			script.src = initial.url + "?"+ initial.jsonp + "=" + cd + "&" + dump;
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
		if(initial.type === "get"){
			initial.url += "?" + dump;
		};
		xhr.open(initial.type,initial.url,initial.async);
		// 发送信息
		var sendTxt = null;
		if(initial.type === "post"){
			sendTxt = dump;
			// 设置请求头
			xhr.setRequestHeader("Content-Type","Application/x-wwww-form-urlencoded");
		};
		xhr.send(sendTxt);
		// 处理同步请求
		if(!initial.async){
			var data = xhr.responseText;
			if(initial.dataType === "json"){
				data = JSON.parse(data);
				return data;
			};
			return data;
		};
		// 异步请求处理数据
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				var data = xhr.responseText;
				if(initial.dataType === "json"){
					data = JSON.parse(data);
				};
				initial.success(data);
			};
		};
	}
})(window);