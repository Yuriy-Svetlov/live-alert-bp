
const 
  gulp = require('gulp'),
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterSass = require("live-alert-bp-formatter-sass"),
  liveAlertFormatterStylelint = require("live-alert-bp-formatter-stylelint"),  
  stylelint = require('gulp-stylelint'),
  autoprefixer = require('gulp-autoprefixer'),
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
    .pipe(stylelint({
      customSyntax: 'postcss-scss',
      failAfterError: true,
      fix: false,
      reporters: [
        { formatter: formatterStylelint },
        { formatter: 'string', console: true }
      ]
    }))          
    .pipe(gulpSass().on('error', gulpSass.logError)) 
    .pipe(autoprefixer())  
    .pipe(postcss([
        cssnano({zindex: false, reduceIdents: false})
    ]))     
    .pipe(gulp.dest(cssDest));
}


function alert(ok){
  liveAlert.close();
  liveAlert.reloadNotification();
  liveAlert.resetError();

  ok();
}


function onError(err){
  if(liveAlert.hasError() === false){
    if(err.plugin === 'gulp-sass'){
      liveAlert.open(
        liveAlertFormatterSass(err)
      );
    }
  }

  this.emit('end');
}


function formatterStylelint(results, returnValue) {
  if(liveAlert.hasError() === false){
    liveAlert.open(
      liveAlertFormatterStylelint(results)
    ); 
  }

  return results;
}


function watch(){
  liveAlert.run();
  webServer();

  gulp.watch(cssWatch, gulp.series(css, alert));
}


exports.css = css;
exports.watch = watch;
exports.alert = alert;
exports.start = gulp.series(css, watch);
