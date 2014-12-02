(function () {
    'use strict';

    var VERSION = '/* @echo VERSION */';
    var root = {};
    var timestamp = Date.now();
    var oldModule = window.module;
    var isAutorun = true;
    var undef;

    var module = function (name, dependencies, factory) {
        if (!name) {
            throw new Error('module.js: Please provide a module name');
        }

        if (arguments.length === 1) {
            return extract(name);
        }

        if (typeof dependencies === 'function') {
            factory = dependencies;
            dependencies = [];
        }

        return (root[name] = {
            factory: factory,
            dependencies: dependencies
        });
    };

    var extract = function (name) {
        var mdl = root[name];
        var resolveds = [];

        if (mdl.body) {
            return mdl.body;
        }

        for (var i = 0, len = mdl.dependencies.length; i < len; i++) {
            resolveds.push(extract(mdl.dependencies[i]));
        }

        mdl.body = mdl.factory.apply(null, resolveds);

        return mdl.body;
    };

    module.autorun = function (value) {
        isAutorun = Boolean(value);
    };

    module.debug = function () {
        return (window['module' + timestamp] = root);
    };

    module.noConflict = function () {
        var thisModule = window.module;

        window.module = oldModule;

        return thisModule;
    };

    module.VERSION = VERSION;

    setTimeout(function () {
        var main;

        if (isAutorun) {
            try {
                main = module('main');
            } catch (error) {
                throw new Error('module.js: define a `main` module with initialize() function.');
            }

            if (main && typeof main.initialize === 'function') {
                main.initialize();
            } else {
                throw new Error('module.js: define a initialize() method of the `main` module.');
            }
        }
    }, 0);

    window.module = module;
}());
