module.exports = function (grunt) {
    grunt.initConfig({
        shell: { 
        	server: {
                //command: ""
                //command: "python test_server.py"
    			command: 'java -jar Filler-1.0-jar-with-dependencies.jar'
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
            compress: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public_html/css/my.min.css': 'public_html/css/scss/my.scss'
                }
            },
            dist: {
                files: {
                    'public_html/css/my.css': 'public_html/css/scss/my.scss'
                }
            }
            
        },

		concurrent: {
			target: ['watch', 'shell'], /* Подзадача */
			options: {
        		logConcurrentOutput: true, /* Вывод процесса */
			}
		},
        requirejs: {
            build: { /* Подзадача */
                options: {
                    almond: true,
                    baseUrl: "public_html/js",
                    mainConfigFile: "public_html/js/config.js",
                    name: "config",
                    optimize: "none",
                    out: "public_html/js/build/main.js"
                } 
            }
        },
        concat: {
            build: { /* Подзадача */
                separator: ';\n',
                src: [
                    'public_html/js/lib/almond/almond.js',
                    'public_html/js/build/main.js'
                ],
                dest: 'public_html/js/build.js'
            }
        },
        uglify: {
            build: { /* Подзадача */
                files: {
                    'public_html/js/build.min.js': ['public_html/js/build.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('build',['fest', 'requirejs:build','concat:build', 'uglify:build', 'sass:compress']);
    grunt.registerTask('default', ['concurrent']);
};