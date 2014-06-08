   angular.module("MagicCirclesDemo")
     .controller("Interactivity", function($scope) {
       var interact = new MagicCircle("#interactivity");
       var caster = interact.cast()
         .space(50)
         .ring(25);

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
       }

       function resumeAnimation() {
         text.animate();
       }

       function toggleCircles() {
         text2.rotation(-35);
         circles.fill("red")
       }

       function resumeAnimation2() {
         text2.animate();
         circles.fill("blue");
       }

       caster.ring(25)
       var text2 = interact.cast()
         .text(25, "CLICK ME")
         .getLast();

       caster.backspace(25)
         .ring(25)
         .color("useNone")
         .on("click", toggleCircles)
         .on("mouseout", resumeAnimation2)

       var circles =
         caster.ring(25)
         .circleRing(8, 8)
         .getLast();


     })
