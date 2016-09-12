(function() {
    'use strict';

    angular
        .module('cure')
        .factory('Utils', function(){

            var utils = {

                getRepeat : function(n){
                    return new Array(n);
                },

                getAverage : function(total, votes){
                    if(total === 0 || votes === 0){
                        return 0;
                    }
                    return Math.floor(total/votes) || 0;
                }
            };

            return utils;
        });

})();
