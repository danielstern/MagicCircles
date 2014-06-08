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
      when('/repeating', {
        templateUrl: 'Repeating/repeating.html',
        controller: 'Repeating'
      }).
      when('/fillStroke', {
        templateUrl: 'FillStroke/fillstroke.html',
        controller: 'FillStroke'
      }).
      when('/gallery', {
        templateUrl: 'gallery/Gallery.html',
        controller: 'Gallery'
      }).
      otherwise({
        redirectTo: '/casting'
      });
  }]);