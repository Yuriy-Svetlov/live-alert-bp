'use strict';

const 
  sass = require('sass'),
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterStylelint = require("live-alert-bp-formatter-stylelint"),
  liveAlertFormatterSass = require("live-alert-bp-formatter-sass");

var
  liveAlert,
  live_alert_messages = [];

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

    stylelint: {
      options: {
        customSyntax: 'postcss-scss',
        formatter: formatterStylelint,
        failOnError: true,
        fix: false
      },
      src: ['src/scss/*.scss']
    },

    sass: {
      options: {
        onError: function(error){
          liveAlert.open(
            liveAlertFormatterSass(error)
          );
        },
        sass: {
          sourceMap: true
        }
      },
      a: {
        files: [{
          expand: true,
          cwd: 'src/scss/',
          src: ['**/*.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      },

      b: {       
          files: {
            'src/css/main.css': 'src/scss/main.scss'
          }
        }     
    },

    postcss: {
      css: {
        options: {
          map: false,
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
        tasks: ['stylelint', 'sass:a', 'postcss:css', 'liveAlert:css']
      }        
    },

  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('@lodder/grunt-postcss');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-sass-scss');


  // Register Task
  grunt.registerTask('start', ['liveAlert:run', 'watch']);


  grunt.registerMultiTask('liveAlert', '', function() {
    if (grunt.fail.errorcount > 0 || grunt.fail.warncount > 0) {
        return false;
    }
    
    if(this.target === 'run'){
      liveAlert = new liveAlertBP(this.data.options);
      liveAlert.run();
    }else{
      liveAlert.resetError();
      liveAlert.close();

      if(this.data.options.reloadNotification === true){
        liveAlert.reloadNotification();
      }
    }
  });


  function formatterStylelint(results, returnValue) {
    liveAlert.open(
      liveAlertFormatterStylelint(results)
    ); 
    
    return results;
  }
  
}
