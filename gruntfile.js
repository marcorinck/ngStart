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
		outputDir: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>',
		clean: {
			all: ['<%=pkg.folders.build %>']
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
		ngtemplates: {
			production: {
				cwd: '<%= pkg.folders.wwwRoot %>',
				src: 'modules/**/*.html',
				dest: '<%= pkg.folders.build %>/templates.js',
				options: {
					htmlmin: {
						collapseBooleanAttributes: true,
						removeAttributeQuotes: true,
						removeComments: true,
						removeEmptyAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					},
					bootstrap:  function(module, script) {
						return 'define(["angular"], function (angular) {"use strict"; var templates = angular.module("templates", []); templates.run(["$templateCache", function($templateCache) {' + script + '}]); return templates; });';
					}
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "<%= pkg.folders.jsSource %>",
					name: "../../bower_components/almond/almond",
					include: "main",
					mainConfigFile: "<%= pkg.folders.jsSource %>/main.js",
					out: "<%= outputDir %>/modules/main.js",
					optimize: "uglify2",
					paths: {
						'angular':'../../bower_components/angular/angular.min',
						'config/configuration': 'config/<%=configuration%>',
						'templates': '../../<%= pkg.folders.build %>/templates'
					},
					generateSourceMaps: false,
					preserveLicenseComments: true,
					useSourceUrl: true,
					uglify2: {
						// TODO - angular.js is already minified, mangling destroys it, so mangling is currently globally disabled
						mangle: false
					}
				}
			}
		},
		less: {
			development: {
				options: {
					modifyVars: {
						"fa-font-path": '"../app/fonts/"',
						"icon-font-path": '"../app/fonts/"'
					}
				},
				files: {
					"<%=pkg.folders.build + '/' + pkg.name %>.css": "<%=pkg.folders.wwwRoot%>/less/<%=pkg.name %>.less"
				}
			},
			production: {
				options: {
					cleancss: true,
					report: 'gzip'
				},
				files: {
					"<%= outputDir %>/css/<%=pkg.name %>.css": "<%=pkg.folders.wwwRoot%>/less/<%= pkg.name%>.less"
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ["last 2 android versions", "last 2 chrome versions", "last 2 chromeandroid versions", "last 2 BlackBerry versions", "last 2 Firefox versions", "last 2 FirefoxAndroid versions", "last 2 iOS versions", "last 2 OperaMobile versions", "last 2 Safari versions", "last 2 ExplorerMobile versions"]
			},
			development: {
				src: '<%=pkg.folders.build%>/<%= pkg.name %>.css',
				dest: '<%=pkg.folders.build%>/<%= pkg.name%>.css'
			},
			production: {
				options: {
					cascade: false
				},
				src: "<%= outputDir %>/css/<%= pkg.name %>.css",
				dest: "<%= outputDir %>/css/<%= pkg.name %>.css"
			}
		},
		processhtml: {
			build: {
				files: {
					"<%= outputDir %>/index.html": ['<%=pkg.folders.wwwRoot%>/index.html']
				}
			}
		},
		appcache: {
			options: {
				basePath: "<%= outputDir %>"
			},
			build: {
				dest: "<%= outputDir %>/<%= pkg.name %>.manifest",
				cache: "<%= outputDir %>/**/*",
				network: '*',
				fallback: ''
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
				cwd: '<%= outputDir %>/'
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
				files: ['<%=pkg.folders.wwwRoot %>' + '**/*.html'],
				options: {
					livereload: true
				}
			},
			less: {
				files: ['<%=pkg.folders.wwwRoot %>' + 'less/*'],
				tasks: ['less:development', 'autoprefixer:development'],
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
				tasks: ['jshint', 'karma:development:run']
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
		connect: {
			server: {
				options:  {
					port: 8000,
					base: '',
					hostname: '*'
				}
			}
		},
		copy: {
			images: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/images/build/',
					src: ['**', "!**/README"],
					cwd: '<%= pkg.folders.wwwRoot%>images/build/'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/fonts/',
					src: ['**'],
					cwd: '<%= pkg.folders.wwwRoot%>fonts/'
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
					dest: '<%= outputDir %>/',
					src: ['.htaccess'],
					cwd: '<%= pkg.folders.wwwRoot%>'
				}]
			},
			translations: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/translations/',
					src: ['*.json'],
					cwd: '<%= pkg.folders.wwwRoot%>/translations/'
				}]
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
		push: {
			options: {
				files: ['package.json', 'bower.json'],
				add: true,
				addFiles: ['.'], // '.' for all files except ingored files in .gitignore
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ["-a"], // '-a' for all files
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				npm: true,
				npmTag: 'Release v%VERSION%',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		}
	});

	grunt.registerTask("install", "Create a deployable artifact for server environments",
		function (system) {
			grunt.task.run("jshint");
			grunt.task.run("clean:all");

			if (system) {
				grunt.config('configuration', "configuration_" + system);
			} else {
				grunt.config('configuration', "configuration");
			}

			grunt.task.run("ngtemplates");
			grunt.task.run("requirejs");
			grunt.task.run("less:production");
			grunt.task.run("autoprefixer:production");
			grunt.task.run("copy:images");
			grunt.task.run("copy:fonts");
			grunt.task.run("copy:htaccess");
			grunt.task.run("copy:translations");
			grunt.task.run("processhtml:build");
			grunt.task.run("appcache:build");
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
	grunt.registerTask('web', ['less:development', 'autoprefixer:development', 'connect:server', 'karma:development', 'watch']);

	//call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
  require('load-grunt-tasks')(grunt);
};
