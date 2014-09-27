module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'src/js/**/*.js', 'test/js/**/*.js'],
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/**/*.js',
        dest: 'static/js/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'src/js/**/*.js',
      options: {
        specs: 'test/js/**/*.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jshint', 'jasmine',]);
  // Default task(s).
  grunt.registerTask('default', ['test', 'uglify']);

};
