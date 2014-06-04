var MagicCircle = function(selector, animationSpeed) {

    // CONSTS
    var RAD = Math.PI * 2;    
    var magicCircle = this;
    var width = $(selector).width();
    var height = $(selector).height();
    var svg = d3.select(selector)
        .select("svg")

    var defs = svg.append("defs");


    // user settings    
    var introAnimationTime = 777;
    var animationSpeed = animationSpeed || 5;


    // initializers
    this.draw = {};
    this.animationListeners = [];
    this.onanimate = function(l) {
        this.animationListeners.push(l);
    }

    this.animate = function() {
        for (var i = 0; i < magicCircle.animationListeners.length; i++) {
            magicCircle.animationListeners[i]();
        }
    }

    var colors = {
        ring: "#182645",
        text: "#243a6c",
        smallRing: "#304f93",
    }

    function init() {

        var shadowFilter = defs.append("filter")
            .attr("id", "drop-shadow")
            .attr("height", "130%");

        shadowFilter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", 5)
            .attr("result", "blur");

        shadowFilter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 2)
            .attr("dy", 2)
            .attr("result", "offsetBlur");

        var feMerge = shadowFilter.append("feMerge");

        feMerge.append("feMergeNode")
            .attr("in", "offsetBlur")
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        setInterval(magicCircle.animate, 100);
    };

    init();

    // methods
    this.draw.circle = function(selector, radius) {

        var circle = svg.append("circle");

        circle
            .attr("r", 0)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("stroke", colors.ring)
            .attr("fill", "none")
            .attr("stroke-width", radius / 100)

        circle
            .transition()
            .duration(introAnimationTime)
            .attr("r", radius)

    }

    this.draw.circleRing = function(selector, radius, count, innerRadius, reverse) {

        var offset = 0;

        var ring = svg.append("g")

        for (var i = 0; i < count; i++) {

            var completeness = i / count;
            var q = 1;

            var circle = ring.append("circle");
            circle
                .attr("r", 0)
                .attr("cx", width / 2 + (Math.cos((offset + completeness) * RAD)) * q * radius)
                .attr("cy", height / 2 + (Math.sin((offset + completeness) * RAD)) * q * radius)
                .attr("stroke", colors.smallRing)
                .attr("fill", "none")
                .attr("stroke-width", 0.5 + innerRadius / 15);

            circle
                .transition()
                .duration(introAnimationTime)
                .attr("r", innerRadius)



        }

        magicCircle.onanimate(function(){
            offset = (reverse) ? offset - 1 * animationSpeed : offset + 1 * animationSpeed;
            ring
                .transition()
                .ease("linear")
                .duration(100)
                .attr("transform", "rotate(" + offset + ", "+width/2+", "+width/2+")");
        });
    }

    this.draw.runeRing = function(selector, radius, text, fontSize, speed, reverse) {

        var rotation = 0;

        var runeId = lol.guid();

        var path = svg.append("defs").append("path");
        path
            .attr("id", "s3" + runeId)
            .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
            .attr("transform", "scale(" + radius + "," + radius + ")")


        magicCircle.onanimate(function(){
            rotation = (reverse) ? rotation - 1 * animationSpeed : rotation + 1 * animationSpeed;
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
            .style("font-size", fontSize || 20 + "px")
            .append("textPath")
            .attr("xlink:href", "#s3" + runeId)
            .style("filter", "url(#drop-shadow)")
            .text(text)
            .attr("opacity", 0)
            .attr("fill", colors.text)
            .transition()
            .duration(introAnimationTime)
            .ease("linear")
            .attr("opacity", 1);

        ring.append("use")
            .attr("xlink:href", "#s3" + runeId)
            .style("stroke", "none")
            .attr("text-rendering", "optimizeSpeed ")
            .style("fill", "none");



    }

    this.cast = function(rad) {

        var draw = this.draw;

        return {
            currentRadius: 0,
            selector: selector,
            ring:function(radius){
                draw.circle(selector, this.currentRadius);
                if (radius) return this.space(radius);
                return this;
            },
            space:function(length){
                this.currentRadius += length;
                return this;
            },
            backspace:function(length){
                this.currentRadius -= length;
                return this;
            },
            text:function(height,text,speed,reverse){
                var padding = 2;
                draw.runeRing(this.selector, this.currentRadius + padding, text, height, speed || 10, reverse);
                this.currentRadius += height;
                return this;
            }
        }

        draw.circle("#circle1", 180);
        draw.circle("#circle1", 190);

        draw.circle("#circle1", 150);
        draw.circle("#circle1", 145);

        draw.circle("#circle1", 105);
        draw.circle("#circle1", 85);

        draw.circle("#circle1", 50);
        draw.circle("#circle1", 45);

        draw.circle("#circle1", 35);
        draw.circle("#circle1", 25);

        draw.circleRing("#circle1", 67, 6, 15, true);
        draw.circleRing("#circle1", 67, 18, 5);
        draw.circleRing("#circle1", 85, 40, 2, true);
        draw.circleRing("#circle1", 185, 72, 3);

        draw.runeRing("#circle1", 27, "ηκε ολοσχερώς στο μυαλό των θεατών από τη φαντασ", 5, true);
        draw.runeRing("#circle1", 45, "ηκε ολοσχερώς στο μυαλό των θεατών από τη φαντασ", 8, false);
        draw.runeRing("#circle1", 90, "μέχρι το μυαλό της σε μια εμφάνιση του θάρρους. Όταν", 15, true);
        draw.runeRing("#circle1", 115, "δάκρυ φάνηκε να σκοτεινιάζει τα μάτια της όταν μας είδε? αλλά ανάρρωσε γρήγορα τον εαυτό της ", 35);
        draw.runeRing("#circle1", 160, "δάκρυ φάνηκε να σκοτεινιάζει τα μάτια της όταν μας είδε? αλλά ανάρρωσε γρήγορα τον εαυτό της ", 15, true);
        draw.runeRing("#circle1", 145, lol.hipster() + lol.hipster(), 7, true);

    }

}



var magic = new MagicCircle("#circle1");
magic.cast()
    .ring(10)
    .text(7, "Hey hey mr dj!")
    .ring(5)
    .ring(5)
    .ring(5)
    .text(15, "You're the ring now dog",10)
    .ring(5)
    .ring(5)
    .space(10)
    .ring()
    .space(5)
    .ring()
