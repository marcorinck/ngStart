define(function () {
	"use strict";

	describe('contactController', function () {
		var contactService, contactScope;

		beforeEach(function () {

			module("services", function ($provide) {
				$provide.factory('contddactService', function () {
					var contactServiceMock = {};

					contactServiceMock.sendMessage = jasmine.createSpy();

					return contactServiceMock;
				});
			});

			inject(["contactService", "$controller",
				function (_contactService, $rootScope, $controller) {
					contactService = _contactService;
					contactScope = $rootScope.$new();
					$controller("contactController", {$scope:contactScope});
				}]);
		});

		describe('contactController', function () {
			it('should call contactService.sendMessage after sendMessage', function () {
				contactScope.sendMessage();
				expect(contactService.sendMessage).toHaveBeenCalled();
			});
		});
	});
});
