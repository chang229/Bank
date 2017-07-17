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