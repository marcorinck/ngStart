define(["angular", "config/configuration"], function(angular, configuration) {
   "use strict";

    var standardAngularModules = ["about", "contact", "navbar", "pascalprecht.translate", "config"],
        standardRequireModules = ["angular", "translate", "translate-static-loader", "translate-handler-log", "app"],
        config = angular.module('config', []);



    if (configuration.useMock) {
        standardAngularModules.push("ngMockE2E");
        standardRequireModules.push("angular-mocks");
    }
    configuration.standardAngularModules = standardAngularModules;
    configuration.standardRequireModules = standardRequireModules;

    config.constant("config", configuration);

    return configuration;

});
