var MagicCircle = function(selector) {

  // CONSTS
  var RAD = Math.PI * 2;
  var magicCircle = this;

  var caster = undefined;
  var width, defs,
    height;

  var svg;

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
    
    console.log("Inited", selector, width,height);

    svg = d3.select(selector)
      .append("svg")
      // .attr("width", width)
      // .attr("height", height)
      .attr("class","main")
      // .attr("shape-rendering","optimizeSpeed")
      // .attr("viewBox","0 0 500 500")
      // .attr("transform","scale(0.2)")
    defs = svg.append("defs");

    var blurFilter = defs.append("filter")
      .attr("id", "drop-blur")
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
      .attr("id", "drop-shadow")
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
      .style("filter", "url(#drop-shadow)")
      .attr("stroke-width", strokeWidth || radius / 100);

    if (strokeWidth > 5) {
      circle
        .style("filter", "none")

    }

    var transition = circle.transition()
      .duration(magicCircle.styles.animation.inSpeed)
      .attr("r", radius + strokeWidth/2)
      .each("end",function(){transition = null});

    return {
      ref: circle,
      recolor: function(newColor) {
          transition = transition || circle.transition();
          if (newColor == "useNone") {
            // console.log("")
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
          .each("end", deferred.resolve);


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
          console.log("Recoloring",circle.t);
          // circle.t.duration(0)
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
          .each("end", deferred.resolve);

        return deferred.promise;
      }
    }
  }

  this.draw.runeRing = function(radius, text, fontSize, speed, reverse) {

    var rotation = 0;

    var runeId = lol.guid();

    var path = defs.append("path");
    path
      .attr("id", "s3" + runeId)
      .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
      .attr("transform", "scale(" + radius + "," + radius + ")")


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

    var text = ring.append("text")
      .style("font-size", fontSize + "px")
      .append("textPath")
      .attr("xlink:href", "#s3" + runeId)
      .style("letter-spacing", magicCircle.styles.type.leading)
      .style("text-transform", magicCircle.styles.type.typecase)
      .style("pointer-events", "none")
      .style("filter", "url(#drop-shadow)")
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

    var use = ring.append("use")
      .attr("xlink:href", "#s3" + runeId)
      .style("stroke", "none")
      .attr("text-rendering", "optimizeSpeed ")
      .style("fill", "none");

    return {
      ref: ring,
      rotation: function(rot) {
        timer.stop();
        ring
            .transition()
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")  rotate(" + rot + ")")

      },
      animate:function() {
        timer.start();
      },
      recolor: function(newColor) {
        transition = transition || text.transition();
        transition
          .attr("fill", newColor)
      },
      disperse: function() {
        var deferred = Q.defer();
        transition = transition || text.transition();
        transition
          .attr("opacity", 0)
          .each("end", deferred.resolve);

        return deferred.promise;

      }
    }
  }

  this.disperse = function() {

    var elementCount = magicCircle.allElements.length;
    var elementsDispersed = 0;
    _.each(magicCircle.allElements, function(element) {
      element.disperse()
        .then(function() {
          elementsDispersed++;
          if (elementsDispersed == elementCount) {
            svg.remove()
            svg = null;
          }
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
      target:function(element){
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
      text: function(height, text, speed, reverse) {
        var padding = 2;
        var text = draw.runeRing(magicCircle.currentRadius + padding, text, height, speed || 1, reverse);
        magicCircle.allElements.push(text);
        magicCircle.currentRadius += height;
        this.last = text;
        return this;
      },
      disperse: function() {
        magicCircle.disperse();
      },
      on: function(event,listener) {
        var target = this.last;
        var returner = this;
        if (this.last.on) {
          this.last.on(event,function(){
            returner.last = target;
            listener(returner,target);1
          })
        } else {
          console.warn("Can't attach a listener to this object");
        }

        return this;

      },
    }

    return magicCircle.caster;

  }

}
