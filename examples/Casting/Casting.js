angular.module("MagicCirclesDemo")
  .controller("Casting", function($scope) {

    $scope.$on('$viewContentLoaded', function() {

      $scope.alchemy = {
        ring: {
          width: {
            type: "number",
            min: "1",
            max: "15",
            default: "5"
          },
          color: {
            type: "color",
            default: "#000"
          }
        },
        text: {
          text: {
            type: "text",
            default: lol.hipster()
          },
          autofit: {
            type: "checkmark",
            default: true,
          },
          size: {
            type: "number",
            min: "1",
            max: "15",
            default: "5"
          },
          color: {
            type: "color",
            default: "#000"
          }
        },
        circleRing: {
          size: {
            type: "number",
            min: "1",
            max: "15",
            default: "5"
          },
          color: {
            type: "color",
            default: "#000"
          }
        }
      }


      var magic = new MagicCircle("#casting", 2);
      magic.cast().space(30)

      $scope.circle = magic;
      $scope.lol = lol;

      $("[data-toggle='tooltip']").tooltip();
    }); //call it here


  })
