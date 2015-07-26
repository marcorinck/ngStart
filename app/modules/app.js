//jshint module:true
import angular from 'angular';
import config from 'config/config.js';
import 'translate';
import 'translate-static-loader';
import 'translate-handler-log';
import 'angular-route';
import 'about/about.js';
import 'contact/contact.js';
import 'navbar/navbar.js';
import 'ngstart/ngstart.js';

angular.module("app", config.standardAngularModules)
    .config(['$httpProvider', '$routeProvider', '$translateProvider', ($httpProvider, $routeProvider, $translateProvider) => {
        $translateProvider.useStaticFilesLoader({
            prefix: 'translations/',
            suffix: '.json'
        });
        $translateProvider.determinePreferredLanguage();
        $translateProvider.useMissingTranslationHandlerLog();

        $routeProvider.otherwise({redirectTo: '/'});
    }]
);

angular.bootstrap(document, ['app']);