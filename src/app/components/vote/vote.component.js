(function() {
    'use strict';

    angular
        .module('cure')
        .component('votingButtons', {
            bindings:{
                votes: '<',
                max: '<',
                onVote: '&'
            },
            controller: function(Utils){
                this.getRepeat = Utils.getRepeat;
            },
            templateUrl: 'app/components/vote/vote.html'
        });

})();