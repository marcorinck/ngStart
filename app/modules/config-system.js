System.config({
    baseURL: '/app/modules',
    transpiler: 'babel',
    //defaultJSExtensions: true,
    babelOptions: {

    },
    map: {
        angular: 'external-libs/angular.js',
        'angular-route': 'external-libs/angular-route.js',
        'angular-mocks': 'external-libs/mock/angular-mocks.js',
        'translate': 'external-libs/angular-translate.js',
        'translate-static-loader': 'external-libs/angular-translate-loader-static-files.js',
        'translate-handler-log': 'external-libs/angular-translate-handler-log.js',
        'babel': 'external-libs/babel-core/browser.js'
    },
    meta: {
        'angular': { deps: [], exports: 'angular' },
        'translate': {deps: ['angular']},
        'translate-static-loader': {deps: ['translate']},
        'translate-handler-log': {deps: ['translate']},
        'angular-route': {deps: ['angular']},
        'angular-mocks': {deps: ['angular']}
    }
});
