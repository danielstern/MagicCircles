var MagicCircle = function(selector) {

    // CONSTS
    var RAD = Math.PI * 2;
    var magicCircle = this;
    var width = $(selector).width();
    var height = $(selector).height();

    var svg;

    // user settings    

    // initializers
    this.draw = {};
    var animator = undefined;
    this.animationListeners = [];
    this.onanimate = function(l) {
        this.animationListeners.push(l);
    }

    this.currentRadius = 0;

    this.animate = function() {
        for (var i = 0; i < magicCircle.animationListeners.length; i++) {
            magicCircle.animationListeners[i]();
        }

        console.log("animate");
    }

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

        svg = d3.select(selector)
            .append("svg")
        var defs = svg.append("defs");

        var blurFilter = defs.append("filter")
            .attr("id", "drop-blur")
            .attr("height", "130%")

        blurFilter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", magicCircle.styles.graphics.blur.level)
            .attr("result", "blur");

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



        // animator = setInterval(magicCircle.animate, 100);

    };

    // init();

    // methods
    this.draw.circle = function(radius) {

        var circle = svg.append("circle");

        circle
            .attr("r", 0)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("opacity", 1)
            .attr("stroke", magicCircle.styles.colors.ring)
            .attr("fill", "none")
            .style("filter", "url(#drop-shadow)")
            .attr("stroke-width", radius / 100)

        circle
            .transition()
            .duration(magicCircle.styles.animation.inSpeed)
            .attr("r", radius)

        return {
            disperse: function() {
                circle
                    .transition()
                    .duration(magicCircle.styles.animation.inSpeed)
                    .attr("opacity", 0)
                    .attr("r", 0);
            }
        }

    }

    this.draw.circleRing = function(radius, count, innerRadius, speed, reverse) {

        var offset = 0;

        var ring = svg.append("g")
            .attr("opacity", 1);

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
                .style("filter", "url(#drop-blur)")
                .attr("stroke-width", 0.5 + innerRadius / 15);

            circle
                .transition()
                .duration(magicCircle.styles.animation.inSpeed)
                .attr("r", innerRadius)


        }

        magicCircle.onanimate(function() {
            offset = (reverse) ? offset - 1 * (speed || animationSpeed) : offset + 1 * (speed || animationSpeed);
            ring
                .transition()
                .ease("linear")
                .duration(100)
                .attr("transform", "rotate(" + offset + ", " + width / 2 + ", " + width / 2 + ")");
        });

        return {
            disperse: function() {
                ring
                    .transition()
                    .duration(magicCircle.styles.animation.inSpeed)
                    .attr("opacity", 0);
            }
        }
    }

    this.draw.runeRing = function(radius, text, fontSize, speed, reverse) {

        var rotation = 0;

        var runeId = lol.guid();

        var path = svg.append("defs").append("path");
        path
            .attr("id", "s3" + runeId)
            .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
            .attr("transform", "scale(" + radius + "," + radius + ")")


        magicCircle.onanimate(function() {
            rotation = (reverse) ? rotation - 1 * (speed || animationSpeed) : rotation + 1 * (speed || animationSpeed);
            ring
                .transition()
                .duration(100)
                .ease("linear")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")  rotate(" + rotation + ")");

        });

        var ring = svg.append("g")
            .attr("id", "ring" + runeId)
            .attr('transform', "translate(" + width / 2 + "," + height / 2 + ")  rotate(" + rotation + ")")

        ring.append("text")
            .style("font-size", fontSize + "px")
            .append("textPath")
            .attr("xlink:href", "#s3" + runeId)

        .style("letter-spacing", magicCircle.styles.type.leading)
            .style("text-transform", magicCircle.styles.type.typecase)
            .style("filter", "url(#drop-blur)")
            .text(text)
            .attr("opacity", 0)
            .attr("fill", magicCircle.styles.colors.text)
            .transition()
            .duration(magicCircle.styles.animation.inSpeed)
            .ease("linear")
            .attr("opacity", 1);

        ring.append("use")
            .attr("xlink:href", "#s3" + runeId)
            .style("stroke", "none")
            .attr("text-rendering", "optimizeSpeed ")
            .style("fill", "none");

        return {
            disperse: function() {
                ring
                    .transition()
                    .duration(magicCircle.styles.animation.inSpeed)
                    .attr("opacity", 0);
            }
        }



    }


    this.allElements = [];
    this.disperse = function() {
        _.each(magicCircle.allElements, function(element) {
            element.disperse();
        })

        magicCircle.allElements = [];
        magicCircle.animationListeners = [];
        magicCircle.currentRadius = 0;
        clearInterval(animator);
        setTimeout(function() {
                svg.remove()
            }

            , 1000);
    }

    this.cast = function(rad) {

        var draw = this.draw;
        animator = setInterval(magicCircle.animate, 100);

        this.init();

        return {
            selector: selector,
            ring: function(radius) {
                var circle = draw.circle(magicCircle.currentRadius);
                magicCircle.allElements.push(circle);
                if (radius) return this.space(radius);
                return this;
            },
            circleRing: function(count, innerRadius, speed, reverse) {
                var circleRing = draw.circleRing(magicCircle.currentRadius + innerRadius, count, innerRadius, speed, reverse);
                magicCircle.allElements.push(circleRing);
                magicCircle.currentRadius += innerRadius * 2;
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
                var text = draw.runeRing(magicCircle.currentRadius + padding, text, height, speed || 10, reverse);
                magicCircle.allElements.push(text);
                magicCircle.currentRadius += height;
                return this;
            },
            disperse: function() {
                magicCircle.disperse();
            }
        }

    }

}



var magic = new MagicCircle("#circle1", 2);
var magic2 = new MagicCircle("#circle2", 2);

magic.styles.colors.ring = "#8091d4"
magic.styles.colors.smallRing = "#bfc8ea"
magic.styles.colors.text = "#9facdf"

var fire = {
    ring: "#b43b54",
    smallRing: "#c8526a",
    text: "#fee"
}

//magic.styles.colors = fire;
var miscRing = function(count) {
    var _magic = magic;
    var returner;

    for (var i = 0; i < count; i++) {
        if (!returner) {
            returner = _magic.cast();
        } else {
            returner = returner
                .ring(10)
                .circleRing(10, 5, 10, true)
                .ring()
                .text(7, lol.hipster())
        }


    }

    return returner;
}

setInterval(function() {
    drawAndErase();

}, 3000);

function drawAndErase() {
    var _magic = miscRing(4);

    setTimeout(function() {
        _magic.disperse();
    }, 1500);
}
