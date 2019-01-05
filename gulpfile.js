const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minify = require('gulp-csso');
const uglify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
sass.compiler = require('node-sass');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

//compile and inject into browser
function scss(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','app/sass/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(minify())
    .pipe(rename('style.css'))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
}

// gulp.task('sass', function(){
//     return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','app/scss/*.scss'])
//     .pipe(sass())
//     .pipe(gulp.dest("app/css"))
//     .pipe(browserSync.stream());
// });

// Move the js file to app/js

function js(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/popper.min.js'])
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());
}
// gulp.task('js', function(){
//     return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/popper.min.js'])
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.stream());
// });


// function minifyjs()
// {
//     return gulp.src(['app/js/script.js','app/js/navbar-fixed.js'])
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
// }
// Watch sass and serve
function serve(){
    browserSync.init({
        server: "./app"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','app/sass/**/*.scss','app/sass/*.scss'],scss);
    // gulp.watch(['app/js/*.js'],minifyjs);
    gulp.watch('app/*.html').on('change',browserSync.reload);
}

// gulp.task('serve', function(){
//     browserSync.init({
//         server: "./app"
//     });
//     gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','app/scss/*.scss'],['sass']);
//     gulp.watch('app/*.html').on('change',browserSync.reload());
// });

//Move fonts folder to src
function fonts(){
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest("app/fonts"));
}

// gulp.task('fonts',function(){
// 	return gulp.src('node_modules/font-awesome/fonts/*')
// 	.pipe(gulp.dest("src/fonts"));
// });

//move font-awesome css to src

function fa(){
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest("app/css"));
}

// gulp.task('fa',function(){
// 	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
// 	.pipe(gulp.dest("src/css"));
// });

// gulp.task('default',['js','serve','fa','fonts']);

exports.js = js;
exports.scss = scss;
exports.serve = serve;
exports.fonts = fonts;
exports.fa = fa;
exports.default = gulp.parallel(js,serve,fa,fonts)