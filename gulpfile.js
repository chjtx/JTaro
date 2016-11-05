var fs = require('fs')
var gulp = require('gulp')
var browserSync = require('browser-sync')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var license = require('gulp-header')
var reload = browserSync.reload

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
  fs.readFile('src/jtaro.js', function (err, data) {
    if (err) throw err
    var head = /([\s\S](?!\*\/))+/.exec(data.toString())
    var copyright = ''

    if (head) {
      copyright = head[0] + ' */\n;'
    }

    gulp.src('src/jtaro.js')
      .pipe(uglify())
      .pipe(license(copyright))
      .pipe(rename({
        basename: 'jtaro',
        extname: '.min.js'
      }))
      .pipe(gulp.dest('dist/'))
  })
})
