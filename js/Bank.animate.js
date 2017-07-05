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
})(window)