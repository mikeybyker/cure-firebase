(function () {
  'use strict';

  angular
    .module('cure')
    .factory('Discog', function ($timeout, $q, $firebaseObject, $firebaseArray, FirebaseUtils) {

      function getAlbum(releaseId) {
        var albumRef = FirebaseUtils.ref('releases/' + releaseId);

        return albumRef.once('value').then(function (dataSnapshot) {
          return $timeout(function () {
            return dataSnapshot.val();
          });
        });
      }

      function getTracks(releaseId) {
        var tracksRef = FirebaseUtils.ref('tracks/' + releaseId);

        return tracksRef.once('value').then(function (dataSnapshot) {
          return $timeout(function () {
            return dataSnapshot.val();
          });
        });
      }

      function getTrackRef(releaseId, trackId) {
        return FirebaseUtils.ref('tracks/' + releaseId + '/' + trackId);
      }
      
      function getRatingsRef(userId, trackId) {
        return FirebaseUtils.ref('users/' + userId + '/ratings/' + trackId);
      }

      var api = {

        getDiscog: function (artist) {
          var discogRef = FirebaseUtils
            .ref('artist/' + artist + '/discog')
            .orderByChild('releaseYear');

          return $firebaseArray(discogRef);
        },

        getCover: function (releaseId) {
          var coverRef = FirebaseUtils.ref('releases/' + releaseId + '/coverFront');

          return coverRef.once('value').then(function (dataSnapshot) {
            return $timeout(function () {
              return dataSnapshot.val();
            });
          });
        },

        getRanks: function (limit) {
          var ranksRef = FirebaseUtils
            .ref('ranks')
            .orderByChild('average')
            .limitToLast(limit);

          return $firebaseArray(ranksRef);
        },

        // Don't need to track or keep hold of, so don't keep the overhead of a $firebaseObject
        setRank: function (trackId, data) {
          var rankRef = FirebaseUtils
            .ref('ranks/' + trackId)
            .set(data);
          return rankRef;
        },

        getRatings: function (userId, trackId) {
          return $firebaseObject(getRatingsRef(userId, trackId));
        },
        ratingsRef: function (userId, trackId) {
          return getRatingsRef(userId, trackId);
        },

        getTrack: function (releaseId, trackId) {
          return $firebaseObject(getTrackRef(releaseId, trackId));
        },
        trackRef: function (releaseId, trackId) {
          return getTrackRef(releaseId, trackId);
        },

        // Get the album (or whatever) plus its tracks
        getRelease: function (releaseId) {
          return $q.all([getAlbum(releaseId), getTracks(releaseId)]);
        }

      };

      return api;

    });

})();
