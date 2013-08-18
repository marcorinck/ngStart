if (!window.jasmineui) {
    throw new Error("jasmineui not found");
}
if (typeof jasmineui === "object") {
    jasmineui.inject(function () {
        "use strict";
        var angularBackendServiceResults = {},
            programmedBackendServiceResults = {},
            inputEventSupported = document.createElement('div').hasOwnProperty("oninput");

        // disable transitions and speed up timeout during ui tests for better test performance
        function jqueryMobileSpeedup() {
            // Allow at most 20ms as timeouts.
            var oldTimeout = window.setTimeout;
            window.setTimeout = function (fn, delay) {
                if (delay > 20) {
                    delay = 20;
                }
                return oldTimeout.call(this, fn, delay);
            };

            // Disable transitions
            beforeLoad(function () {
                $.mobile.defaultPageTransition = "none";
                $.mobile.defaultDialogTransition = "none";
            });
        }

        jqueryMobileSpeedup();

        // -----

        function backendServiceResult(serviceName) {
            var res = programmedBackendServiceResults[serviceName];
            if (!res) {
                res = {
                    resolve:function (data) {
                        this.apply = function (defer) {
                            defer.resolve(data);
                            $("body").scope().$apply();
                        };
                        if (angularBackendServiceResults[serviceName]) {
                            this.apply(angularBackendServiceResults[serviceName]);
                        }
                    },
                    reject:function (data) {
                        this.apply = function (defer) {
                            defer.reject(data);
                            $("body").scope().$apply();
                        };
                        if (angularBackendServiceResults[serviceName]) {
                            this.apply(angularBackendServiceResults[serviceName]);
                        }
                    },
                    clear:function () {
                        delete programmedBackendServiceResults[serviceName];
                        delete angularBackendServiceResults[serviceName];
                        return backendServiceResult(serviceName);
                    }
                };
            }
            programmedBackendServiceResults[serviceName] = res;

            return res;
        }

        function angularBackendServiceResult($q, name) {
            var res = backendServiceResult[name];
            if (!res) {
                res = angularBackendServiceResults[name] = $q.defer();
                if (programmedBackendServiceResults[name]) {
                    programmedBackendServiceResults[name].apply(res);
                }
            }
            return res;
        }

        function createMockBackendService($q, service) {
            return jasmine.createSpy(service).andCallFake(function () {
                return angularBackendServiceResult($q, service).promise;
            });
        }

        function mockBackend() {
            var services = ['services',
                'contactService',
                'utilService',
                'authenticationService'];

            function backendServiceFactory($q) {
                var res = {}, customer, i, service;
                for (i = 0; i < services.length; i++) {
                    service = services[i];
                    res[service] = createMockBackendService($q, service);
                }
                angularBackendServiceResult($q, 'login').promise.then(function (c) {
                    customer = c;
                });
                res.authenticatedCustomer = function () {
                    return customer;
                };
                return res;
            }

            backendServiceFactory.$inject = ['$q'];
            angular.module(["services"]).factory('contactService', backendServiceFactory);
        }

        function contactService() {
            return $("body").injector().get("contactService");
        }

        // -----

        function activePage() {
            return $.mobile.activePage;
        }

        function activePageId() {
            if (activePage() === null) {
                throw new Error("No active page found.");
            }
            return activePage().attr('id');
        }

        function activatePage$(selector) {
            return $(selector, activePage());
        }

        function activePageScope() {
            if (activePage() === null) {
                throw new Error("No active page found.");
            }
            return activePage().scope();
        }

        function click(selector) {
            var element = activatePage$(selector);
            if (element.length !== 1) {
                throw new Error("No unique element found for " + selector);
            }
            element.click();
            element.scope().$root.$digest();
        }

        function count(selector) {
            var element = activatePage$(selector);
            return element.length;
        }

        function enabled(selector) {
            var element = activatePage$(selector);
            if (element.length !== 1) {
                throw new Error("No unique element found for " + selector);
            }
            return !element.attr('disabled');
        }

        function hasValidationError(selector) {
            var element = activatePage$(selector);
            if (element.length !== 1) {
                throw new Error("No unique element found for " + selector);
            }
            return element.hasClass('ng-invalid');
        }

        function triggerChangeEvent(element) {
            if (element[0].tagName.toLowerCase() === 'input' && inputEventSupported) {
                element.trigger('input');
            } else {
                element.trigger('change');
            }
        }

        function value(selector, localValue) {
            var element = activatePage$(selector), elementName;
            if (element.length !== 1) {
                throw new Error("No unique element found for " + selector);
            }
            if (arguments.length === 1) {
                elementName = element[0].nodeName.toUpperCase();
                if (elementName === 'INPUT' || elementName === 'SELECT') {
                    return element.val();
                }
                return element.text();

            }
            element.val(localValue);
            triggerChangeEvent(element);
            element.scope().$root.$digest();

            return undefined;
        }

        // -----

        function formatSimpleDate(date) {
            var injector = $(document.documentElement).injector();
            return injector.get("utilsService").formatSimpleDate(date);
        }

        function formatDate(date) {
            var injector = $(document.documentElement).injector();
            return injector.get("utilsService").formatDate(date);
        }

        // -----

        window.mockBackend = mockBackend;
        window.contactService = contactService;
        window.backendServiceResult = backendServiceResult;

        window.activePageScope = activePageScope;
        window.activePageId = activePageId;
        window.count = count;
        window.click = click;
        window.enabled = enabled;
        window.hasValidationError = hasValidationError;
        window.value = value;

        window.formatSimpleDate = formatSimpleDate;
        window.formatDate = formatDate;

    });
}