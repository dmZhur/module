// Initialize several modules.
// Order doesn't matter.

// The `main` module will be auto-bootstrapped by default.
module('main', ['app'], function (app) {
    return {
        initialize: function () {
            app.initialize();
        }
    };
});

module('app', ['user', 'task', 'dashboard.task'], function (user, task, dashboardTask) {
    return {
        initialize: function () {
            console.log('can create task - ' + task.canCreate());

            user.login();
            console.log('login()');

            console.log('can create task - ' + dashboardTask.canQuickCreate());
        }
    };
});

module('task', ['user'], function (user) {
    return {
        canCreate: function () {
            return user.isLoggedIn();
        }
    };
});

module('dashboard.task', ['user'], function (user) {
    return {
        canQuickCreate: function () {
            return user.isLoggedIn();
        }
    };
});

module('user', function () {
    return {
        login: function () {
            this._status = 'loggedin';
        },
        logout: function () {
            this._status = 'loggedout';
        },
        getStatus: function () {
            return this._status;
        },
        isLoggedIn: function () {
            return this.getStatus() === 'loggedin';
        }
    };
});
