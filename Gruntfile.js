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
        tasks:['compass:dev'],
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
      dev: {
        options: {
          sassDir: 'sass',
          config: 'config.rb',
          bundleExec: true,  // use Bundler specified versions
          outputStyle: 'expanded'
        }
      },
      stage: {
        options: {
          sassDir: 'sass',
          config: 'config.rb',
          bundleExec: true,  // use Bundler specified versions
          outputStyle: 'compressed'
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
  grunt.registerTask('default', ['coffee','compass:dev', 'watch']);
  grunt.registerTask('stage', ['coffee','compass:stage', 'watch']);

};
