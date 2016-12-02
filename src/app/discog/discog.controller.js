(function () {
  'use strict';

  angular
    .module('cure')
    .controller('DiscogController', DiscogController);

  function DiscogController($scope, Discog) {
    var vm = this;

    vm.discog = Discog.getDiscog('The Cure');

    // To clean up angularfire references (stop permission errors...)
    $scope.$on('$destroy', function () {
      vm.discog.$destroy && vm.discog.$destroy();
    });

  }
})();