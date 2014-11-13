define(function () {
	"use strict";

	var AboutController = function($scope, $translate) {

		$translate("about.sampletext").then(function(translation) {
			$scope.about = translation;
		});
	};

	AboutController.$inject = ["$scope", "$translate"];

	return AboutController;
});