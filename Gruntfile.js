module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['js/*.js', 'Gruntfile.js'],
    },
    watch: {
      scripts: {
          files: ['js/*.js', 'Gruntfile.js'],
          tasks: ['jshint'],
          options: {
              spawn: false,
            },
        },
    },
    browserSync: { //
        dev: {
            bsFiles: {
                src: [
                    'css/*.css',
                    '*.html',
                    'js/*.js',
                  ],
              },
            options: {
                watchTask: true,
                server: true, // baseDir: "./" port - Default: 3000
              },
          },
      },

  });

  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browser-sync');

  // task for browserSync, jshint  on the run
  grunt.registerTask('wait', ['browserSync', 'watch']);

  // "npm test" runs these task(s)
  grunt.registerTask('test', ['jshint']);

  // Default task(s).
  grunt.registerTask('default', ['wait']);
};
