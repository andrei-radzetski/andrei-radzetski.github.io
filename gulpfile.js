const gulp = require("gulp")
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const rename = require("gulp-rename")
const sourcemaps = require('gulp-sourcemaps')
const fileinclude = require('gulp-file-include')
const replace = require('gulp-token-replace')

const MIN_SUFFIX = ".min"
const DIST = "./dist"
const CSS_DIST = "./dist/css"
const SASS_SRC = "./src/sass/**/*.scss"
const CSS_BUNDLE = "main.css"
const PAGES = ["./src/index.html"]

gulp.task("html", () => gulp
  .src(PAGES)
  .pipe(fileinclude("@@"))
  .pipe(replace({ global: { "min": MIN_SUFFIX } }))
  .pipe(gulp.dest(DIST)))

gulp.task("sass", () => gulp
  .src(SASS_SRC)
  .pipe(sass().on("error", sass.logError))
  .pipe(concat(CSS_BUNDLE))
  .pipe(gulp.dest(CSS_DIST)))

gulp.task("sass-min", () => gulp
  .src(SASS_SRC)
  .pipe(sass().on("error", sass.logError))
  .pipe(concat(CSS_BUNDLE))
  .pipe(sourcemaps.init())
  .pipe(cleanCSS({ sourceMap: true }))
  .pipe(rename({ suffix: MIN_SUFFIX }))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest(CSS_DIST)))

gulp.task("default", ["html", "sass", "sass-min"])