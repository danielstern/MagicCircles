   angular.module("MagicCirclesDemo")
    .controller("Casting", function($scope) {

    
    $scope.$on('$viewContentLoaded', function() {
    	console.log('tooltipping stuff')
        $("[data-toggle='tooltip']").tooltip();

        var magic = new MagicCircle("#casting", 2);
        magic.cast().space(30)

        $scope.circle = magic;
        $scope.lol = lol;

    }); //call it here


    })