/*
Copyright (c) 2014 Azureda
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

var MagicCircle = function(selector) {

  // CONSTS
  var RAD = Math.PI * 2;
  var magicCircle = this;

  var caster = undefined;
  var width, defs,
    height;

  var svg;
  this.id = Math.floor(Math.random() * 10000000);

  // initializers
  this.draw = {};
  var animator = undefined;

  this.animationListeners = [];
  this.allElements = [];
  this.onanimate = function(l) {
    magicCircle.animationListeners.push(l);

    return {
      stop: function() {
        magicCircle.animationListeners = _.without(magicCircle.animationListeners, l);
      },
      start: function() {
        magicCircle.animationListeners.push(l);
      }
    }
  }

  this.currentRadius = 0;

  this.animate = function() {
    for (var i = 0; i < magicCircle.animationListeners.length; i++) {
      magicCircle.animationListeners[i]();
    }
  }

  // user settings    
  this.styles = {
    colors: {
      ring: "#182645",
      text: "#243a6c",
      smallRing: "#304f93",
    },
    type: {
      leading: 6,
      typecase: "uppercase"
    },
    animation: {
      inSpeed: 666,
      animationSpeed: 6.66
    },
    graphics: {
      blur: {
        level: 0
      },
      shadow: {
        level: 1,
        distance: 0
      }
    }
  }

  this.init = function() {


    width = $(selector).width();
    height = $(selector).height();

    svg = d3.select(selector)
      .append("svg")
       .attr("width", width)
       .attr("height", height)
       .attr("class", "main")
       .attr("shape-rendering","optimizeSpeed")
    // .attr("viewBox","0 0 500 500")
    // .attr("transform","scale(0.2)")
    defs = svg.append("defs");

    var blurFilter = defs.append("filter")
      .attr("id", "drop-blur" + magicCircle.id)
      .attr("height", "130%")

    blurFilter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", magicCircle.styles.graphics.blur.level)
    // .attr("result", "blur");

    blurFilter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");

    var blurFeMerge = blurFilter.append("feMerge");

    blurFeMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
    blurFeMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");


    var shadowFilter = defs.append("filter")
      .attr("id", "drop-shadow" + magicCircle.id)
      .attr("height", "130%")

    shadowFilter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", magicCircle.styles.graphics.shadow.level)
      .attr("result", "blur");

    shadowFilter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", magicCircle.styles.graphics.shadow.distance)
      .attr("dy", magicCircle.styles.graphics.shadow.distance)
      .attr("result", "offsetBlur");

    shadowFilter.append("feComponentTransfer")
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", "0.2")

    var shadowFeMerge = shadowFilter.append("feMerge");

    shadowFeMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
      .attr("alpha", "0.1")
    shadowFeMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  };

  // methods
  this.draw.circle = function(radius, strokeWidth) {

    var circle = svg.append("circle");

    circle
      .attr("r", 0)
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("opacity", 1)
      .attr("stroke", magicCircle.styles.colors.ring)
      .attr("fill", "none")
      .style("filter", "url(#drop-shadow" + magicCircle.id + ")")
      .attr("stroke-width", strokeWidth || radius / 100);

    if (strokeWidth > 5) {
      circle
        .style("filter", "none")

    }

    var transition = circle.transition()
      .duration(magicCircle.styles.animation.inSpeed)
      .attr("r", radius + strokeWidth / 2)
      .each("end", function() {
        transition = null
      });

    return {
      ref: circle,
      recolor: function(newColor) {
        transition = transition || circle.transition();
        if (newColor == "useNone") {
          transition
            .attr("stroke", "rgba(0,0,0,0)")
            .attr("fill-opacity", "0.0");

          return;
        }
        transition
          .attr("stroke", newColor);
      },
      on: function(event, listener) {
        circle.on(event, listener)
      },
      disperse: function() {
        var deferred = Q.defer();
        circle
          .transition()
          .duration(magicCircle.styles.animation.inSpeed)
          .attr("opacity", 0)
          .attr("r", 0)
          .each("end", deferred.resolve, circle);


        return deferred.promise;
      }
    }
  }

  this.draw.circleRing = function(radius, count, innerRadius, speed, reverse) {

    var offset = 0;

    var ring = svg.append("g")
      .attr("opacity", 1);

    var circles = [];

    for (var i = 0; i < count; i++) {

      var completeness = i / count;
      var q = 1;

      var circle = ring.append("circle");
      circle
        .attr("r", 0)
        .attr("cx", width / 2 + (Math.cos((offset + completeness) * RAD)) * q * radius)
        .attr("cy", height / 2 + (Math.sin((offset + completeness) * RAD)) * q * radius)
        .attr("stroke", magicCircle.styles.colors.smallRing)
        .attr("fill", "none")
      // .style("filter", "url(#drop-shadow)")
      .attr("stroke-width", 0.5 + innerRadius / 15);

      var transition = circle.transition()
        .duration(magicCircle.styles.animation.inSpeed)
        .attr("r", innerRadius)
        .each("end", function() {
          circle.t = undefined;
        });
      circle.t = transition;
      circles.push(circle)
    }

    var animation = magicCircle.onanimate(function() {
      offset = (reverse) ? offset - 1 * (speed || magicCircle.styles.animation.animationSpeed) : offset + 1 * (speed || magicCircle.styles.animation.animationSpeed);
      ring
        .transition()
        .ease("linear")
        .duration(100)
        .attr("transform", "rotate(" + offset + ", " + width / 2 + ", " + height / 2 + ")");
    });

    return {
      ref: ring,
      recolor: function(newColor) {
        _.each(circles, function(circle) {
          circle
            .attr("stroke", newColor);
        })
      },
      fill: function(newColor) {
        _.each(circles, function(circle) {
          circle
            .attr("fill", newColor);
        })
      },

      disperse: function() {
        var deferred = Q.defer();
        animation.stop();

        _.each(circles, function(circle) {
          circle.transition()
            .duration(500)
            .attr("r", 0);
        })

        var transition = ring.transition()
        transition
          .duration(magicCircle.styles.animation.inSpeed)
          .attr("opacity", 0)
          .each("end", deferred.resolve, ring);

        return deferred.promise;
      }
    }
  }

  this.draw.runeRing = function(radius, text, fontSize, speed, reverse, leading) {

    var rotation = 0;

    var runeId = magicCircle.id + Math.floor(Math.random() * 1000000);

    var r = 60;
    var size = radius;
    var centerX = -size;
    var centerY = 0;

    var path = defs.append("path");
    path
      .attr("id", "s3" + runeId)
      .attr("d", "m "+centerX+", "+centerY+" a -"+size+",-"+size+" 1 1,1 "+size*2+",0 a -"+size+",-"+size+" 1 1,1 -"+size*2+",0")


    var timer = magicCircle.onanimate(function() {
      rotation = (reverse) ? rotation - 1 * (speed || magicCircle.styles.animation.animationSpeed) : rotation + 1 * (speed || magicCircle.styles.animation.animationSpeed);
      ring
        .transition()
        .duration(100)
        .ease("linear")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")  rotate(" + rotation + ")");

    });

    var ring = svg.append("g")
      .attr("id", "ring" + runeId)
      .attr('transform', "translate(" + width / 2 + "," + height / 2 + ")  rotate(" + rotation + ")")
      .style("pointer-events", "none")

    var testTextLengthNode = ring.append("text")
      .style("font-size", fontSize + "px")
      .attr("xlink:href", "#s3" + runeId)
      .style("text-transform", magicCircle.styles.type.typecase)
      .style("filter", "url(#drop-shadow" + magicCircle.id + ")")
      .text(text)
    var length = ring.select('text').node().getComputedTextLength();
    testTextLengthNode.remove();

    var text = ring.append("text")
      .append("textPath")
      .style("font-size", fontSize + "px")
      .attr("xlink:href", "#s3" + runeId)
      .style("letter-spacing", leading || magicCircle.styles.type.leading)
      .style("text-transform", magicCircle.styles.type.typecase)
      .style("pointer-events", "none")
      .style("filter", "url(#drop-shadow" + magicCircle.id + ")")
      .text(text)
      .attr("fill", magicCircle.styles.colors.text)
      .attr("opacity", 0);


    var transition = text.transition()
      .duration(magicCircle.styles.animation.inSpeed)
      .ease("linear")
      .attr("opacity", 1)
      .each("end", function() {
        transition = null;
      });


    // var use = ring.append("use")
    //   .attr("xlink:href", "#s3" + runeId)
    //   .style("stroke", "none")
    //   .attr("text-rendering", "optimizeSpeed ")
    //   .style("fill", "none");

    return {
      ref: ring,
      rotation: function(rot) {
        timer.stop();
        ring
          .transition()
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")  rotate(" + parseFloat(rot + 50) + ")")

      },
      animate: function() {
        timer.start();
      },
      getLength: function() {
        return length;
      },
      recolor: function(newColor) {
        transition = transition || text.transition();
        transition
          .attr("fill", newColor)
      },
      disperse: function() {
        var deferred = Q.defer();
        transition = text.transition();
        transition
          .attr("opacity", 0)
          .each("end", deferred.resolve, text);

        // bug fix for Firefox
        //***
        setTimeout(function() {
          ring.remove();
          text.remove();
        }, 500);
        //**


        return deferred.promise;

      }
    }
  }

  this.disperse = function() {

    magicCircle.active = false;

    var elementCount = magicCircle.allElements.length;
    var elementsDispersed = 0;
    _.each(magicCircle.allElements, function(element) {
      element.disperse()
        .then(function(el) {
          elementsDispersed++;
          el.remove();
        })
    })

    magicCircle.allElements = [];
    magicCircle.animationListeners = [];
    clearInterval(animator);
    animator = null;
    magicCircle.currentRadius = 0;

    magicCircle.caster = null;
  }

  this.cast = function(rad) {

    var draw = this.draw;
    if (!animator) animator = setInterval(magicCircle.animate, 100);
    if (!svg) this.init();

    magicCircle.active = true;

    magicCircle.caster = {
      selector: selector,
      last: null,
      ring: function(strokeWidth, spaceBefore, spaceAfter) {
        var circle = draw.circle(magicCircle.currentRadius, strokeWidth || 1);
        if (spaceBefore) this.space(spaceBefore);
        magicCircle.allElements.push(circle);
        if (strokeWidth) magicCircle.currentRadius += strokeWidth;
        this.last = circle;
        if (spaceAfter) this.space(spaceAfter);
        return this;
      },
      getTextFitSize: function(text) {

        var errorMargin = 2;

        var textSizeA = 10;
        var runeRing = magicCircle.draw.runeRing(magicCircle.currentRadius, text, textSizeA, 0, "0");
        var length = runeRing.getLength();

        var circumference = this.getCircumference();

        var fitRatio = circumference / length;
        var textSizeB = textSizeA * fitRatio;

        runeRing.disperse();

        return textSizeB;


      },
      getCircumference: function() {
        return magicCircle.currentRadius * 2 * Math.PI;
      },
      target: function(element) {
        this.last = element;
        return this;
      },
      color: function(color) {
        if (this.last.recolor) {
          this.last.recolor(color);
        } else {
          console.warn("Cant recolor this element", this.last);
        }

        return this;
      },
      getLast: function() {
        return this.last;
      },
      fill: function(color) {
        if (this.last.fill) {
          this.last.fill(color);
        } else {
          console.warn("Cant fill this element", this.last);
        }

        return this;
      },
      rotation: function(rotation) {
        if (this.last.rotation) {
          this.last.rotation(rotation);
        } else {
          console.warn("Cant rotate element", this.last);
        }

        return this;
      },
      circleRing: function(count, innerRadius, speed, reverse) {
        var circleRing = draw.circleRing(magicCircle.currentRadius + innerRadius, count, innerRadius, speed, reverse);
        magicCircle.allElements.push(circleRing);
        magicCircle.currentRadius += innerRadius * 2;
        this.last = circleRing;
        return this;
      },
      space: function(length) {
        magicCircle.currentRadius += length;
        return this;
      },
      backspace: function(length) {
        magicCircle.currentRadius -= length;
        return this;
      },
      text: function(height, text, speed, reverse,leading) {
        if (height == "autofit") {
          var circumference = this.getCircumference();
          height = this.getTextFitSize(text);
          leading = "0";
        }

        var padding = 2;
        var text = draw.runeRing(magicCircle.currentRadius + padding, text, height, speed || 1, reverse, leading);
        magicCircle.allElements.push(text);
        magicCircle.currentRadius += height;
        this.last = text;
        return this;
      },
      disperse: function() {
        magicCircle.disperse();
      },
      on: function(event, listener) {
        var target = this.last;
        var returner = this;
        if (this.last.on) {
          this.last.on(event, function() {
            returner.last = target;
            listener(returner, target);
            1
          })
        } else {
          console.warn("Can't attach a listener to this object");
        }

        return this;

      }
    }

    return magicCircle.caster;

  }

}
