
const 
  gulp = require('gulp'),
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterESlint = require("live-alert-bp-formatter-eslint"),
  plumber = require('gulp-plumber'),
  bro = require('gulp-bro'),
  babelify = require('babelify'),
  eslint = require('gulp-eslint');

const 
  liveAlert = new liveAlertBP({host: '127.0.0.1', port: '8080'}),
  liveAlertMessages = {
    ESLint: []
  };

const 
  jsWatch = 'src/js/**/*.js',
  jsSrc = ['src/js/index.js'],
  jsDest = 'build';


function esLint() {
  return gulp.src(jsSrc)
  .pipe(plumber({errorHandler: onError}))       
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.format(formatter_ESLint))
  .pipe(eslint.failAfterError());
}


function js() {
  return gulp.src(jsSrc)    
    .pipe(bro({
        transform: [
          babelify.configure({  presets: ['@babel/env'] }),
          ['loose-envify']
        ],
        error: onErrorBro
      })
    )    
    .pipe(gulp.dest(jsDest));
}


function alert(cb){

  if(liveAlertMessages.ESLint.length > 0){
    const 
      userStyle = {}, 
      filter = []; // ['warning']
    
    liveAlert.open(
      //liveAlertFormatterESlint(liveAlertMessages.ESLint, userStyle, filter)
      liveAlertFormatterESlint(liveAlertMessages.ESLint)
    );
  }

  liveAlert.close();
  liveAlert.reloadNotification();
  liveAlert.resetError();

  liveAlertMessages.ESLint = [];

  cb();
}



function onError(err){
  if(liveAlert.hasError() === false){

  }

  this.emit('end');
}


function onErrorBro(err){
  if(liveAlert.hasError() === false){
    liveAlert.open([
      { 
        label: {
          style: { 
            backgroundColor: '#ff0000', 
            color: '#ffffff' 
          }, 
          name: 'Error'          
        }, 
        message:  '<br>'
          + '<span style="opacity: 0.5;">Reason:</span> ' + err.message + '<br>'
      }
    ]);

    console.error(err.message);
  }
}


function formatter_ESLint(messages){
  liveAlertMessages.ESLint = liveAlertMessages.ESLint.concat(messages);
}


function watch(){
  liveAlert.run();

  gulp.watch(jsWatch, gulp.series(esLint, js, alert));
}


exports.esLint = esLint;
exports.js = js;
exports.watch = watch;
exports.alert = alert;
