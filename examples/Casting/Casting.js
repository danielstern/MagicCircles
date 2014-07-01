angular.module("MagicCirclesDemo")
  .controller("Casting", function($scope) {

    $scope.$on('$viewContentLoaded', function() {

      $scope.alchemy = {
        ring: {
          width: {
            type: "number",
            min: "1",
            max: "15",
            value: "5"
          },
          color: {
            type: "color",
            value: "#000"
          }
        },
        text: {
          text: {
            type: "text",
            value: lol.hipster()
          },
          autofit: {
            type: "checkbox",
            value: true,
          },
          size: {
            type: "number",
            min: "1",
            max: "15",
            value: "5"
          },
          color: {
            type: "color",
            value: "#000"
          }
        },
        circleRing: {
          size: {
            type: "number",
            min: "1",
            max: "15",
            value: "5"
          },
          color: {
            type: "color",
            value: "#000"
          }
        }
      }


      var magic = new MagicCircle("#casting", 2);
      magic.cast().space(30);

      $scope.cast = function(thing) {
        console.log("casting... THING!", thing);
        var type = thing.name;
      }




      $("[data-toggle='tooltip']").tooltip();
    }); //call it here


  })
.controller("SpellController",function($scope,$element){
    console.log("Spell contr init",$scope,$element);
    $scope.values = {};
})