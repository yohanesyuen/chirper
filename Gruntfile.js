module.exports = function(grunt){
  grunt.initConfig({
//    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'app.js', 'routes/*.js', 'public/js/*.js'],
      options: {
        globals:{
          jQuery: true,
          $: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['jshint']);
};
