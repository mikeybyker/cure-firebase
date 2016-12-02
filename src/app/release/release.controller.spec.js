(function () {
  'use strict';

  describe('controller ReleaseController', function () {
    var vm,
      $rootScope,
      d = [
        {
          "artist": "The Cure",
          "title": "Faith"
        },
        {
          "4870":
          {
            "albumTitle": "Faith",
            "artist": "The Cure",
            "index": 1,
            "title": "The Holy Hour",
            "total": 5,
            "votes": 1
          },
          "4871":
          {
            "albumTitle": "Faith",
            "artist": "The Cure",
            "index": 2,
            "title": "Primary",
            "total": 1,
            "votes": 1
          }
        }
      ];

    beforeEach(module('cure'));

    describe('Set releaseID from routeParams', function () {
      beforeEach(inject(function (_$controller_, _$rootScope_) {
        $rootScope = _$rootScope_;
        vm = _$controller_('ReleaseController', { $routeParams: { id: 123 } });

      }));
      it('releaseId should be 123', function () {
        expect(vm.releaseId).toBe(123);
      });
    });

    describe('Loading data', function () {
      beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;

        // Mock Discog service
        var deferred = _$q_.defer(),
          Discog = {
            getRelease: function (id) {
              if (id === 123) {
                deferred.resolve(d);
              } else {
                deferred.reject('error!');
              }
              return deferred.promise;
            }
          };
        vm = _$controller_('ReleaseController', { Discog: Discog, $routeParams: { id: 123 } });

      }));
      it('should set the release title to "Faith"', function () {
        $rootScope.$digest();
        expect(vm.release.title).toBe('Faith');
      });
      it('should set the first track to "The Holy Hour"', function () {
        $rootScope.$digest();
        expect(vm.tracks['4870'].title).toBe('The Holy Hour');
      });
    });

    describe('Handle bad data', function () {
      var toastr;
      beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _toastr_) {
        $rootScope = _$rootScope_;
        spyOn(_toastr_, 'error').and.callThrough();
        spyOn(_toastr_, 'success').and.callThrough();
        toastr = _toastr_;

        // Mock Discog service
        var deferred = _$q_.defer(),
          Discog = {
            getRelease: function (id) {
              if (id === 123) {
                deferred.resolve(d);
              } else {
                deferred.reject({ statusText: 'data error' });
              }
              return deferred.promise;
            }
          };

        vm = _$controller_('ReleaseController', { Discog: Discog, $routeParams: { id: 456 } });

      }));

      it('should display toastr error', function () {
        $rootScope.$digest();
        expect(toastr.success).not.toHaveBeenCalled();
        expect(toastr.error).toHaveBeenCalled();
        expect(toastr.error.calls.mostRecent().args[0]).toBe('data error');
      });

    });


  });
} ());
