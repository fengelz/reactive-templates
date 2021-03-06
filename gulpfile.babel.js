import { src, dest, watch as watchSrc, parallel, series } from 'gulp'
import del from 'del'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import flatten from 'gulp-flatten'
import reactRender from 'gulp-render-react'
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import htmlbeautify from 'gulp-html-beautify'
import gls from 'gulp-live-server'
import replace from 'gulp-replace'
import inject from 'gulp-inject'
import insert from 'gulp-insert'

const paths = {
  components: 'src/components/',
  scss: 'src/scss/',
  assets: 'src/assets/',
  public: 'public/',
}

export const clean = () => {
  return del([paths.public])
}
export const cleanHtml = () => {
  return del(`${paths.public}**/*.html`)
}

const clearRequireCache = () => {
  for (const moduleId of Object.keys(require.cache)) {
    if (moduleId.toString().indexOf('/src/') > 0) {
      delete require.cache[require.resolve(moduleId)]
    }
  }
  return src(paths.components)
}

export const buildHtml = () => {
  
  return src(`${paths.components}pages/**/*.js`)
    .pipe(reactRender({type: 'markup'}))
    .pipe(replace('&lt;!--', '<!--'))
    .pipe(replace('--&gt;', '-->'))
    .pipe(replace('&lt;![', '<!['))
    .pipe(replace(']&gt;', ']>'))
    .pipe(replace('&lt;?', '<?'))
    .pipe(flatten())
    .pipe(insert.prepend('<!doctype html>'))
    .pipe(htmlbeautify({indentSize: 2}))
    .pipe(dest(paths.public))
}

export const buildSass = () => {
  return src(`${paths.scss}/styles.scss`)
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
  .pipe(dest(`${paths.public}/assets/css/`))
}

export const copyAssets = () => {
  return src([ `${paths.assets}**/*` ])
    .pipe(dest(paths.public))
}

export const serve = () => {
  const server = gls.static('public', 3000)
  server.start()
  watchSrc('public/**/*')
  .on('change', path => server.notify.call(server, { path }))
}

const watchStyles = () => {
  return watchSrc(`${paths.scss}**/*.scss`, buildSass)  
}
const watchComponentStyles = () => {
  return watchSrc(`${paths.components}**/*.scss`, buildSass)
}
const watchJs = () => {
  const watcher = watchSrc(`${paths.components}**/*.js`, series(clearRequireCache, buildHtml, injectScripts))
  }
const watchAssets = () => {
  return watchSrc(`${paths.assets}**/*.*`, {cwd: './'}, copyAssets)
}

const watchAll = parallel(watchStyles, watchComponentStyles, watchJs, watchAssets)
watchAll.description = 'watch for changes to all source'

export const injectScripts = () => {
  const sources = src([`${paths.public}assets/**/*.js`, `${paths.public}assets/**/*.css`], {read: false});
  return src(`${paths.public}*.html`)
  .pipe(inject(sources, {ignorePath: 'public'}))
  .pipe(dest(paths.public))
}

function onError(error) {
  console.log('ERROR:', error.message)
  if (error.plugin) {
    console.log(`Plugin: ${error.plugin}`)
  }
  this.emit('end')
}

export const parallelTasks = parallel(buildHtml, buildSass, copyAssets)

export const runningTasks = parallel(watchAll, serve)

export const build = series(clean, parallelTasks, injectScripts, runningTasks)

export default build