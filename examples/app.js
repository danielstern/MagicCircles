angular.module("MagicCirclesDemo", ['ngRoute'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/casting', {
        templateUrl: 'Casting/casting.html',
        controller: 'Casting'
      }).
      when('/styling', {
        templateUrl: 'Styling/styling.html',
        controller: 'Styling'
      }).
      when('/interactivity', {
        templateUrl: 'Interactivity/interactivity.html',
        controller: 'Interactivity'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);