module.exports = function(grunt) {

  _ = grunt.util._
  path = require('path')

  baseDirectory = '.'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    haml: {
      options: {
        language: 'coffee',
        placement: 'amd',
        uglify: true,
        customHtmlEscape: 'haml.escape',
        customPreserve: 'haml.preserve',
        customCleanValue: 'haml.clean',
        dependencies: {
          'haml': 'lib/base/haml'
        }
      },
      compile: {
        files: [
          {
            expand: true,
            filter: 'isFile',
            cwd: "" + baseDirectory + "/src/templates",
            dest: "" + baseDirectory + "/temp/scripts/templates",
            src: '**/*.haml',
            ext: '.html'
          }
        ],
        options: {
          target: 'html'
        }
      },
      index: {
        dest: "" + baseDirectory + "/temp/index.html",
        src: "" + baseDirectory + "/src/index.haml"
      }
    },
    sass: {
      compile: {
        dest: "" + baseDirectory + "/temp/styles/main.css",
        src: "" + baseDirectory + "/src/styles/main.scss",
        options: {
          loadPath: path.join(path.resolve('.'), baseDirectory, 'temp')
        }
      }
    },
    watch: {
      haml: {
        files: 'src/templates/**/*.haml',
        tasks: 'haml:compile',
        options: {
          interrupt: true
        }
      },
      compass: {
        files: 'src/styles/**/*.scss',
        tasks: 'sass:compile',
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['haml', 'sass', 'watch']);
  grunt.registerTask('scss', ['sass']);

};