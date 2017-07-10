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
})(window)