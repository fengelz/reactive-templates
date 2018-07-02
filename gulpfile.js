require("@babel/register")
const gulp = require('gulp')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const path = require('path')
const flatten = require('gulp-flatten')
const reactRender = require('gulp-render-react')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const gls = require('gulp-live-server')

gulp.task('default', [
  'build-html',
  'build-sass',
  'copy-assets',
  'init',
  'serve',
])

const paths = {
  components: path.join(__dirname, 'src/components/'),
  scss: path.join(__dirname, 'src/scss/'),
  assets: path.join(__dirname, 'src/assets/'),
  public: path.join(__dirname, 'public')
}

gulp.task('build-public', ['build-html', 'build-sass', 'copy-assets'])

gulp.task('build-html', () => {
  gulp.src(paths.components + 'pages/**/*.js')
    .pipe(reactRender({type: 'markup'}))
    .pipe(flatten())
    .pipe(gulp.dest(paths.public))
})

gulp.task('build-sass', () => {
  return gulp
    .src(paths.scss + '/styles.scss')
    .pipe(sassGlob())
    .on('error', onError)
    .pipe(
      sass({
        includePaths: [],
      })
    )
    .on('error', onError)
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.public + '/assets/css/'))
})

gulp.task('copy-assets', () => {
  gulp.src([ paths.assets + '**/*' ])
    .pipe(gulp.dest('./public/assets/'))
})

gulp.task('serve', () => {
  var server = gls.static('public', 3000)
  server.start()
  gulp
    .watch(['public/**/*.css', 'public/*.html'], function(file) {
      server.notify(file).on('error', onError)
    })
    .on('error', onError)
})

gulp.task('init', () => {
  gulp.watch(paths.scss + '**/*.scss', ['build-sass'])
  gulp.watch(paths.components + '**/*.scss', ['build-sass'])
  gulp.watch(paths.components + '**/*.js', ['build-html'])
  gulp.watch(paths.assets + '**/*.*', {cwd: './'}, ['copy-assets'])
})

function onError(error) {
  console.log("ERROR:", error.message)
  if (error.plugin) {
    console.log('Plugin: ' + error.plugin)
  }
  this.emit('end')
}