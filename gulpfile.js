var gulp = require('gulp')
var browserSync = require('browser-sync')
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
