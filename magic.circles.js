var MagicCircle = function(selector) {

    // CONSTS
    var RAD = Math.PI * 2;
    var magicCircle = this;

    var caster = undefined;
    var width,defs,
    height;

    var svg;


    // initializers
    this.draw = {};
    var animator = undefined;

    this.animationListeners = [];
    this.allElements = [];
    this.onanimate = function(l) {
        this.animationListeners.push(l);
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

        console.log("Inited",selector,$(selector));

        width = $(selector).width();
        height = $(selector).height();

        svg = d3.select(selector)
            .append("svg");
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

        console.log("HW?",height,width);

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
                .style("filter", "url(#drop-shadow)")
                .attr("stroke-width", 0.5 + innerRadius / 15);

            circle
                .transition()
                .duration(magicCircle.styles.animation.inSpeed)
                .attr("r", innerRadius)


        }

        magicCircle.onanimate(function() {
            offset = (reverse) ? offset - 1 * (speed || magicCircle.styles.animation.animationSpeed) : offset + 1 * (speed || magicCircle.styles.animation.animationSpeed);
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

        var path = defs.append("path");
        path
            .attr("id", "s3" + runeId)
            .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
            .attr("transform", "scale(" + radius + "," + radius + ")")


        magicCircle.onanimate(function() {
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

        ring.append("text")
            .style("font-size", fontSize + "px")
            .append("textPath")
            .attr("xlink:href", "#s3" + runeId)

        .style("letter-spacing", magicCircle.styles.type.leading)
            .style("text-transform", magicCircle.styles.type.typecase)
            .style("filter", "url(#drop-shadow)")
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

    this.disperse = function() {
        _.each(magicCircle.allElements, function(element) {
            element.disperse();
        })

        magicCircle.allElements = [];
        magicCircle.animationListeners = [];
        clearInterval(animator);
        animator = null;
        magicCircle.currentRadius = 0;
        setTimeout(function() {
                svg
                    .remove()
                svg = null;
            }
        , magicCircle.styles.animation.inSpeed + 100);

        magicCircle.caster = null;
    }

    this.cast = function(rad) {

        console.log("Casting");

        var draw = this.draw;
        if (!animator) animator = setInterval(magicCircle.animate, 100);

        if (!svg) this.init();

        // this.init();

        magicCircle.caster = {
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

        return magicCircle.caster;

    }

}

