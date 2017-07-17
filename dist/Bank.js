// 核心模块
(function(window) {
	// 引入window参数，以便于抛出变量
	// 工厂函数
	function Bank(selector) {
		return new Bank.fn.init(selector);
	};
	// 改变原型对象，引入Bank.fn方便书写
	Bank.fn = Bank.prototype = {
		// constructor属性指向Bank
		constructor: Bank,
		// 添加length属性去报获取到的是伪数组
		length: 0,
		// 添加type属性，便于区分是Bank对象
		type: "Bank",
		each: function(callBack) {
			return Bank.each(this, callBack);
		},
		map: function(callBack) {
			return Bank.map(this, callBack);
		},
		get: function(num) {
			if (num === undefined) {
				return this;
			};
			if (num >= 0) {
				return Bank(this[num]);
			};
			if (num < 0) {
				return Bank(this[this.length + num]);
			}
		},
		// index方法，目前仅限于元素有父元素时使用
		index: function() {
			var i, parent = this.parent();
			if (parent[0] === document.body) {
				return -1;
			};
			var arr = parent.child();
			for (i = 0; i < arr.length; i++) {
				if (arr[i] == this[0]) {
					return i;
				};
			};
		},
		pushStrok: function(newObj) {
			newObj.prevObj = this;
			return newObj;
		},
		end: function() {
			return this.prevObj || this;
		}
	};
	// 静态方法
	// 获取元素
	Bank.select = function(selector) {
		return document.querySelectorAll(selector);
	};
	// 判断是否是数组
	Bank.isArrayLike = function(array) {
		var length = array && array.length;
		return typeof length === "number" && length >= 0;
	};
	// each遍历方法
	Bank.each = function(array, fn) {
		var i, k;
		if (Bank.isArrayLike(array)) {
			// 数组，采用for循环
			for (i = 0; i < array.length; i++) {
				if (fn.call(array[i], i, array[i]) === false) break;
			};
		} else {
			// 非数组采用for...in...循环
			for (k in array) {
				if (fn.call(array[k], k, array[k]) === false) break;
			};
		};
		return array;
	};
	// map遍历方法
	Bank.map = function(array, fn) {
		var i, k, temp, rest = [];
		if (Bank.isArrayLike(array)) {
			for (i = 0; i < array.length; i++) {
				temp = fn(array[i], i);
				if (temp !== undefined) {
					rest.push(temp);
				};
			};
		} else {
			for (k in array) {
				temp = fn(array[k], k);
				if (temp !== undefined) {
					rest.push(temp);
				};
			};
		};
		return rest;
	};
	// 去除重复元素
	Bank.unique = function(array) {
		var rest = [];
		for (var i = 0; i < array.length; i++) {
			if (rest.indexOf(array[i]) === -1) {
				rest.push(array[i]);
			};
		};
		return rest;
	};
	// 混入方法
	Bank.mixin = function(obj) {
		for (var k in obj) {
			Bank[k] = obj[k];
		};
	};
	// 抛出对象
	window.Bank = window.$ = Bank;
})(window);
// 选择器模块
(function(window) {
	var Bank = window.Bank,
		$ = Bank,
		arr = [],
		push = arr.push,
		slice = arr.slice;
	var init = Bank.fn.init = function(selector) {
		// 处理null,undefined,"",直接返回
		if (!selector) return this;
		// 处理字符串
		if (typeof selector === "string") {
			// 处理符合标签规范的字符串
			if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1)) {
				push.apply(this, Bank.parseHtml(selector));
				return this;
			} else {
				// 选择器字符串
				push.apply(this, Bank.select(selector));
				return this;
			};
		};
		// 处理Dom元素
		if (selector.nodeType) {
			push.call(this, selector);
			return this;
		};
		// 处理Bank对象
		if (selector.type === "Bank") {
			push.apply(this, selector);
			return this;
		};
		// 处理函数
		if (typeof selector === "function") {
			window.onload = function() {
				selector();
			};
		};
	};
	// 改变init的原型对象，可以继承Bank.fn的方法
	init.prototype = Bank.fn;
})(window);
//Dom模块
(function(window) {
	var arr = [],
		push = arr.push,
		slice = arr.slice;
	//访问父元素
	Bank.fn.parent = function() {
		var rest = [],
			newObj = Bank();
		this.each(function() {
			rest.push(this.parentNode);
		});
		rest = Bank.unique(rest);
		push.apply(newObj, rest);
		return this.pushStrok(newObj);
	};
	// 访问子代元素
	Bank.fn.child = function() {
		var i, k,
			rest = [],
			newObj = Bank();
		for (i = 0; i < this.length; i++) {
			for (j = 0; j < this[i].children.length; j++) {
				rest.push(this[i].children[j]);
			};
		};
		push.apply(newObj, rest);
		return this.pushStrok(newObj);
	};
	// appendTo方法
	Bank.fn.appendTo = function(select) {
		var temp = null,
			select = Bank(select);
		return this.each(function(i, v) {
			for (var j = 0; j < select.length; j++) {
				temp = j === select.length - 1 ? v : v.cloneNode(true);
				select[j].appendChild(temp);
			};
		});
	};
	// Bank.parseHtml,将符合标签规范的字符串变成dom元素
	Bank.parseHtml = function(selector) {
		var temp, rest = [],
			div = document.createElement("div");
		div.innerHTML = selector;
		temp = div.childNodes;
		push.apply(rest, temp);
		return rest;
	};
	// 设置文本内容
	Bank.fn.html = function(txt){
		return this.each(function(i,v){
			v.innerHTML = txt;
		});
	};
})(window);
// 事件模块
(function(window) {
	// 绑定事件封装
	Bank.on = function(element, attr, listener) {
		if (element.addEventListener) {
			element.addEventListener(attr, listener, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + attr, listener);
		} else {
			element["on" + attr] = listener;
		};
	};
	// 解除事件封装
	Bank.off = function(element, attr, listener) {
		if (element.removeEventListener) {
			element.removeEventListener(attr, listener, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + attr, listener);
		} else {
			element["on" + attr] = null;
		};
	};
	// 移除事件封装
	Bank.fn.off = function( attr,listener ){
		return this.each(function(i,v){
			Bank.off(v,attr,listener);
		});
	};
	// 向原型对象中添加on方法
	Bank.fn.on = function(attr, listener) {
		return this.each(function(i, v) {
			Bank.on(v, attr, listener);
		});
	};
	// 快捷添加事件封装
	Bank.each( ("abort,blur,cancel,canplay,canplaythrough,change,click,close,contextmenu,cuechange,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,error,focus,input,invalid,keydown,keypress,keyup,load,loadeddata,loadedmetadata,loadstart,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,pause,play,playing,progress,ratechange,reset,resize,scroll,seeked,seeking,select,show,stalled,submit,suspend,timeupdate,toggle,volumechange,waiting,auxclick,gotpointercapture,lostpointercapture,pointercancel,pointerdown,pointerenter,pointerleave,pointermove,pointerout,pointerover,pointerup,beforecopy,beforecut,beforepaste,copy,cut,paste,search,selectstart,wheel,webkitfullscreenchange,webkitfullscreenerror").split(","),function(i,v) {
		Bank.fn[v] = function(listener) {
			return this.each(function(i, k) {
				Bank.on(k, v, listener);
			});
		};
	});
	Bank.fn.trigger = function(attr){
		console.log(this[attr]());
		this[attr]();
	};
})(window);
// css模块
(function(window){
	//获取计算后样式
	Bank.getStyle = function(element,attr){
		if(window.getComputedStyle){
			return window.getComputedStyle(element,null)[attr];
		}else{
			return element.currentStyle[attr];
		};
	};
	//css方法
	Bank.fn.css = function(key,value){
		if(value === undefined){
			if(typeof key === "object"){
				return this.each(function(i,v){
					for(var k in key){
						v.style[k] = key[k];
					};
				});
			}else{
				return Bank.getStyle(this[0],key);
			};
		}else{
			return this.each(function(i,v){
				v.style[key] = value;
			});
		};
	};
})(window);
// 属性模块
(function(window){
	// 类名操作
	// addClass
	Bank.fn.addClass = function(value){
		return this.each(function(i,v){
			if(v.className){
				var rest = [];
				rest = (v.className).split(" ");
				if(rest.indexOf(value) !== -1){
					return false;
				};
				rest.push(value);
				v.className = rest.join(" ");
			}else{
				v.className = value;
			}
		});
	};
	//removeClass
	Bank.fn.removeClass = function(value){
		return this.each(function(i,v){
			if(!v.className){
				return false;
			}else{
				var rest = [];
				rest = v.className.split(" ");
				if(rest.indexOf(value) === -1){
					return false;
				};
				rest.splice(rest.indexOf(value),1);
				v.className = rest.join(" ");
			};
		});
	};
	//hasClass
	Bank.fn.hasClass = function(value){
		var rest = [];
		if(this[0].className){
			rest = (this[0].className).split(" ");
			if(rest.indexOf(value) === -1){
				return false;
			}else{
				return true;
			};
		}else{
			return false;
		};
	};
	//toggleClass
	Bank.fn.toggleClass = function(value){
		return this.each(function(i,v){
			if(v.className){
				var rest = [];
				rest = (v.className).split(" ");
				if(rest.indexOf(value) === -1){
					rest.push(value);
				}else{
					rest.splice(rest.indexOf(value),1);
				};
				v.className = rest.join(" ");
			}else{
				v.className = value;
			};
		});
	};
	// 属性操作
	Bank.getAttr = function(element,key){
		if(element[key]){
			return element[key];
		}else{
			return element.getAttribute(key);
		};
	};
	Bank.setAttr = function(element,key,value){
		if(element[key]){
			element[key] = value;
		}else{
			element.setAttribute(key,value);
		};
	};
	//移除属性
	Bank.fn.removeAttr = function(key){
		return this.each(function(i,v){
			v.removeAttribute(key);
		});
	};
	//attr
	Bank.fn.attr = function(key,value){
		if(value === undefined){
			return Bank.getAttr(this[0],key);
		}else{
			return this.each(function(i,v){
				Bank.setAttr(v,key,value);
			});
		};
	};
	//val方法获取文本框的value值
	Bank.fn.val = function(){
		var ages = arguments;
		if(ages.length === 0){
			return Bank.getAttr(this[0],"value");
		}else{
			return this.each(function(i,v){
				Bank.setAttr(v,"value",ages[0]);
			});
		};
	};
})(window);
// 动画模块
(function(window){
	Bank.animate = function(element,obj,speed,fn){
		clearInterval(element.timer);
		var clock,callback;
		clock = speed;
		callback = fn;
		if(speed === undefined){
			clock = 200;
		};
		if(typeof speed === "function"){
			clock = 200;
			callback = speed;
		};
		var ourstep = clock / 15;
		element.timer = setInterval(function(){
			var flog = true;
			for(k in obj){
				if(k === "zIndex"){
					var target = Bank.getStyle(element,k);
					var leader = obj[k];
					target = leader;
					element.style[k] = target;
				}else if(k === "opacity"){
					var target = Bank.getStyle(element,k) * 100;
					var leader = obj[k] * 100;
					var step = (leader - target) / ourstep;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					var newStyle = target + step;
					element.style[k] = newStyle / 100;
				}else{
					var target = parseInt(Bank.getStyle(element,k));
					var leader = parseInt(obj[k]);
					var step = (leader - target) / ourstep;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					var newStyle = target + step;
					element.style[k] = newStyle + "px";
				};
				if(target !== leader){
					flog = false;
				};
			};
			console.log("111");
			if(flog){
				clearInterval(element.timer);
				if(callback){
					callback();
				};
			};
		}, 15);
	};
	// animate方法
	Bank.fn.animate = function(obj,speed,fn){
		return this.each(function(i,v){
			Bank.animate(v,obj,speed,fn);
		});
	};
})(window);
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