'use strict';

const 
  sass = require('sass'),
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterPostcss = require('live-alert-bp-formatter-postcss'),
  liveAlertFormatterSass = require("live-alert-bp-formatter-sass"),
  postcssOnAlert = require("postcss-on-alert"),
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
          onError: function(error){
            liveAlert.open(
              liveAlertFormatterSass(error)
            );
          },
          sass: {
            implementation: sass,
            sourceMap: true
          }
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
              require('stylelint')({
                customSyntax: 'postcss-scss',
                failAfterError: true,
                fix: false               
              }), 
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
          tasks: ['sass', 'postcss:lint', 'postcss:css', 'liveAlert:css']
      }        
    },
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-scss');
  grunt.loadNpmTasks('@lodder/grunt-postcss');
  grunt.loadNpmTasks('grunt-stylelint');


  grunt.registerTask('start', ['liveAlert:run', 'watch']);


  grunt.registerMultiTask('liveAlert', '', function(){

    if(this.target === 'run'){
      liveAlert = new liveAlertBP(this.data.options);
      liveAlert.run();
    }else  
    if(this.target === 'css'){
      if(liveAlertMssages.length > 0){
        //grunt.fail.warn('live_alert');

        liveAlert.open(
          liveAlertFormatterPostcss(liveAlertMssages)
        );
      }else{
        if (grunt.fail.errorcount === 0 && grunt.fail.warncount === 0) {
          liveAlert.resetError();
          liveAlert.close();

          if(this.data.options.reloadNotification === true){
            liveAlert.reloadNotification();
          }        
        }
      }
    }

    liveAlertMssages = [];
    grunt.fail.errorcount = 0;
    grunt.fail.warncount = 0;
  });


  function postcssOnError(err) {
    callNoMoreOftenThan(2000).then(function(){
      liveAlert.open(
        liveAlertFormatterPostcss(err)
      );
    }); 
  }

}