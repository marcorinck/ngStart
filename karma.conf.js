var basePath, files, exclude, reporters, port, runnerPort, colors, logLevel, autoWatch, browsers,
	captureTimeout, singleRun, preprocessors, coverageReporter;
// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
	JASMINE,
	JASMINE_ADAPTER,
    REQUIRE,
	REQUIRE_ADAPTER,
	{pattern:'src/test/external-libs/angular-mocks.js', included:false},
    {pattern: 'src/main/**/*', included : false},
	{pattern:'src/test/unit/**/*.js', included:false},
	'src/test/main-test.js',

	//UI-Tests
    'src/test/external-libs/uitest.js',
    'src/test/ui/testutils.js',
    'src/test/ui/**/*Spec.js'
];


// list of files to exclude
exclude = [
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
if (process.platform === "win32") {
	reporters = ['dots'];
} else {
	reporters = ['dots', 'junit', 'coverage'];
}



// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
if (process.platform === "win32") {
	colors = true;
} else {
	colors = false;
}


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
if (process.platform === "win32") {
	logLevel = LOG_INFO;
} else {
	logLevel = LOG_INFO;
}


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
if (process.platform === "win32") {
	browsers = ['Chrome'];
} else {
	browsers = ['PhantomJS'];
}


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 10000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit

if (process.platform === "win32") {
	singleRun = false;
} else {
	singleRun = true;
}


if (process.platform === "win32") {
	preprocessors = {
	};
} else {
	preprocessors = {
		'**/src/main/js/config/*.js':'coverage',
		'**/src/main/js/controllers/*.js':'coverage',
		'**/src/main/js/services/*.js':'coverage',
		'**/src/main/js/filters/*.js':'coverage',
		'**/src/main/js/locales/*.js':'coverage',
		'**/src/main/js/directives/*.js':'coverage'
	};
}

if (process.platform === "win32") {
	coverageReporter = {
	};

} else {
	coverageReporter = {
		type:'cobertura',
		dir:'coverage/',
		file: 'coverage.xml'
	};
}