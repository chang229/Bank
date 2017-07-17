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