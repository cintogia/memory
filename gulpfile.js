"use strict";

const gulp = require("gulp");
const watch = require("gulp-watch"); // serve files to localhost for live editing
const autoprefixer = require("gulp-autoprefixer"); // adds -webkit- etc. to CSS
const browserSync = require("browser-sync").create(); // opens localhost live editing
const sourcemaps = require("gulp-sourcemaps"); // puts a hash to the end of concat file to output line ref of errormsg
const uglifyES5 = require("gulp-uglify"); // minifies ES5
const uglify = require("gulp-uglify-es").default; // minifies ES6
const htmlmin = require("gulp-htmlmin"); // minifies HTML
const cleanCSS = require("gulp-clean-css"); // minifies CSS
const imagemin = require("gulp-imagemin"); // optimizes images
const fontmin = require("gulp-fontmin"); // optimizes fonts
const brotli = require("gulp-brotli"); // compress using brotli
const rename = require("gulp-rename"); // rename files, create dir
const ttf2woff2 = require("gulp-ttf2woff2"); // create WOFF2 Fonts
const workbox = require("workbox-build"); // sw generator

gulp.task("default", function(cb) {
	console.log("Memory is loading...");
	//gulp.series("styles", "scripts", "image", "fonts", "minify-css", "minify-html", "compress");
	cb();
});

gulp.task("sw", () => {
	return workbox.generateSW({
		globDirectory: "./",
		globPatterns: [
			"./*.html",
			"./img/*.{png,svg,jpg}",
			"./js/*.js",
			"./css/*.css"
		],
		skipWaiting: true,
		swDest: "./sw.js"
	});
});

gulp.task("stream", function(cb) {
	console.log("Memory is loading...");
	browserSync.init({
		server: "./"
	});
	return watch("./", browserSync.reload);
	cb();
});

gulp.task("styles", function(cb) {
	gulp.src("css/*.css")
		.pipe(autoprefixer({ browsers: ["last 2 versions"] }))
		.pipe(gulp.dest("/css"));
	//.pipe(browserSync.stream());
	console.log("CSS optimized");
	cb();
});

gulp.task("scripts", function(cb) {
	gulp.src("js/*.js")
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist/js"));
	cb();
});

gulp.task("image", cb => {
	gulp.src("img/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img"));
	gulp.src("img/touch/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img/touch"));
	cb();
	console.log("Images optimized");
});

gulp.task("minify-css", () => {
	console.log("CSS minified");
	return gulp
		.src("css/*.css")
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("dist/css"));
});

gulp.task("minify-html", () => {
	console.log("HTML minified");
	return gulp
		.src("*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});

gulp.task("fonts", function(cb) {
	gulp.src(["font/*.ttf"])
		.pipe(ttf2woff2())
		.pipe(gulp.dest("dist/font"));
	console.log("WOFF2 created");
	cb();
	gulp.src("font/*.ttf")
		.pipe(fontmin())
		.pipe(gulp.dest("dist/font"));
	cb();
});

gulp.task("compress", function(cb) {
	gulp.src("dist/*.html")
		.pipe(brotli.compress({ quality: 11, skipLarger: true }))
		.pipe(
			rename(function(path) {
				path.extname = "";
			})
		)
		.pipe(gulp.dest("dist/"));
	console.log("HTML Brötli");
	gulp.src("dist/css/*.css")
		.pipe(brotli.compress({ quality: 11, skipLarger: true }))
		.pipe(
			rename(function(path) {
				path.extname = "";
			})
		)
		.pipe(gulp.dest("dist/css/"));
	console.log("CSS Brötli");
	gulp.src("dist/js/*.js")
		.pipe(brotli.compress({ quality: 11, skipLarger: true }))
		.pipe(
			rename(function(path) {
				path.extname = "";
			})
		)
		.pipe(gulp.dest("dist/js/"));
	console.log("JS Brötli");
	cb();
});
