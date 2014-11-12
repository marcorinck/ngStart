#ngStart 
[![Dependency Status](https://david-dm.org/marcorinck/ngStart.png)](https://david-dm.org/marcorinck/ngStart)
[![devDependency Status](https://david-dm.org/marcorinck/ngStart/dev-status.png)](https://david-dm.org/marcorinck/ngStart#info=devDependencies)


This project is a grunt project. You need a running [nodeJS](http://nodejs.org/), [grunt](http://gruntjs.com/) and
[bower](https://github.com/bower/bower) installation.

##Installation

Fork this project on github and/or download this project from github as a ZIP file.

After that, in the project root, issue the following commands:

	npm install
	bower install

Done.

##Features

This project is a skeleton to use for new angular projects. It works out of the box without changes and contains
all the boiler plate code to setup a new project and two example pages. It contains hooks for your production code, 
unit tests, deployment, module loading and much more.

The following libraries are used:

* [angularJS](http://angularjs.org/) (of course)
* [bower](https://github.com/bower/bower) (for dependeny management of javascript libraries to be loaded in browser)
* [requireJS](http://requirejs.org/) (for javascript module loading and optimization)
* [jslint](http://www.jslint.com/) (for quality checking of javascript code)
* [Twitter Bootstrap](http://www.getbootstrap.com) (Less source files)(http://www.lesscss.org), [Font Awesome](fortawesome.github.io/Font-Awesome/icons/) (Less source files and fonts) and [ui bootstrap](http://angular-ui.github.io/bootstrap/) included and fully configured
* [grunt-appcache](https://github.com/canvace/grunt-appcache/) (an appcache manifest will be created when creating a deployable artifact)
* [grunt-processhtml](https://github.com/dciccale/grunt-processhtml) (filtering of html files for deployment on production servers)
* [Less compiler](http://lesscss.org/) Less compiler is picking up your changes in Less files during development automatically and during build
* [karma](http://karma-runner.github.io/) (as a test runner for unit and ui tests)
* [angular-translate](https://github.com/PascalPrecht/angular-translate) (for i18n)

And many more. 
 
###Architecture

![Architecture](http://entwicklertagebuch.com/blog/wp-content/uploads/2013/10/modules-300x225.jpg)

I wrote a blog post about the architecture (aka folder structure) in this project: http://entwicklertagebuch.com/blog/2013/10/how-to-structure-large-angularjs-applications/

###angularJS

ngStart currently uses the stable version of angularJS 1.3.x. 

###Differences to yeoman and angular-seed
This project is very similar to [yeoman](http://yeoman.io/) or [angular-seed](https://github.com/angular/angular-seed).
As much as I like yeoman and as cool it is to use it, its also very heavy as a technology stack. This project is much
lighter (besides node, grunt and bower, you don't need to install anything) with similar, but hardcoded
(and thus limited) features.

There are no features like yeoman generators. Its just a project with as much freedom and as much boundaries as
**I** (Marco Rinck) like.

I don't know where angular-seeds stands today, but at the time I was new to angular (November 2012), I didn't understand
what happened in angular-seed at all and was quite confused what it was doing to make something work. But i wanted to learn,
so I took the hard way and learned it by making my own build system. Which eventually resulted in this sample project.

##Usage

During development you will want to use the `grunt web` target which will start a web server from where you can open your application.

While running this web server following actions will be run automatically:

* serve all project files via http://localhost:8000, URL for index page is [http://localhost:8000/src/main/index.html](http://localhost:8000/src/main/index.html)
* jslint all javascript files (after changes in javascript files)
* run unit tests (after changes in javascript files)
* start Less compiler after changes in Less files
* live reloading of ressources via grunt-watch (after changes in HTML/JS/Less files)

Create a deployable artifact for a server environment:

	grunt install

Create a deployable artifact for your production webserver:

	grunt install:prod

Release a new version of your project:

	grunt release

List all packages and their licenses this project depends on, in case your boss wants to know that.

 	grunt license

###Javascript files

To get the most out of the automated build and of configured requireJS all javascript files must be
[AMD modules](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)!

[src/main/modules/app.js](src/main/modules/app.js) is your main entrypoint for your own code. Declare a dependency in this file
to your own code and it will be automatically loaded by requireJS and will be included in the optimized javascript after
build for production use ( *grunt install* ). Look for the AboutController dependency if you need an example.

External packages should be included via bower. You can add additional dependencies in the included [bower.json](bower.json)
file. You need to run *bower install* after changes to this file.

If you need to include code that is not available as a bower module, I suggest you put it in
[src/main/external-libs](src/main/external-libs)

Currently there is no automated pick-up from bower dependencies for loading with requireJS. If you want to implement it,
please go ahead and fix [issue #4](https://github.com/marcorinck/ngStart/issues/4). Thanks!

So, after adding new dependencies you have to configure loading of the new files in 3 different project files:

1. [src/main/modules/main.js](src/main/modules/main.js) - this file is used during local development, please add your dependencies
to the existing *require.config* object: path for the file (without .js extension) and shim if this dependency needs other
packages to be present before loading this dependency
2. [src/test/main-test.js](src/test/main-test.js) - this file is used for test execution. It loads all your application (app.js)
and every file that ends with "Test.js" as requireJS modules automatically. You have to alter *require.config.path* and
*require.config.path* the same way you did in *main.js*
3. [gruntfile.js](gruntfile.js) - if you want to use a pre-minified version of your dependency you'll have to alter the
require.config.path configuration here.

You can use the existing angular configuration in both files as an example.

###HTML files

HTML files should go into the *src/main* folder and are filtered during *grunt install* build.

The included [index.html](index.html) can be used for local development out of the box without changes.
[grunt-targethtml](https://github.com/changer/grunt-targethtml) will filter all html files and will look for comment
sections like this:

````html
<!--(if target build)>
	<link rel="stylesheet" href="css/ngStart.css">
	<script src="js/main.js" data-main="main"></script></script>

<!(endif)-->
<!--(if target local)> -->
<!--<script type="text/javascript">parent.uitest && parent.uitest.instrument(window);</script>-->
	<script src="http://localhost:35729/livereload.js"></script>
	<link rel="stylesheet" href="css/sample.css">
	<script src="../../bower_components/requirejs/require.js" data-main="js/main"></script>
<!--<!(endif)-->
````

That is used to load javascript locally via requireJS and load the generated and optimized javascript file after
deploying the app to a production server.

The generated appcache manifest is included for production use only and not in local mode.

All html files in *src/main/* will be automatically filtered with [grunt-targethtml](https://github.com/changer/grunt-targethtml)

###Less files (compiled to CSS)

There are no CSS files included in the project as all stylings are based on Less compiler. 

Less files will be automatically compiled to CSS during development after changes to them and livereload will reload the changes automatically into the page. Twitter Bootstrap and Font Awesome are included via their Less source files too.

During grunt deployment build ( *grunt install* ) less compiler will be started with optimizations turned on. Result is an optimized CSS file which will be put in css folder and will be referenced in filtered index.html.

###Images

Its good practice to include small image files like icons as data-uris into the generated CSS files to save HTTP requests. Though data URI images are ~30% bigger than the original image, the browser saves heavily on HTTP requests. Thus, for icons its usually faster to load them as data URIs than directly via HTTP and as we are using Less compiler, its very easy to include images as data-uris.

````less
.icon {
  background-image: data-uri(images/icons.png);
}
````

The folder [src/main/images](src/main/images/) is meant for those images. As such, no files in this folder will be included in the deployment builds.

If you have bigger images (like in media galleries or large background images) you shouln't include them as data URIs because of the added file size. When you want to have images included during deployment build, you should place them in [src/main/images/build](src/main/images/build)

###Configuration

There is a configuration system taking care of angular module dependencies and requireJS module loading.

The standard configuration is in [src/main/modules/config/configuration.js](src/main/modules/config/configuration.js)
which is used during a install build without any parameters.

If you want to do builds for a different build environment (like a production or test server) you can create files as
[src/main/modules/config/configuration_environmentName.js](src/main/modules/config/configuration_environmentName.js).
Afterwards, you can do specific builds for these environments like this:

	grunt install:environmentName

The configuration parameters are available as an angular constant too, just declare an angularJS dependency to "config". There is an
example for that in [src/main/modules/contact/ContactController.js](src/main/modules/contact/ContactController.js)
