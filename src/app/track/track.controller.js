(function() {
    'use strict';

    angular
        .module('cure')
        .controller('TrackController', TrackController);

    function TrackController($routeParams, $timeout, $log, $scope, $location, Vote, Discog, Utils, user, toastr) {
        var vm = this,
            track,
            votes,
            releaseId = $routeParams.id,
            trackId = $routeParams.track;

        vm.onVote = onVote;
        vm.getAverage = Utils.getAverage;

        if(!releaseId || !trackId || !user.uid){
            $location.path('/');
            return;
        }

        Vote.initTrack(releaseId, trackId, user.uid)
            .then(function(data){
                track = vm.track = data.track;
                votes = vm.votes = data.ratings;
            }).catch(function(reason){
                toastr.error(reason.statusText, 'Error', {
                    onHidden: function(){
                        $location.path('/');
                    }
                });
            });

        // Don't like... A child route would be better (ui-router) - or a ref in a service - rather
        // than making another request
        Discog.getCover($routeParams.id).then(function(image){
            vm.cover =  image;
        });

        function onVote(event){
            Vote.vote(trackId, event.value)
                .then(function(results){
                   // $log.info('onVote : vote counted!', results);
                }, function(reason){
                    $log.info('Error : ', reason);
                    toastr.error(reason.statusText, 'Error');
                });
        }

        // To clean up angularfire references (stop permission errors...)
        $scope.$on('$destroy', function() {
            // vm.cover.$destroy(); // only need when using $firebaseObject : not when using .once
            Vote.destroy();
        });

    }
})();