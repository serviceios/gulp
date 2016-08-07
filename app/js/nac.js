


/**
 * Created by Administrator on 2016/8/6 0006.
 */

// 定义依赖项
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    uglify= require('gulp-uglify'),
    notify = require('gulp-notify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    less = require('gulp-less'),
    cssver = require('gulp-make-css-url-version'),
    cssmin = require('gulp-minify-css');

// 定义 webserver 任务
gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});



//html压缩
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('app/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'))
    //.pipe(notify({ message: 'html task ok' }));
});
// 定义 less
gulp.task('less', function() {
    gulp.src('app/style/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/style'))
        .pipe(connect.reload());
});

//css压缩
gulp.task('testCssmin', function () {
    gulp.src('app/css/*.css')
        .pipe(cssver())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        //.pipe(notify({ message: 'css task ok' }));
});

// 检查js
gulp.task('jshint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
    //.pipe(notify({ message: 'js lint task ok' }));
});
//js 压缩
gulp.task('minifyjs', function() {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    // .pipe(notify({ message: 'js task ok' }));
});
// 压缩图片
gulp.task('imagemin', function() {
    return gulp.src('app/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/images/'))
        .pipe(notify({ message: 'img task ok' }));
});



// 定义 watch任务
gulp.task('watch', function() {
    gulp.watch('app/html/*.html', ['testHtmlmin']);
    gulp.watch('app/js/*.js', ['jshint','minifyjs']);
    gulp.watch('app/styles/*.less', ['less']);
    gulp.watch('app/styles/*.css', ['testCssmin']);
})

// 定义默认任务
gulp.task('default', ['less','minifyjs','testHtmlmin',,'testCssmin', 'webserver', 'watch']);















