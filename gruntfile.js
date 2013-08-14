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
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				unused: true,
				browser: true,
				strict: true,
				jquery: true,
				bitwise: true,
				trailing: true,
				regexp: true,
				nonew: true,
				forin: true,
				globals: {
					angular: true,
					moment: true,
					console: true,
					define: true,
					require: true
				}
			}
		},
		watch: {
			javascript: {
				files: ['<%=pkg.folders.jsSource %>' + '**/*.js'],
				tasks: ['jshint'],
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
				files: ['<%=pkg.folders.testRoot %>/ui/' + '**/*.js'],
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
					src: ['**'],
					cwd: '<%= pkg.folders.wwwRoot%>images/build/'
				}]
			},
			font: {
				files: [{
					expand: true,
					dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/font/',
					src: ['**'],
					cwd: '<%= pkg.folders.wwwRoot%>font/'
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
					'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<&= pkg.name &>.css': [
							//include all css files in correct order, add new files in desired order
							'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/sample.css'
						]
				}
			}
		},
		karma: {
			development: {
				options: {
					configFile: 'karma.conf.js',
					background: true
				}
			},
			build: {
				options: {
					configFile: 'karma.conf.js',
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
					name: "../../bower_components/almond/almond",
					include: "main",
					mainConfigFile: "<%= pkg.folders.jsSource %>/main.js",
					out: "<%= pkg.folders.build + pkg.name + '-' + pkg.version %>/js/main.js",
					optimize: "uglify2",
					paths: {
						'angular':'../../bower_components/angular/angular.min'
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

				src: ["**/*", "!js/main.js.map", "!js/main.js.src", "!**/apple-touch-icon-precomposed.png",
					//TODO - remove folder names manually, update grunt-manifest to have it done automatically
					"!js", "!css", "!images", "!images/build"],
				dest: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '/' + pkg.name %>.manifest"
			}
		},
//		license: {
//			options: {
//				unknown: false,
//				start: '.',
//				depth: null,
//				format: "csv"
//			}
//		},
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
			grunt.task.run("copy:font");
			grunt.task.run("copy:htaccess");
			grunt.task.run("targethtml:build");
			grunt.task.run("manifest");
			grunt.task.run("compress");
		}
	);

	//TODO - use a grunt plugin for version management
	grunt.registerTask("release", "Update version number",
		function (versionNumber) {
			var pkg, versions;
			if (!versionNumber) {
				grunt.fatal("Die Angabe welche Versionsnummer erhöht werden soll, ist zwingend notwendig ('Major', 'Release' oder 'Hotfix')");
			}

			if (versionNumber !== 'Major' && versionNumber !== 'Release' && versionNumber !== 'Hotfix') {
				grunt.fatal("Die zu erhöhende Versionsnummer muss 'Major', 'Release' oder 'Hotfix' sein: " + versionNumber);
			}

			pkg = grunt.file.readJSON('./package.json');
			grunt.log.writeln("Bisherige Version: " + pkg.version);

			versions = pkg.version.split(".");

			if (versionNumber === 'Major') {
				versions[0] = parseInt(versions[0], 10) + 1;
				versions[1] = 0;
				versions[2] = 0;
			} else if (versionNumber === 'Release') {
				versions[1] = parseInt(versions[1], 10) + 1;
				versions[2] = 0;
			} else if (versionNumber === 'Hotfix') {
				versions[2] = parseInt(versions[2], 10) + 1;
			}

			pkg.version = versions.join(".");

			grunt.log.writeln("Neue Version: " + pkg.version);
			grunt.file.write('./package.json', JSON.stringify(pkg, undefined, '\t'));
			grunt.log.writeln("");
			grunt.log.writeln("package.json wurde erfolgreich aktualisiert.");

		}
	);

//	grunt.registerTask('license', 'Erstellt die Datei LICENSES mit einer Liste aller im Projekt verwendeten NPM-Module und deren Lizenz und Homepage (falls bekannt), standardmässig im CSV-Format', function() {
//		function convertToCsv(data) {
//			var ret = "", module, licenses, repository;
//
//			for (module in data) {
//				if (data.hasOwnProperty(module)) {
//					licenses = data[module].licenses || "";
//					repository = data[module].repository || "";
//					ret = ret + module + ";" + licenses + ";" + repository + "\r\n";
//				}
//			}
//
//			return ret;
//		}
//		var checker = require('license-checker'),
//			fs = require('fs'),
//			done = this.async(),
//			defaults = {
//				start: '.',
//				unknown: false,
//				depth: 1,
//				include: 'all',
//				output: 'LICENSES',
//				format: 'json' //json or csv
//			},
//			options = grunt.util._.extend(defaults, this.options());
//
//		checker.init(options, function(data){
//			if (options.output) {
//				if (options.format === 'csv') {
//					data = convertToCsv(data);
//				} else {
//					data = JSON.stringify(data, null, 4);
//				}
//
//				fs.writeFile(options.output, data, function() {
//					console.log('Successfully written '.green + options.output.grey);
//					done();
//				});
//			}
//		});
//	});

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('web', ['connect', 'watch']); //'karma:development'

	//call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
