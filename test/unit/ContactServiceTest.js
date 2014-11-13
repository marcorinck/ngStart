define(function() {
	"use strict";
	describe("the contactservice", function () {
		var contactService;

		beforeEach(function () {
			//load contact module,    see http://docs.angularjs.org/api/angular.mock.inject
			module("contact");

			//properly instantiate the service
			inject(["ContactService", function (_contactService) {
				contactService = _contactService;
			}]);

			console.log = jasmine.createSpy('console');
		});


		it("should log messages to console", function () {
			contactService.message.text = "Testmessage";
			contactService.sendMessage();
			expect(console.log).toHaveBeenCalled();
			expect(console.log.calls.mostRecent().args[0]).toContain("Testmessage");
		});
	});

});
