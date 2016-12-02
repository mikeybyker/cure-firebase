(function () {
  'use strict';

  // Firebase
  var config = {
    apiKey: 'KEY',
    authDomain: 'cure.firebaseapp.com',
    databaseURL: 'https://cure.firebaseio.com',
    storageBucket: 'BUCKET.appspot.com'
  };
  firebase.initializeApp(config);
  //

  describe('controller DiscogController', function () {
    var vm,
      $rootScope,
      d = [
        { "releaseDate": "08/05/1979", "releaseYear": "1979", "title": "Three Imaginary Boys", "$id": "4827", "$priority": null },
        { "releaseDate": "05/02/1980", "releaseYear": "1980", "title": "Boys Don't Cry", "$id": "4842", "$priority": null },
        { "releaseDate": "22/04/1980", "releaseYear": "1980", "title": "Seventeen Seconds", "$id": "4856", "$priority": null },
        { "releaseDate": "14/04/1981", "releaseYear": "1981", "title": "Faith", "$id": "4868", "$priority": null },
        { "releaseDate": "04/05/1982", "releaseYear": "1982", "title": "Pornography", "$id": "4878", "$priority": null },
        { "releaseDate": "06/12/1983", "releaseYear": "1983", "title": "Japanese Whispers", "$id": "22813", "$priority": null }
      ];

    beforeEach(module('cure'));

    describe('Load up Cure data', function () {

      beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        var scope = $rootScope.$new();

        // Mock Discog service
        var deferredDiscog = _$q_.defer(),
          Discog = {
            getDiscog: function (artist) {
              if (artist === 'The Cure') {
                deferredDiscog.resolve(d);
              } else {
                deferredDiscog.reject([]);
              }
              return deferredDiscog.promise;
            }
          };
        vm = _$controller_('DiscogController', { Discog: Discog, $scope: scope });
      }));

      it('Discog should contain album information', function () {
        // vm.discog is the promise, not the data from...
        // To (sort of) replicate how the controller works (wrapped $firebaseArray)
        var result;
        vm.discog.then(function (data) {
          result = data;
        });
        // Have to digest() *after* the then...  
        $rootScope.$digest();
        expect(vm.discog.$$state).toBeDefined(); // eslint-disable-line
        expect(result.length).toBe(6);
        expect(result[0].releaseDate).toBe('08/05/1979');
      });
    });
  });
} ());
