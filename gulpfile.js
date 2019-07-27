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

gulp.task("default", cb => {
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
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com\/font-awesome\/4\.6\.1\/css\/font-awesome\.min\.css/,
				handler: "CacheFirst", // or NetworkFirst or NetworkOnly or StaleWhileRevalidate or CacheFirst or CacheOnly
				options: {
					cacheName: "fa-icons",
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /^https:\/\/fonts\.googleapis\.com\/css\?family\=Coda/,
				handler: "CacheFirst", // or NetworkFirst or NetworkOnly or StaleWhileRevalidate or CacheFirst or CacheOnly
				options: {
					cacheName: "google-font",
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			}
		],
		swDest: "./sw.js"
	});
});

gulp.task("stream", cb => {
	console.log("Memory is loading...");
	browserSync.init({
		server: "./dist/"
	});
	return watch("./dist/", browserSync.reload);
	cb();
});

gulp.task("styles", cb => {
	gulp.src("css/*.css")
		.pipe(autoprefixer({ browsers: ["last 2 versions"] }))
		.pipe(gulp.dest("/css"));
	//.pipe(browserSync.stream());
	console.log("CSS optimized");
	cb();
});

gulp.task("scripts", cb => {
	gulp.src("js/*.js")
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist/js"));
	gulp.src("sw.js")
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist/"));
	cb();
	console.log("SCRIPTS OPTIMIZED");
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

gulp.task("minify", cb => {
	gulp.src("css/*.css")
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("dist/css"));
	console.log("MINIFIED CSS FILES");
	gulp.src("./*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
	console.log("MINIFIED HTML FILES");
	cb();
});

gulp.task("fonts", cb => {
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

gulp.task("compress", cb => {
	gulp.src("dist/*.html")
		.pipe(brotli.compress({ quality: 9, skipLarger: true }))
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
		.pipe(brotli.compress({ quality: 9, skipLarger: true }))
		.pipe(
			rename(function(path) {
				path.extname = "";
			})
		)
		.pipe(gulp.dest("dist/js/"));
	gulp.src("dist/sw.js")
		.pipe(brotli.compress({
      extension: 'brotli',
      skipLarger: true,
      mode: 0,
      quality: 9,
      lgblock: 0
    }))
		.pipe(
			rename(function(path) {
				path.extname = "";
			})
		)
		.pipe(gulp.dest("dist/"));
	console.log("JS Brötli");
	cb();
});
