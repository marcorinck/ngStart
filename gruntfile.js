/*global module: true */
module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> */'
		},
		clean: {
			all: ['<%=pkg.folders.build %>'],
			css: {
				src: ['<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/*.css',
						'!<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css']
			}
		},
		jshint: {
			src: '<%=pkg.folders.jsSource %>' + '**/*.js',
			grunt: ['gruntfile.js'],
			options: {
				jshintrc: '.jshintrc',
				globals: {
				}
			}
		},
		watch: {
			javascript: {
				files: ['<%=pkg.folders.jsSource %>' + '**/*.js'],
				tasks: ['jshint', 'karma:development:run'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['<%=pkg.folders.wwwRoot %>' + '*.html'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['<%=pkg.folders.wwwRoot %>' + 'css/*'],
				options: {
					livereload: true
				}
			},
			images: {
				files: ['<%=pkg.folders.wwwRoot %>' + 'images/*'],
				options: {
					livereload: true
				}
			},
			karma: {
				files: ['<%=pkg.folders.testRoot + "**/*.js" %>'],
				tasks: ['karma:development:run']
			}
		},
		targethtml: {
			build: {
				files: {
					'<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/': '<%=pkg.folders.wwwRoot %>*.html'
				}
			}
		},
		copy: {
			css: {
				files: [{
					expand: true,
					dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
					src: ['*.css'],
					cwd: '<%= pkg.folders.wwwRoot%>css/'
				}]
			},
			images: {
				files: [{
					expand: true,
					dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/images/build/',
					src: ['**', "!**/README"],
					cwd: '<%= pkg.folders.wwwRoot%>images/build/'
				}]
			},
			modules: {
				files: [{
					expand: true,
					dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/modules/',
					src: ['**', '!**/*.js', "!**/README"],
					cwd: '<%= pkg.folders.wwwRoot%>modules/'
				}]
			},
			deploy: {
				files: [{
					expand: true,
					dest: '<%=deployOrdner %>',
					src: ['<%= pkg.name + "-" + pkg.version + ".tar.gz"%>'],
					cwd: '<%= pkg.folders.build%>'
				}]
			},
			htaccess: {
				files: [{
					expand: true,
					dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/',
					src: ['.htaccess'],
					cwd: '<%= pkg.folders.wwwRoot%>'
				}]
			}
		},
		cssmin: {
			css: {
				files: {
					'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css': [
							//include all css files in correct order, add new files in desired order
							'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/bootstrap.css',
							'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/bootstrap-responsive.css',
							'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/project.css'
						]
				}
			}
		},
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			development: {
				options: {
					background: true
				}
			},
			build: {
				options: {
					singleRun: true
				}
			}
		},
		compress: {
			tgz: {
				options: {
					mode: "tgz",
					archive: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '.tar.gz'%>"
				},
				expand: true,
				src:  ['**/*', '**/.*'],
				dest: '<%= pkg.name + "-" + pkg.version %>/',
				cwd: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/'
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "<%= pkg.folders.jsSource %>",
					name: "../../../bower_components/almond/almond",
					include: "main",
					mainConfigFile: "<%= pkg.folders.jsSource %>/main.js",
					out: "<%= pkg.folders.build + pkg.name + '-' + pkg.version %>/modules/main.js",
					optimize: "none",
					paths: {
						'angular':'../../../bower_components/angular/angular.min'
					},
					generateSourceMaps: true,
					preserveLicenseComments: false,
					useSourceUrl: true,
					uglify2: {
						// TODO - angular.js is already minified, mangling destroys it, so mangling is currently globally disabled
						mangle: false
					}
				}
			}
		},
		connect: {
			server: {
				options:  {
					port: 8000,
					base: '',
					hostname: '*'
				}
			}
		},
		manifest: {
			generate: {
				options: {
					basePath: "<%=pkg.folders.build + pkg.name + '-' + pkg.version%>",
					network: ["*"],
					fallback: [],
					exclude: [],
					preferOnline: false,
					timestamp: true
				},

				src: ["**/*", "!modules/main.js.map", "!modules/main.js.src",
					//TODO - remove folder names manually, update grunt-manifest to have it done automatically
					"!js", "!css", "!images", "!images/build", "!modules", "!modules/about", "!modules/contact",
					"!modules/navbar", "!modules/translations"],
				dest: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '/' + pkg.name %>.manifest"
			}
		},
		license: {
			options: {
				unknown: true,
				start: '.',
				depth: null,
				output: "file"
			}
		},
		dataUri: {
			dist: {
				src: ['<%=pkg.folders.wwwRoot %>css/*.css'],
				dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
				options: {
					target: ['<%=pkg.folders.wwwRoot %>images/*.*'],
					fixDirLevel: true,
					baseDir: '<%=pkg.folders.wwwRoot %>css'
				}
			}
		},
		release: {
			options: {
				npm: false
			}
		}
	});

	grunt.registerTask("install", "Create a deployable artifact for production servers",
		function () {
			grunt.task.run("jshint");
			grunt.task.run("clean:all");
			grunt.task.run("requirejs");
			grunt.task.run("dataUri");
			grunt.task.run("cssmin");
			grunt.task.run("clean:css");
			grunt.task.run("copy:images");
			grunt.task.run("copy:modules");
			grunt.task.run("copy:htaccess");
			grunt.task.run("targethtml:build");
			grunt.task.run("manifest");
			grunt.task.run("compress");
		}
	);

	grunt.registerTask('license', 'List all packages (and their sub-packages) that this project depends on with license information', function() {
		function convertToCsv(data) {
			var ret = "", module, licenses, repository;

			for (module in data) {
				if (data.hasOwnProperty(module)) {
					licenses = data[module].licenses || "";
					repository = data[module].repository || "";
					ret = ret + module + ";" + licenses + ";" + repository + "\r\n";
				}
			}

			return ret;
		}
		var checker = require('license-checker'),
			fs = require('fs'),
			done = this.async(),
			defaults = {
				start: '.',
				unknown: false,
				depth: 1,
				include: 'all',
				output: 'console', //console or file
				filename: 'LICENSES',
				format: 'json' //json or csv
			},
			options = grunt.util._.extend(defaults, this.options());

		checker.init(options, function(data){
			if (options.format === 'csv') {
				data = convertToCsv(data);
			} else {
				data = JSON.stringify(data, null, 4);
			}

			if (options.output === 'file') {
				fs.writeFile(options.filename, data, function() {
					console.log('Successfully written '.green + options.filename.grey);
					done();
				});
			} else if (options.output === 'console') {
				grunt.log.writeln(data);
			} else {
				grunt.log.writeln("Unknown output channel: " + options.output);
			}
		});
	});

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('web', ['connect', 'karma:development', 'watch']);

	//call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
