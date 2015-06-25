import angular from 'angular';
import configuration from 'config/configuration';

let standardAngularModules = ["ngRoute", "about", 'ngstart', "contact", "navbar", "pascalprecht.translate", "config", "templates"],
    module = angular.module('config', []),
	config = {
		standardAngularModules: standardAngularModules
	};

if (configuration.useMock) {
	standardAngularModules.push("ngMockE2E");
}

module.constant("config", configuration);

export default config;