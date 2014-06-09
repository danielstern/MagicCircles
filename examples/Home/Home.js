   angular.module("MagicCirclesDemo")
     .controller("Home", function($scope) {


    var intro = new MagicCircle("#headerCircle");
    var caster = intro.cast()
        .circleRing(12,16)
        .ring(5)
            .color(lol.randomColor())
        .ring(0)
            .color(lol.randomColor())
        .ring()
        .text(10,lol.hipster())
          .color(lol.randomColor())
        .ring()
        .circleRing(8,16,2,true)
          .color(lol.randomColor())
        .backspace(24)
        .circleRing(24,8,4,false)
        .space(8)
        .ring(5)
            .color(lol.randomColor())
        .ring();
      var text = caster
        .text(24,"Magic Circles by Azureda",1)
        .color(lol.randomColor())
        .getLast();
      caster
        .ring()
            .color(lol.randomColor())
        .circleRing(48,4,2)
        .ring(5)
        .ring()
        .text(12,"Make your own today! The astonishing circle framework by international technology innovators Azureda and Friends!",1)
          .color(lol.randomColor())
        .ring(15)
          .color(lol.randomColor())
        .backspace(16)
          .circleRing(8,9,2,true)
          .color("white")
          .fill("white");

        console.log("text length?",text.getLength())
     })
