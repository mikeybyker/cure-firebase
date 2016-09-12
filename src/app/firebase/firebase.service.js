(function() {
    'use strict';

    angular
        .module('cure')
        .factory('FirebaseUtils', function($window){

            function firebaseRef(path) {
                // var ref = $window.firebase.database().ref(),
                var ref = firebase.database().ref(),
                    args = Array.prototype.slice.call(arguments);
                if( args.length ) {
                    ref = ref.child(pathRef(args));
                }
                return ref;
            }
            function pathRef(args) {
                for (var i = 0; i < args.length; i++) {
                    if (angular.isArray(args[i])) {
                        args[i] = pathRef(args[i]);
                    }
                    else if(!angular.isString(args[i])) {
                        throw new Error('Argument ' + i + ' to firebaseRef is not a string: ' + args[i]);
                    }
                }
                return args.join('/');
            }

            return {
                // There's only a global reference - seems odd for angularfire not to include service, but still.
                firebase : function(){
                    return firebase.database().ref();
                    // Same as:
                    // return $window.firebase.database().ref();
                },
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                // Same as:
                // timestamp: $window.firebase.database.ServerValue.TIMESTAMP,
                
                ref : firebaseRef
            }
        });

})();
