
const 
  gulp = require('gulp'),
  liveAlertBP = require("live-alert-bp"),
  plumber = require('gulp-plumber'),
  bro = require('gulp-bro'),
  babelify = require('babelify'),
  eslint = require('gulp-eslint');

const 
  jsWatch = 'src/js/*.js',
  jsSrc = ['src/js/*.js'],
  jsDest = 'build';

const 
  liveAlert = new liveAlertBP({host: '127.0.0.1', port: '8080'});


function js() {
  return gulp.src(jsSrc)
    .pipe(plumber({errorHandler: onError}))        
    .pipe(bro({
        transform: [
          babelify.configure({  presets: ['@babel/env'] }),
          ['browserify-postcss', {  plugin: ['postcss-import'] }],
          ['loose-envify'],
          ['blissify']
        ]
      })
    )    
    .pipe(gulp.dest(jsDest));
}


function alert(cb){
    liveAlert.close();
    liveAlert.reloadNotification();
    liveAlert.resetError();

  cb();
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

  gulp.watch(jsWatch, gulp.series(js, alert));
}


exports.js = js;
exports.watch = watch;
exports.alert = alert;
