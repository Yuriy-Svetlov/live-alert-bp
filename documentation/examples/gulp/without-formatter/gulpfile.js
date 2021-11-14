
const 
  gulp = require('gulp'),
  liveAlertBP = require("live-alert-bp"),
  plumber = require('gulp-plumber'),
  gulpSass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  webServer = require('./web-server');

const 
  cssWatch = 'src/scss/**/*.scss',
  cssSrc = ['src/scss/*.scss'],
  cssDest = 'dest/css';

const 
  liveAlert = new liveAlertBP({host: '127.0.0.1', port: '8080'});


function css() {
  return gulp.src(cssSrc)
    .pipe(plumber({errorHandler: onError}))        
    .pipe(gulpSass().on('error', gulpSass.logError))   
    .pipe(postcss([
        cssnano({zindex: false, reduceIdents: false})
    ]))     
    .pipe(gulp.dest(cssDest));
}


function liveAlertCSS(cb){
    liveAlert.close();
    liveAlert.reloadNotification();
    liveAlert.resetError();

  cb();
}


function onError(err){
  if(liveAlert.hasError() === false){
    if(err.plugin === 'gulp-sass'){
      
      // Without using the formatter
      // ----------------------------------
      liveAlert.open([
        { label: 'File', message: err.file },
        { label: 'Message', message: err.message }
      ]);
      // ----------------------------------
      
    }
  }

  this.emit('end');
}


function watch(){
  liveAlert.run();
  webServer();

  gulp.watch(cssWatch, gulp.series(css, liveAlertCSS));
}


exports.css = css;
exports.watch = watch;
exports.liveAlertCSS = liveAlertCSS;
exports.start = gulp.series(css, watch);
