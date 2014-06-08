angular.module("MagicCirclesDemo")
  .controller("Repeating", function($scope) {

    var magic = new MagicCircle("#repeating", 2);

    function getRandomNumber(max) {
      return Math.floor(Math.random() * (max || 10))
    }

    //magic.styles.colors = fire;
    var miscRing = function(count) {


      for (var i = 0; i < count; i++) {

        magic.cast()
          .circleRing(getRandomNumber(3) * (count + 3), getRandomNumber(2) * (count + 1), getRandomNumber(3) * (count + 1), getRandomNumber(1) * (count + 1))
          .ring()
          .text(getRandomNumber(4) * (count + 1), lol.physics() + lol.physics() + lol.physics())
          .ring()
          .text(getRandomNumber(4) * (count + 1), lol.hipster(), 3, true)
          .ring()
      }


    }


    miscRing(5);

    window.reroll = function() {
      console.log("Rerolling");
      magic.disperse();
      setTimeout(miscRing, 2000, getRandomNumber(5) + 3)
    }
  })
