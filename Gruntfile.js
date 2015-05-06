module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less:{
			compile:{
				files: {
					'public/styles/main.css': ['public/styles/main.less']
				}
			}
		},
		concat: {
			js : {
				src : [
					'public/scripts/main.js'
				],
				dest : 'public/scripts/main.js'
			}
		},

		cssmin: {
			css: {
				src: [
					'public/styles/main.css'
				], 
				dest: 'public/styles/main.min.css'
			}
		},
		uglify : {
			js: {
				files: {
					'public/scripts/main.min.js' : [ 'public/scripts/main.js' ]
				}
			}
		},
		watch: {
			cssFiles: {
				files: ['public/styles/components/*', 'public/styles/main.less'],
				tasks: ['less', 'cssmin:css']
			},
			jsFiles: {
				files: ['public/scripts/*'],
				tasks: ['concat:js','uglify:js'],
				options:{
					spawn:false
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['less', 'concat:js', 'cssmin:css', 'uglify:js']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.oklns('Huge');
	});
};
