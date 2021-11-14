'use strict';

const
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterESlint = require("live-alert-bp-formatter-eslint"),
  liveAlertFormatterStylelint = require("live-alert-bp-formatter-stylelint"),
  chokidar = require('chokidar'),
  path = require('path');

const 
  liveAlert = new liveAlertBP({host: '127.0.0.1', port: '8080'}),
  liveAlertMsgs = {
    ESLint: []
  };


class LiveAlert {
  
  constructor() {
    this.path = path;
    this.extnameChanged;

    this.watchFile();
    liveAlert.run();
  }

  apply(compiler) {
    compiler.hooks.done.tap('LiveAlertWebPack', (stats) => {
      const info = stats.toJson();

      if (liveAlertMsgs.ESLint.length > 0) {
        stats.compilation.errors.push('LiveAlert ---> ESLint');

        liveAlert.open(
          liveAlertFormatterESlint(liveAlertMsgs.ESLint)
        );        
      }else
      if (stats.hasErrors() && liveAlert.hasError() === false){

        this.formatterWebPack(info.errors, 'Error');
      }else
      if (stats.hasWarnings() && liveAlert.hasError() === false) {

        stats.compilation.errors.push('LiveAlert ---> WebPack(Warning)');
        this.formatterWebPack(info.warnings, 'Warning');
      }

      liveAlert.close();
      
      // Notification if the browser page refreshes without reloading. 
      if(this.extnameChanged === '.css' || this.extnameChanged === '.scss'){
        liveAlert.reloadNotification(); // (It need if use ---> devServer: { liveReload: true, hot: true} )
      }

      liveAlert.resetError();
      liveAlertMsgs.ESLint = [];
    });
  }

  watchFile(){
    chokidar.watch('./src/**/*.(js|css|sass)')
    .on('change', (path) => {
      this.extnameChanged = this.path.extname(path);
    });
  }

  formatterWebPack(msgs, labelname){
    let 
      msgsliveAlert = [],
      backgroundColor,
      color;

    if(labelname === 'Error'){
      backgroundColor = '#ff0000';
      color = '#ffffff';
    }else 
    if(labelname === 'Warning'){
      backgroundColor = '#ffff00';
      color = '#000000';
    }

    msgs.forEach(function(msg){
      msgsliveAlert.push({
        label: {
          style: { 
              backgroundColor: backgroundColor, 
              color: color 
          }, 
          name: labelname               
        }, 
        message: '<br>'
          + '<span style="opacity: 0.5;">File:</span> ' + msg.moduleName + '<br>'
          + '<span style="opacity: 0.5;">Loc:</span> ' + msg.loc + '<br>'
          + '<span style="opacity: 0.5;">Reason:</span> ' + msg.message
      });
    }); 

    liveAlert.open(msgsliveAlert);
  }

  formatterESLint(msgs){
    liveAlertMsgs.ESLint = liveAlertMsgs.ESLint.concat(msgs);
  }

  formatterStylelint(results, returnValue) {
    if(liveAlert.hasError() === false){
      liveAlert.open(
        liveAlertFormatterStylelint(results)
      ); 
    }

    return results;
  }

}

module.exports = LiveAlert;
