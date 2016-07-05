(function() {
    'use strict';

    angular
        .module('cure', [
            'ngAnimate',
            'ngCookies',
            'ngTouch',
            'ngSanitize',
            'ngMessages',
            'ngAria',
            'ngResource',
            'ngRoute',
            'firebase',
            'mm.foundation',
            'toastr']);

})();

/*

Note:

    This uses the latest angularfire library - which isn't (as per today) in bower.
    The signout method was incorrect - it did not return a promise. You can download from git directly,
    else edit
    bower_components/angularfire/dist/angularfire.js
    until bower catches up.

    To edit, replace:

        signOut: function() {
          if (this.getAuth() !== null) {
            this._auth.signOut();
          }
        },

    with

        signOut: function() {
          if (this.getAuth() !== null) {
            return this._q.when(this._auth.signOut());
          } else {
            return this._q.when();
          }
        },

*/