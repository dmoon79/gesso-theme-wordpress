'use strict';

var paths = {
  js: ['js/**/*.js'],
  html: ['**/*.{php,html}'],
  coffee: ['*.coffee'],
  sass: ['sass/**/*.{scss,sass}'],
  images:['images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
  css: ['css/**/*.css']
};

module.exports = function(grunt) {

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: paths.js,
        tasks: ['jshint', 'uglify'],
        options: {
          livereload: true
        }
      },
      html: {
        files: paths.html,
        options: {
          livereload: true,
          interval: 500
        }
      },
      sass:{
        files: paths.sass,
        tasks:['compass'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: paths.css,
        // tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },
    // JSHINT
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    // COMPASS
    compass:{
      dist: {
        options: {
          sassDir: 'sass',
          config: 'config.rb'
        }
      }
    },
    // UGLIFY
    // uglify: {
    //   core: {
    //     options: {
    //       mangle: false
    //     },
    //     files: '<%= assets.core.js %>'
    //   }
    // },
    // CSSLINT
    // csslint: {
    //   options: {
    //     csslintrc: '.csslintrc'
    //   },
    //   src: paths.css
    // },
    // CSS MINIFY
    // cssmin: {
    //   core: {
    //     files: paths.css
    //   }
    // },
    coffee: {
      build: {
        expand: true,
        cwd: 'js/',
        src: paths.coffee,
        dest: './js',
        ext: '.js'
      }
    },
    // browserSync: {
    //   dist: {
    //     bsFiles: {
    //         src : [paths.css, paths.html, paths.images, paths.js]
    //     },
    //     options: {
    //         proxy: paths.localDev,
    //         browser: ["google chrome"],
    //         minify: false,
    //         watchTask: true
    //     }
    //   }
    // }
  });

  //Load NPM tasks
  require('load-grunt-tasks')(grunt);

  //Test task.
  grunt.registerTask('default', ['browserSync', 'coffee','compass', 'watch']);

};
