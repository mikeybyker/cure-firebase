(function() {
    'use strict';

    angular
        .module('cure')
        .component('ratingBar', {
            bindings:{
                total: '<',
                votes: '<',
                max: '<',
                showDetails: '<'
            },
            controller: function($log, Utils){

                this.getRepeat = Utils.getRepeat;
                this.getAverage = Utils.getAverage;

                // this.$onInit = function() {
                //     $log.info('ratingBar component initialized');
                // };
            },
            templateUrl: 'app/components/rating/rating.html'
        });

})();

// Note: component defaults to controllerAs: '$ctrl'