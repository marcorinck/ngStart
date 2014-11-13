(function () {
    "use strict";
    var uit = uitest.current,
        TestUtils = {};
    uit.feature("timeoutSensor", "intervalSensor", "jqmAnimationSensor", "angularIntegration", "mobileViewport", "xhrSensor");
    uit.trace(true);

// disable transitions and speed up timeout during ui tests for better test performance
    function jqueryMobileSpeedup() {
        uit.prepend(function (window) {
            // Allow at most 20ms as timeouts.
            var oldTimeout = window.setTimeout;
            window.setTimeout = function (fn, delay) {
                if (delay > 20) {
                    delay = 20;
                }
                return oldTimeout.call(this, fn, delay);
            };
        });

        // Disable transitions
        uit.append(function ($) {
            $.mobile.defaultPageTransition = "none";
            $.mobile.defaultDialogTransition = "none";
        });
    }

    jqueryMobileSpeedup();


    function activePage() {
        return uit.inject(function ($) {
            return $.mobile.activePage;
        });
    }

    function activePageId() {
        if (activePage() === null) {
            throw new Error("No active page found.");
        }
        return activePage().attr('id');
    }

    function findElementById(id) {
        return uit.inject(function ($) {
            return $("#" + id);
        });
    }

    function triggerEventOnElement(element, eventName) {
        return uit.inject(function ($) {
            $(element).trigger(eventName).change();
        });
    }

    function findElementByStyleClass(id) {
        return uit.inject(function ($) {
            return $("." + id);
        });
    }

    function findElementByTagName(tagName) {
        return uit.inject(function ($) {
            return $(tagName);
        });
    }

    function findElementBySelectorString(selector) {
        return uit.inject(function ($) {
            return $(selector);
        });
    }

    function isElementDisabled($element) {
        return $element.is(':disabled');
    }

    function isElementVisible($element) {
        return $element.is(':visible');
	}

	function hasStyleClass($element, styleClass)  {
		return uit.inject(function ($) {
			return $($element).hasClass(styleClass);
		});
	}

    TestUtils.uit = uit;
    TestUtils.activePageId = activePageId;
    TestUtils.activePage = activePage;
    TestUtils.findElementById = findElementById;
    TestUtils.findElementByTagName = findElementByTagName;
    TestUtils.findElementByStyleClass = findElementByStyleClass;
    TestUtils.triggerEventOnElement = triggerEventOnElement;
    TestUtils.isElementDisabled = isElementDisabled;
    TestUtils.findElementBySelectorString = findElementBySelectorString;
    TestUtils.isElementVisible = isElementVisible;
	TestUtils.hasStyleClass = hasStyleClass;
    window.TestUtils = TestUtils;

}());
