angular.module("MagicCirclesDemo", ['ngRoute'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/casting', {
        templateUrl: 'Casting/casting.html',
        controller: 'Casting'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);