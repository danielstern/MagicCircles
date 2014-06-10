angular.module("MagicCirclesDemo")
  .controller("Styling", function($scope) {
  var magic = new MagicCircle("#styling", 3);

  function getRandomNumber(max) {
    return Math.floor(Math.random() * (max || 10))
  }

  //magic.styles.colors = fire;
  var miscRing = function(count) {


    for (var i = 0; i < count; i++) {

      magic.styles.colors.ring = getRandomColor();
      magic.styles.colors.text = getRandomColor();
      magic.styles.colors.smallRing = getRandomColor();

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

  $scope.rerollColor = function() {
    console.log("Rerolling");
    magic.disperse();
    setTimeout(miscRing, 2000, getRandomNumber(3) + 3)
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  $scope.$on('$viewContentLoaded', function() {
   $('pre code').each(function(i, block) {
    console.log("hljs?",hljs)
     hljs.highlightBlock(block);
   });
  }); //call it here
})


