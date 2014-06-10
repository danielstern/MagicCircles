   angular.module("MagicCirclesDemo")
     .controller("Home", function($scope) {


    var intro = new MagicCircle("#headerCircle");
    intro.styles.colors = {
      ring: "#151d3b",
      text: "#1a1640",
      smallRing: "#291744",
    };

    var caster = intro.cast()
        .circleRing(12,16)
        .ring(5)
        .ring(0)
        .ring()
        .text("autofit","Wow! Amaze! Such circle!")
        .ring()
        .circleRing(48,12,2,true)
        .ring()
        .text("autofit","Magic Circles by Azureda",1)
        .ring()
        .circleRing(48,4,2)
        .ring(5)
        .ring()
        .text("autofit","Make your own today! The astonishing circle framework by international technology innovators Azureda and Friends!",1)
        .ring()


     })
