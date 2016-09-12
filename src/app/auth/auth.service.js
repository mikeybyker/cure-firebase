(function() {
    'use strict';

    angular
        .module('cure')
        .factory('Auth', function($firebaseAuth){
            return $firebaseAuth();
        });

})();
