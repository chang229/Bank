// 引入gulp
var gulp = require("gulp");
// 引入concat插件
var concat = require("gulp-concat");
// 引入uglify
var press = require("gulp-uglify");
// 创建任务
// 合并文件
gulp.task("cont",function(){
	gulp.src([
		"./js/Bank.core.js",
		"./js/Bank.init.js",
		"./js/Bank.dom.js",
		"./js/Bank.on.js",
		"./js/Bank.css.js",
		"./js/Bank.attr.js",
		"./js/Bank.animate.js",
		"./js/Bank.ajax.js"
		])
	.pipe(concat("Bank.js"))
	.pipe(gulp.dest("./dist"))
});
gulp.task("contmin",function(){
	return gulp.src([
		"./js/Bank.core.js",
		"./js/Bank.init.js",
		"./js/Bank.dom.js",
		"./js/Bank.on.js",
		"./js/Bank.css.js",
		"./js/Bank.attr.js",
		"./js/Bank.animate.js",
		"./js/Bank.ajax.js"
		])
	.pipe(concat("Bank.min.js"))
	.pipe(gulp.dest("./dist"))
});
// 压缩文件
gulp.task("default",["cont","contmin"],function(){
	gulp.src("./dist/Bank.min.js")
	.pipe(press())
	.pipe(gulp.dest("./dist"))
});