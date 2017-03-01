var fs = require('fs')
var gulp = require('gulp')
var browserSync = require('browser-sync')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var replace = require('gulp-replace')
var license = require('gulp-header')
var marked = require('marked')
var reload = browserSync.reload

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

gulp.task('dev', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  })
  gulp.watch('index.html').on('change', reload)
  gulp.watch('src/*.js').on('change', reload)
  gulp.watch('src/*.css').on('change', reload)
  gulp.watch('demos/*.js').on('change', reload)
  gulp.watch('demos/*.css').on('change', reload)
})

gulp.task('build', function () {
  var version = JSON.parse(fs.readFileSync('./package.json')).version
  var copyright = `/*! JTaro.js v${version} ~ (c) 2016 Author:BarZu Git:https://github.com/chjtx/JTaro */\n`

  gulp.src('src/jtaro.js')

    // 修改版本号
    .pipe(replace('{{version}}', version))
    .pipe(license(copyright))
    .pipe(gulp.dest('dist/'))

    // 去除JTaro警告
    .pipe(replace(/\/\/ \*\*JTaro Comment[^;]+;;/g, ''))
    // 压缩
    .pipe(uglify())
    .pipe(license(copyright))
    .pipe(rename({
      basename: 'jtaro',
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('www', function () {
  var rd = fs.readFileSync('./README.md').toString()
  var tp = fs.readFileSync('./www/index-template.html').toString()
  var content = marked(rd)
    // 将[x]转为打勾的input
    .replace(/\[x]/g, '<input type="checkbox" checked disabled>')
    // 所有外链a标签加上_blank
    .replace(/<a\s+href="http/g, '<a target="_blank" href="http')

  fs.writeFileSync('./www/index.html', tp.replace('{{doc}}', content))
})
