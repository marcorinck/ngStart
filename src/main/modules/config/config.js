define(["angular", "config/configuration"], function(angular, configuration) {
   "use strict";

    var standardAngularModules = ["ngRoute", "about", "contact", "navbar", "pascalprecht.translate", "config"],
        config = angular.module('config', []);



    if (configuration.useMock) {
        standardAngularModules.push("ngMockE2E");
    }
    configuration.standardAngularModules = standardAngularModules;

    config.constant("config", configuration);

    return configuration;

});
