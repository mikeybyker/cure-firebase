(function () {
  'use strict';

  describe('component ratingBar', function () {

    var el;

    beforeEach(module('cure'));
    beforeEach(inject(function ($compile, $rootScope) {

      el = angular.element('<voting-buttons></voting-buttons>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();

    }));

    it('should be compiled', function () {
      expect(el.html()).not.toEqual(null);
    });

  });
} ());
