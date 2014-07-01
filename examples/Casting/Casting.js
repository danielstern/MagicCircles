angular.module("MagicCirclesDemo")
  .controller("Casting", function($scope) {

    $scope.$on('$viewContentLoaded', function() {

      $scope.alchemy = {
        ring: {
          width: {
            type: "range",
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
            type: "range",
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
            type: "range",
            min: "1",
            max: "15",
            value: "5"
          },
          children: {
            type: "range",
            min: "1",
            max: "32",
            value: "8"
          },
          color: {
            type: "color",
            value: "#000"
          },
          fill: {
            type: "color",
            value: "#666"
          }
        }
      }


      var magic = new MagicCircle("#casting", 2);
      magic.cast().space(30);

      $scope.cast = function(spell,name) {
        // console.log("casting... spell!", spell,name);
        // var type = thing.name;
        switch (name) {
            case "ring":
                // console.log("castin' ring",spell);
                magic.cast()
                    .ring(parseInt(spell.width.value))
                    .color(spell.color.value)
                break;
            case "text":
                magic.cast()
                    .text(spell.autofit.value ? "autofit" : parseInt(spell.size.value), spell.text.value)
                    .color(spell.color.value);
        }
      }




      $("[data-toggle='tooltip']").tooltip();
    }); //call it here


  })
.controller("SpellController",function($scope,$element){
    console.log("Spell contr init",$scope,$element);
    $scope.values = {};
})