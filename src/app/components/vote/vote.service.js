(function () {
  'use strict';

  angular
    .module('cure')
    .factory('Vote', function ($q, $log, Discog, Utils) {

      var ratings,
        track;

      function initTrack(releaseId, trackId, userId) {
        var promise;
        track = Discog.getTrack(releaseId, trackId);
        promise = track.$loaded();
        return promise
          .then(function (track) {
            return getUserRating(userId, trackId);
          })
          .then(function (rating) {
            return { track: track, ratings: ratings };
            // return reject({status:503, statusText:'Just broken...'}); // to test...
          });
      }

      function getUserRating(userId, trackId) {
        ratings = Discog.getRatings(userId, trackId);
        // $value null if never voted, else the number last voted
        return ratings
          .$loaded()
          .then(function (rating) {
            if (rating.$value === null) {
              rating.$value = 0;
            }
            return rating;
          });
      }


      function updateUserVote(ratings, newVote) {
        ratings.$value = newVote;
        return ratings.$save();
      }

      function updateVoteTotals(releaseId, trackId, currentVote, newVote) {
        var trackRef = Discog.trackRef(releaseId, trackId);
        return trackRef
          .transaction(function (trackUpdate) {
            if (trackUpdate) {
              trackUpdate.total += (newVote - currentVote);
              if (currentVote === 0) {
                trackUpdate.votes++;
              }
            }
            return trackUpdate;
          });
      }

      function updateTrackAverage(trackId, rankData) {
        return Discog.setRank(trackId, rankData);
      }

      function vote(trackId, newVote) {
        if (!newVote) {
          return reject({ status: 400, statusText: 'No value sent to vote!' });
        } else if (!trackId) {
          return reject({ status: 400, statusText: 'Missing trackId, can\'t vote...' });
        }

        var promiseRatings,
          promiseTrans,
          currentVote = ratings.$value,
          releaseId = track.albumId;

        // 1. Update user vote
        promiseRatings = updateUserVote(ratings, newVote);
        // 2. Transaction to update vote count and total
        promiseTrans = updateVoteTotals(releaseId, trackId, currentVote, newVote);

        return $q.all([promiseRatings, promiseTrans])
          .then(function (data) {
            if (data && data[1]) {
              var updatedTrack = data[1].snapshot.val(),
                rankData = getRankData(updatedTrack);
              // 3. Set the average vote
              return updateTrackAverage(trackId, rankData)
                .then(function () {
                  return newVote;
                });
            } else {
              return reject({ status: 405, statusText: 'Update of votes failed' });
            }
          });
      }

      function getRankData(track) {
        return {
          average: Utils.getAverage(track.total, track.votes),
          title: track.title,
          id: track.id,
          albumId: track.albumId
        };
      }

      function reject(reason) {
        reason = reason || { status: 404, statusText: 'Not Found' };
        var deferred = $q.defer();
        deferred.reject(reason);
        return deferred.promise;
      }

      function resolve(data) {
        data = data || {};
        var deferred = $q.defer();
        deferred.resolve(data);
        return deferred.promise;
      }

      function destroy() {
        ratings.$destroy();
        track.$destroy();
        return true;
      }

      return {
        vote: function (trackId, value) {
          return vote(trackId, value);
        },
        initTrack: function (releaseId, trackId, userId) {
          return initTrack(releaseId, trackId, userId);
        },
        getUserRatings: function () {
          return ratings;
        },
        destroy: function () {
          return destroy();
        }
      }

    });

})();