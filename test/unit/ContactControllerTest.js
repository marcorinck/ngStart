/**
 * the controller needs to be loaded explicitly with requireJS as the normal application only registers the
 * controllers inside the route definitions, which are not evaluated during testing, so they are not known to angularJS
 */
define(["contact/ContactController"], function(ContactController) {

	"use strict";
	describe("the contactservice", function () {
		var contactController, scope;

		beforeEach(function () {
			//load contact module, see http://docs.angularjs.org/api/angular.mock.inject
			module("contact");
			module("config");

			inject(["$rootScope", "$controller", function ($rootScope, $controller) {
				//instantiate the controller with a newly created scope
				scope = $rootScope.$new();
				contactController = $controller(ContactController, {$scope: scope});
				//this would fail -> $controller("ContactController", {$scope: scope});
			}]);
		});


		it("should be the authors name", function () {
			expect(scope.author).toBe("Marco Rinck");
		});
	});

});
