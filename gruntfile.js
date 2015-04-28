module.exports = function (grunt) {
    grunt.initConfig({
        shell: { 
        	server: {
                //command: ""
                //command: "python test_server.py"
    			command: 'java -jar L1.2-1.0-jar-with-dependencies.jar'
    		}
    	},

    	fest: {
    		templates: {
    			files: [{
        			expand: true,
        			cwd: 'templates',
        			src: '*.xml',
        			dest: 'public_html/js/tmpl'
    			}],
    			options: {
    				template: function (data) {
	    				return grunt.template.process(
							'define(function () { return <%= contents %> ; });',
	        				{data: data}
	    				);
					}			
    			} 
    		}	
    	},

    	watch: {
    		fest: {
	    		files: ['templates/*.xml'], 
	    		tasks: ['fest'],
	    		options: {
	        		atBegin: true 
	    		}
			},
			server: { 
    			files: ['public_html/js/**/*.js'], 
    			options: {
        			livereload: true 
    			}
			},
            sass: {
                files: [
                  'public_html/css/scss/*.scss',
                  'public_html/css/scss/**/*.scss'
                ],
                tasks: ['sass:dist'],
                options: {
                    atBegin: true,
                    livereload: true
                } 
            }
		},

        sass: {
            dist: {
                files: {
                    'public_html/css/my.css': 'public_html/css/scss/my.scss'
                }
            },
        },

		concurrent: {
			target: ['watch', 'shell'], /* Подзадача */
			options: {
        		logConcurrentOutput: true, /* Вывод процесса */
			}
		}
    });
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['concurrent']);
};