#ngStart [![Dependency Status](https://gemnasium.com/marcorinck/ngStart.png)](https://gemnasium.com/marcorinck/ngStart)

This project is a grunt project. You need a running [grunt](http://gruntjs.com/), [nodeJS](http://nodejs.org/) and
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
* [grunt-manifest](https://github.com/gunta/grunt-manifest) (an appcache manifest will be created when creating a deployable artifact)
* [grunt-targethtml](https://github.com/changer/grunt-targethtml) (filtering of html files for deployment on production servers)
* [grunt-data-uri](https://github.com/ahomu/grunt-data-uri) Embeds all referenced images in css files in the generated project css file, which is optimized by grunt
* [karma](http://karma-runner.github.io/) (as a test runner for unit and ui tests)
* [angular-translate](https://github.com/PascalPrecht/angular-translate) (for i18n)

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

As browsers have a security model for files loaded from file URLs (file://....) angular projects should be loaded
from webservers even when doing local development. This project uses grunts built-in webserver to serve project files
(via [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)).

While running this web server following actions will be run automatically:

* serve all project files via http://localhost:8000, URL for index page is [http://localhost:8000/src/main/index.html](http://localhost:8000/src/main/index.html)
* jslint all javascript files (after changes in javascript files)
* unit-tests (after changes in javascript files)
* live reloading of ressources via grunt-watch (after changes in HTML/JS/CSS files)

To start the local web server:

	grunt web

(this runs jslint and unit-tests after javascript files are changed)

Create a deployable artifact for your production webserver:

	grunt install

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

###CSS files

You can create as many css files as you want. You should place them in the [src/main/css](src/main/css/) folder.
*grunt install* will pick them up automatically from there.

You must load all css files in the HTML files manually for local development with *grunt web* target (via <link> tag).
Look for the sample.css file that is loaded in the sample index.html.

During grunt build ( *grunt install* ) and while creating a deployable artificat all css files will be concatenated and optimized
into one big css file. The grunt build has to know about the correct order of css files to do this. Currently you have
to configure the order yourself inside the [gruntfile.js](gruntfile.js). I have added a comment where to do that.

If you want to implement a more user-friendly version for the configuration, go ahead and fix
[issue #6](https://github.com/marcorinck/ngStart/issues/6).

###Images

Image files which are referenced in the project css files will be automatically embedded into the generated and
optimized css file of the project as data URIs. Image files need to placed into the [src/main/images](src/main/images/)
folder to be found.

Though data URI images are ~30% bigger than the original image, the browser saves heavily on HTTP requests. Thus, for
icons its usually faster to load them as data URIs than directly via HTTP.

**Warning**: No images inside the *images* folder will be included in the artifact generated by the *grunt install* goal.
If you need to deploy images on your webserver (usually only bigger images like in galleries) you need to place them into the
[src/main/images/build](src/main/images/build/) which *will* be included in the artifact.

