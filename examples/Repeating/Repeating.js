angular.module("MagicCirclesDemo")
  .controller("Repeating", function($scope) {

    var magic = new MagicCircle("#repeating", 2);

    function getRandomNumber(max) {
      return Math.floor(Math.random() * (max || 10))
    }

    //magic.styles.colors = fire;
    var miscRing = function(count) {

      magic.cast()
        .space(50)
        .ring()
      for (var i = 0; i < count; i++) {

        magic.cast()
          .text("autofit", lol.physics() + lol.physics() + lol.physics())
            .color(lol.randomColor())
          .ring()
          .circleRing(getRandomNumber(24) + 24, getRandomNumber(3) + 3, 2, true)
            .fill(lol.randomColor())
            .color(lol.randomColor())
          .ring()
      }


    }


    miscRing(3);

    $scope.reroll = function() {
      console.log("Rerolling");
      magic.disperse();
      setTimeout(miscRing, 2000, getRandomNumber(3) + 1)
    }

    
    $scope.$on('$viewContentLoaded', function() {
      $('pre code').each(function(i, block) {
        console.log("hljs?", hljs)
        hljs.highlightBlock(block);
      });
    }); //call it here
  })
