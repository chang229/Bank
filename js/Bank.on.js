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