module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },

	browserSync: {
		bsFiles: {
			src : [
        'css/*.css',
				'./*.html',
				'js/*.js'
      ]
		},
		options: {
			server: {
				baseDir: "./"
			}
		}
	},
	
	watch: {
		scripts: {
			files: ['scss/*.scss'],
			tasks: ['sass'],
			options: {
				spawn: false,
			},
		}
	}
  });
  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'watch']);
};