angular.module("MagicCirclesDemo")
  .controller("FillStroke", function($scope) {
    var magic = new MagicCircle("#fillstroke", 3);
    magic.cast()
      .space(50)
      .ring(25)
      .color("#ad44a2")
      .backspace(20)
      .text(15, "DISCO PARTY", 4)
      .color("white")
      .space(5)
      .ring(25)
      .color('#b98a44')
      .backspace(20)
      .text(15, "RETRO SCENESTER", 3, true)
      .color("white")
      .space(5)
      .ring(25)
      .color('#49c055')
      .backspace(20)
      .text(15, "AZUREDA PROUDLY PRESENTS", 2)
      .color("white")
      .space(5)

    var magic2 = new MagicCircle("#fillstroke2", 3);
    magic2.cast()
      .space(50)
      .ring(25)
      .color('blue')
      .ring(25)
      .color('white')
      .backspace(20)
      .text(15, "SAILORS ENTHUSIAST MEETUP GROUP", 1, true)
      .color("blue")
      .space(5)
      .ring(40)
      .color('blue')
      .backspace(42)
      .circleRing(8, 30, 2)
      .fill("white")
      .color("white")



    $scope.$on('$viewContentLoaded', function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  })
