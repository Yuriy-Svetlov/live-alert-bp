
const 
  gulp = require('gulp'),
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterSass = require("live-alert-bp-formatter-sass"),
  plumber = require('gulp-plumber'),
  gulpSass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano');

const 
  cssWatch = 'src/scss/*.scss',
  cssSrc = ['src/scss/*.scss'],
  cssDest = 'build/css';

const 
  liveAlert = new liveAlertBP({host: '127.0.0.1', port: '8080'});


function css() {
  return gulp.src(cssSrc)
    .pipe(plumber({errorHandler: onError}))        
    .pipe(gulpSass().on('error', gulpSass.logError))   
    .pipe(postcss([
        cssnano({zindex: false, reduceIdents: false})
    ]))     
    .pipe(gulp.dest(cssDest))
    .on("end", function (err) {
        liveAlert.close();
        liveAlert.reloadNotification();
        liveAlert.resetError();
    });    
}


function onError(err){
  if(liveAlert.hasError() === false){
    if(err.plugin === 'gulp-sass'){
      
      //  Using the Sass formatter
      liveAlert.open(
        liveAlertFormatterSass(err)
      );
      
    }
  }

  this.emit('end');
}


function watch(){
  liveAlert.run();

  gulp.watch(cssWatch, gulp.series(css));
}


exports.css = css;
exports.watch = watch;
