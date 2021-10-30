'use strict';

const 
  sass = require('sass'),
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterStylelint = require("live-alert-bp-formatter-stylelint"),
  postcssOnAlert = require("postcss-on-alert"),
  liveAlertFormatterPostcss = require('live-alert-bp-formatter-postcss'),
  callNoMoreOftenThan = require('call-no-more-often-than');

var
  liveAlert,
  liveAlertMssages = [];


module.exports = function(grunt) {

  grunt.initConfig({

    liveAlert: {
      run: {
        options: {
          host: '127.0.0.1',
          port: '8080'
        }
      },    
      css: {
        options: {
          reloadNotification: true
        }        
      },
    },

    sass: {
        options: {
            implementation: sass,
            sourceMap: true
        },
        main: {
            files: {
              'src/css/main.css': 'src/scss/main.scss'
            }
        }
    },

    postcss: {
      lint: {
        options: {
            onError: postcssOnError,
            parser: require('postcss-scss'),
            processors: [
              require('stylelint')({formatter: formatterStylelint}), 
              postcssOnAlert({
                  filterPlugins: [],
                  filterTypeErrors: [],
                  filterMessages: [],
                  onAlert: function(messages){
                      liveAlertMssages = liveAlertMssages.concat(messages);
                  }
              })           
            ]
        },    
        src: ['src/scss/*.scss']    
      },      
      css: {
          options: {
              map: true, // inline sourcemaps
              processors: [
                require('autoprefixer')(),
                require('cssnano')() // minify the result
              ]
          },          
          files: [{
              expand: true,
              cwd: 'src',
              src: 'css/**/*.css',
              dest: 'build'
          }]
      }
    },

    watch: {
      options: {
        spawn: false 
        // It is recommended to disable `false` or not use 'grunt-contrib-watch' 
        // or perhaps even Grunt. Because it works very very slowly.
      },
      css: {
          files: ['src/scss/**/*.scss'],
          tasks: ['sass', 'postcss:lint', 'liveAlert:css']
      }        
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-scss');
  grunt.loadNpmTasks('@lodder/grunt-postcss');
  grunt.loadNpmTasks('grunt-stylelint');


  // Register Task
  grunt.registerTask('start', ['liveAlert:run', 'watch']);


  grunt.registerMultiTask('liveAlert', '', function(){
    if (grunt.fail.errorcount > 0 || grunt.fail.warncount > 0) {
        return false;
    }

    if(this.target === 'run'){
      liveAlert = new liveAlertBP(this.data.options);
      liveAlert.run();
    }else  
    if(this.target === 'css'){
      if(liveAlertMssages.length > 0){
          grunt.fail.warn('live_alert');
          
          liveAlert.open(
              liveAlertFormatterPostcss(liveAlertMssages)
          );
      }
    }

    liveAlertMssages = [];
  });


  /*
    https://postcss.org/api/#csssyntaxerror
    https://postcss.org/api/#warning
   */
  function postcssOnError(err) {
    callNoMoreOftenThan(2000).then(function(){
      liveAlert.open(
        live_alert_formatter_postcss(err, {})
      );
    }); 
  }


  function formatterStylelint(results, returnValue) {
    liveAlert.open(
      liveAlertFormatterStylelint(results)
    ); 
    
    return results;
  }

}
