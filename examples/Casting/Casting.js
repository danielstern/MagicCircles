   angular.module("MagicCirclesDemo")
    .controller("Casting", function($scope) {
        var magic = new MagicCircle("#casting", 2);

        $scope.circle = magic;
        $scope.lol = lol;

    })