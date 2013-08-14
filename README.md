#Angular Template Project

This project is a grunt project. You need a running [grunt](http://gruntjs.com/) and [nodeJS](http://nodejs.org/) installation.

##Installation:

	npm install

##Features:

This project is a skeleton to use for new angular projects. It works out of the box without changes and contains
all the boiler plate code to setup a new project. It contains hooks for your production code, unit tests,
deployment, module loading and much more.

The following libraries are used:

* [angularJS](http://angularjs.org/) (of course)
* [bower](https://github.com/bower/bower) (for dependeny management of javascript libraries to be loaded in browser)
* [requireJS](http://requirejs.org/) (for javascript module loading)
* [jslint](http://www.jslint.com/) (for quality javascript code)
* [grunt-manifest](https://github.com/gunta/grunt-manifest) (an appcache manifest will be created while creating a deployable artifact)
* [grunt-targethtml](https://github.com/changer/grunt-targethtml) (filtering of html files for deployment on production servers)
* [karma](http://karma-runner.github.io/) (as a test runner for unit tests and ui tests)

###Differences to yeoamn
This project is very similar to [yeoman](). As much as I like yeoman and how cool it is to use it, its also very
heavy as a technology stack. This project is much lighter (besides node, grunt and bower, you need nothing installed) with
similar, but hardcoded features.

However, there are no features like yeoman generators. Its just a project with as much freedom as *I* (Marco Rinck) like.

##Usage

While running local web server following actions will be run automatically:
	* unit-tests (after changes in javascript files)
	* live reloading of ressources (after changes in HTML/JS/CSS files)

To start the local web server:

	grunt web

Create a deployable artifact for your real webserver:

	grunt install