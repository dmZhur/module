# module

## Description

Minimalistic dependency injection library for browser. For those who still use browser globals and don't want AMD or Commonjs in their project.

## Motivation

> For quick introduction see the `examples` folder.

Get library with minimalistic API that allow to define frontend modules in order-agnostic style. This allows to concatenate all modules into single file with mask like this `app/*.js`

## Usage

Include module.min.js above your modules.

Better: Bundle you libraries into one file `vendor.js` with dependent order, including **module** package, bundle your own modules into one file `app.js`. Include both like so:

```html
<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>
```

## API

### module(name, [dependencies,] factory)

Define a module.

```javascript
module('task', ['user'], function (user) {
    return {
        createOne: function () {
            // if (user.isLoggedIn()) {...
        }
    }
});

module('user', function () {
    return {
        isLoggedIn: function () {
            //
        }
    }
});
```

### module(name)

Require a module (it is best practice to avoid this).

```javascript
module('main').initialize();
```

### module.autorun([boolean])

Usually you define module called `main` with function `initialize()` that will automatically bootstrap the application.

Execute following if you want to bootstrap you application manually.

```javascript
module.autorun(false);

// you don't need to call it like that
// module.autorun(true);
// as it's default behavior
```

### module.debug()

Return object where all modules collected and set global one named like so: `module1417559110777` that means `module` + timestamp.

Can be used for debugging purpose only, do not access to modules directly.

```javascript
module.debug();
```

### module.noConflict()

Return instance of module and release `window.module` namespace to its initial value.

```javascript
var di = module.noConflict();

di('user', function () {
    return {
        isLoggedIn: function () {
            //
        }
    }
});
```

## TODO

* document code
* add unit tests
* add easy shim method
