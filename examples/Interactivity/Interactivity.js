angular.module("MagicCirclesDemo")
  .controller("Interactivity", function($scope) {
    var interact = new MagicCircle("#interactivity");
    var caster = interact.cast();
    var innerCircleRing = caster
      .circleRing(24,26)
        .color('rgba(0,0,0,0)')
        .getLast();
    caster
      .ring(1);

    var text = interact.cast()
      .text(25, "Hover over me!")
      .getLast();

    caster.backspace(25)
      .ring(25)
      .color("useNone")
      .on("mouseover", rotateText)
      .on("mouseout", resumeAnimation)

    function rotateText() {
      text.rotation(-35);
      innerCircleRing.recolor('green');
    }

    function resumeAnimation() {
      text.animate();
      innerCircleRing.recolor('none');
    }

    function toggleCircles() {
      text2.rotation(-35);
      circles.fill("red")
    }

    function untoggleCircles() {
      text2.animate();
      circles.fill("blue");
    }

    caster.ring(12)
    var text2 = interact.cast()
      .text(25, "CLICK ME")
      .getLast();

    caster.backspace(25)
      .ring(25)
      .color("useNone")
      .on("click", toggleCircles)
      .on("mouseout", untoggleCircles)

    var circles =
      caster.ring(1)
      .circleRing(24, 8)
        .fill('blue')
      .getLast();

    caster.ring()


    
    $scope.$on('$viewContentLoaded', function() {
      $('pre code').each(function(i, block) {
        console.log("hljs?", hljs)
        hljs.highlightBlock(block);
      });
    }); //call it here


  })
