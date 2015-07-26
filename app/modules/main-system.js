//this file is NOT run through ES6 transpiler, so no ES6 features can't be used (like spreading of arguments in final
//importing/loading of modules

//TODO there seems to be a loading issue with angular, sometimes angular variable is undefined when app.js is running
//this seems to fix it
System.import("angular").then(function () {
    System.import('app.js');
});

