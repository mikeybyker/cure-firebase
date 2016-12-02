(function () {
  'use strict';

  angular
    .module('cure')
    .config(routeConfig);

  function routeConfig($routeProvider) {

    $routeProvider.whenAuthenticated = function (path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['Auth', function (Auth) {
        return Auth.$requireSignIn();
      }];
      $routeProvider.when(path, route);
      return this;
    }

    $routeProvider
      .when('/', {
        templateUrl: 'app/auth/login.html',
        controller: 'AuthController',
        controllerAs: 'vm',
        resolve: {
          requireNoAuth: ['$location', 'Auth', function ($location, Auth) {
            return Auth.$requireSignIn().then(function (auth) {
              $location.path('/discog');
            }, function (error) {
              return;
            });
          }]
        }
      })
      .when('/about', {
        templateUrl: 'app/about/about.html'
      })
      .whenAuthenticated('/discog', {
        templateUrl: 'app/discog/discog.html',
        controller: 'DiscogController',
        controllerAs: 'vm'
      })
      .whenAuthenticated('/discog/:id', {
        templateUrl: 'app/release/release.html',
        controller: 'ReleaseController',
        controllerAs: 'vm'
      })
      .whenAuthenticated('/discog/:id/:track', {
        templateUrl: 'app/track/track.html',
        controller: 'TrackController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
