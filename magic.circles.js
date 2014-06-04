var MagicCircle = function(selector) {

    var RAD = Math.PI * 2;

    var width = $(selector).width();
    var height = $(selector).height();

    var svg = d3.select(selector)
        .select("svg")

    var defs = svg.append("defs");

    this.draw = {};

    var colors = {
        ring: "#182645",
        text: "#243a6c",
        smallRing: "#304f93",
    }

        function init() {

            var shadowFilter = defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("height", "130%");

            // SourceAlpha refers to opacity of graphic that this filter will be applied to
            // convolve that with a Gaussian with standard deviation 3 and store result
            // in blur
            shadowFilter.append("feGaussianBlur")
                .attr("in", "SourceAlpha")
                .attr("stdDeviation", 5)
                .attr("result", "blur");

            // translate output of Gaussian blur to the right and downwards with 2px
            // store result in offsetBlur
            shadowFilter.append("feOffset")
                .attr("in", "blur")
                .attr("dx", 2)
                .attr("dy", 2)
                .attr("result", "offsetBlur");

            // overlay original SourceGraphic over translated blurred opacity by using
            // feMerge filter. Order of specifying inputs is important!
            var feMerge = shadowFilter.append("feMerge");

            feMerge.append("feMergeNode")
                .attr("in", "offsetBlur")
            feMerge.append("feMergeNode")
                .attr("in", "SourceGraphic");
        };

    init();

    var animationSpeed = 500;

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
            .duration(animationSpeed)
            .attr("r", radius)

    }

    this.draw.circleRing = function(selector, radius, count, innerRadius, reverse) {

        var offset = 0;

        var g = svg.append("g")

        for (var i = 0; i < count; i++) {

            var completeness = i / count;
            var q = 1;

            var circle = g.append("circle");
            circle
                .attr("r", 0)
                .attr("cx", width / 2 + (Math.cos((offset + completeness) * RAD)) * q * radius)
                .attr("cy", height / 2 + (Math.sin((offset + completeness) * RAD)) * q * radius)
                .attr("stroke", colors.smallRing)
                .attr("fill", "none")
                .attr("stroke-width", innerRadius / 5);

            circle
                .transition()
                .duration(animationSpeed)
                .attr("r", innerRadius)



        }

        setInterval(animate, 100, g);

        function animate(ring) {
            offset = (reverse) ? offset - 1 : offset + 1;
            ring
                .transition()
                .ease("linear")
                .duration(100)
                .attr("transform", "rotate(" + offset + ", 250, 250)");

        }




    }

    this.draw.runeRing = function(selector, radius, text, fontSize, reverse) {

        var rotation = 0;
        rotation = (reverse) ? rotation - 179.9 : rotation + 179.9;

        var runeId = lol.guid();

        var path = svg.append("defs").append("path");
        path
            .attr("id", "s3" + runeId)
            .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
            .attr("transform", "scale(" + radius + "," + radius + ")")



        function animate() {
            rotation = (reverse) ? rotation - 179.9 : rotation + 179.9;
            ring
                .transition()
                .duration(5000)
                .ease("linear")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")  rotate(" + rotation + ")");

        }

        setInterval(animate, 5000);


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
            .duration(400)
            .ease("linear")
            .attr("opacity", 1);

        ring.append("use")
            .attr("xlink:href", "#s3" + runeId)
            .style("stroke", "none")
            .attr("text-rendering", "optimizeSpeed ")
            .style("fill", "none");

        animate();



    }

    this.cast = function(defs) {

        var draw = this.draw;

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

        draw.circleRing("#circle1", 70, 6, 15, true);
        draw.circleRing("#circle1", 70, 18, 5);
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



var circle = new MagicCircle("#circle1");
circle.cast();