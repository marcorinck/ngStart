#ng Start Simple

[![Dependency Status](https://david-dm.org/marcorinck/ngStart.png)](https://david-dm.org/marcorinck/ngStart)
[![devDependency Status](https://david-dm.org/marcorinck/ngStart/dev-status.png)](https://david-dm.org/marcorinck/ngStart#info=devDependencies)



This is a simple Angular.js seed project inspired by <a href="https://github.com/marcorinck/ngStart">marcorinck/ngStart</a>

##Installation

Clone this project from github and/or download this project from github as a ZIP file.

After that, in the project root, issue the following commands:

```
npm install
bower install
```

Done.

##Features

This is a seed project to use for new angular projects. It works out of the box without changes and contains
all the boiler plate code to setup a new project with a main layout and two example pages.


The following libraries are used:

* [angularJS](http://angularjs.org/) (of course)
* [bower](https://github.com/bower/bower) (for dependeny management of javascript libraries to be loaded in browser)
* [jslint](http://www.jslint.com/) (for quality checking of javascript code)
* [grunt-manifest](https://github.com/gunta/grunt-manifest) (an appcache manifest will be created when creating a deployable artifact)
* [grunt-targethtml](https://github.com/changer/grunt-targethtml) (filtering of html files for deployment on production servers)
* [grunt-data-uri](https://github.com/ahomu/grunt-data-uri) Embeds all referenced images in css files in the generated project css file, which is optimized by grunt
* [karma](http://karma-runner.github.io/) (as a test runner for unit and ui tests)
* [angular-translate](https://github.com/PascalPrecht/angular-translate) (for i18n)
###Architecture

![Architecture](http://entwicklertagebuch.com/blog/wp-content/uploads/2013/10/modules-300x225.jpg)

The architecture (aka folder structure)  is based on this blog post: http://entwicklertagebuch.com/blog/2013/10/how-to-structure-large-angularjs-applications/



