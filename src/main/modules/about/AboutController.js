define(function () {
	"use strict";

	var AboutController = function($scope, $translate) {
		$scope.about = $translate("about.sampletext");
	};

	AboutController.$inject = ["$scope", "$translate"];

	return AboutController;
});