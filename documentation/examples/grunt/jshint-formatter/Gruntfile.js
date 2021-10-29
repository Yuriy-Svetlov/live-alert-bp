'use strict';

const 
  liveAlertBP = require("live-alert-bp"),
  liveAlertFormatterJShint = require("live-alert-bp-formatter-jshint");

var 
  liveAlert;

module.exports = function(grunt) {

  grunt.initConfig({
    
    liveAlert: {
      run: {
        options: {
            host: '127.0.0.1',
            port: '8080'
        }
      },    
      js: {
        options: {
            reloadNotification: true
        }        
      },
    },

    jshint: {
        options: {
          jshintrc: true,
          reporter: require('grunt-jshint-event-reporter')
        },
        all: ['src/js/**/*.js']
    },

    uglify: {
        build777: {
          files: [{
            expand: true,
            cwd: 'src',
            src: 'js/**/*.js',
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
      js: {
          files: ['src/**/*.js'],
          tasks: ['jshint:all', 'uglify', 'liveAlert:js']
      },       
    },

  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');


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


  grunt.event.on('jshint-error', function(err){

    liveAlert.open(
      liveAlertFormatterJShint(err)
    );

    /*
    if(msg.length > 0){
      liveAlert.open(msg);
    }else{
      liveAlert.resetError();
      liveAlert.close();
      liveAlert.reloadNotification();
    }
    */
  });
  
}
