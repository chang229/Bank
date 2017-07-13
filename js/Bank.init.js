// 选择器模块
(function(window) {
	var arr = [],
		push = arr.push,
		slice = arr.slice;
	Bank.fn.init = function(selector) {
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
	Bank.fn.init.prototype = Bank.fn;
})(window)