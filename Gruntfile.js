module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    name: '<%= pkg.name %>',

    jshint: {
        src: 'tasks/*.js',
        options: {
            jshintrc: '.jshintrc',
            reporter: require('reporter-plus/jshint')
          }
      },
    jscs: {
        src: 'tasks/*.js',
        options: {
            config: '.jscsrc',
            reporter: require('reporter-plus/jscs').path
          }
      },

    chromeload: {
        twitter: {
            reload_pattern: 'https?:\/\/(www\.)?twitter\.com',
            new_url: 'https://www.twitter.com'
          },
        google: {
            reload_pattern: 'https?:\/\/(\\w+?\.)?google\.com',
            new_url: 'https://www.google.com'
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadTasks('tasks');
};
