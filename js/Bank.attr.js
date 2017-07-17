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