angular.module("MagicCirclesDemo")
  .controller("Styling", function($scope) {
    var magic = new MagicCircle("#styling", 3);
    var magic2 = new MagicCircle("#styling2", 3);

    magic.styles.colors.ring = "blue";
    magic.styles.colors.text = "red";
    magic.styles.colors.smallRing = "green";

    magic.cast()
      .circleRing(12,12)
      .ring(10)
      .text(16,"Red Text")

    magic2.cast()
      .circleRing(12,12)
        .color('red')
      .circleRing(14,14,2,true)
        .color('blue')
        .fill('yellow')




    $scope.$on('$viewContentLoaded', function() {
      $('pre code').each(function(i, block) {
        console.log("hljs?", hljs)
        hljs.highlightBlock(block);
      });
    }); //call it here
  })
