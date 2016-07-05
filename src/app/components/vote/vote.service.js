(function() {
    'use strict';

    angular
        .module('cure')
        .factory('Vote', function($q, $log, Discog, Utils){

            var ratings,
                track;

            function initTrack(releaseId, trackId, userId){
                track = Discog.getTrack(releaseId, trackId);
                var promise = track.$loaded();
                return promise
                    .then(function(track){
                        return getUserRating(userId, trackId);
                    })
                    .then(function(rating){
                        return {track:track, ratings:ratings};
                        // return reject({status:503, statusText:'Just broken...'}); // to test...
                    });
            }

            function getUserRating(userId, trackId){
                ratings = Discog.getRatings(userId, trackId);
                // $value null if never voted, else $value is the number last voted
                return ratings
                        .$loaded()
                        .then(function(rating){
                            if( rating.$value === null){
                                rating.$value = 0;
                            }
                            return rating;
                        });
            }
            function vote(trackId, value){
                if(!value){
                    return reject({status:400, statusText:'No value sent to vote!'});
                } else if(!trackId){
                    return reject({status:400, statusText:'Missing trackId, can\'t vote...'});
                }
                if(ratings.$value === 0){
                    // never voted
                    // $log.info('Vote: never voted');
                    track.votes++;
                    track.total += value;
                } else {
                    // $log.info('Vote: has voted before');
                    // Voted before : add value, remove ratings.$value
                    track.total += value - ratings.$value;
                }
                ratings.$value = value;
                return update(trackId);
            }

            function update(trackId){
                var promiseRank,
                    promiseRatings = ratings.$save(),
                    promiseTrack = track.$save();

                promiseRank = Discog.setRank(trackId, getRankData(track));
                // promiseRank = reject({status:405, statusText:'test error'}); // to test

                return $q.all([promiseRatings, promiseTrack, promiseRank]);
            }

            function getRankData(track){
                return {
                    average: Utils.getAverage(track.total,track.votes),
                    title: track.title,
                    id : track.id,
                    albumId : track.albumId
                };
            }

            function reject(reason){
                reason = reason || {status:404, statusText:'Not Found'};
                var deferred = $q.defer();
                deferred.reject(reason);
                return deferred.promise;
            }

            function destroy(){
                ratings.$destroy();
                track.$destroy();
                return true;
            }

            return {
                vote: function(trackId, value){
                    return vote(trackId, value);
                },
                initTrack: function(releaseId, trackId, userId){
                    return initTrack(releaseId, trackId, userId);
                },
                getUserRatings: function(){
                    return ratings;
                },
                destroy: function(){
                    return destroy();
                }
            }

        });

})();