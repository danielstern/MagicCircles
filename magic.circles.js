function circle(selector, radius) {

    var width = 500;
    height = 500;
    svg = d3.select(selector)
        .select("svg");

    var circle = svg.append("circle");

    circle
        .attr("r", 0)
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("stroke", "#000")
        .attr("fill", "none")
        .attr("stroke-width", radius / 100)

    circle
        .transition()
        .duration(500)
        .attr("r", radius)

}

function circleRing(selector, radius, count, innerRadius, reverse) {

    var width = 500;
    var height = 500;
    var RAD = Math.PI * 2;
    var offset = 0;

    svg = d3.select(selector)
        .select("svg")
    var g = svg.append("g")

    for (var i = 0; i < count; i++) {

        var completeness = i / count;
        var q = 1;

        var circle = g.append("circle");
        circle
            .attr("r", 0)
            .attr("cx", width / 2 + (Math.cos((offset + completeness) * RAD)) * q * radius)
            .attr("cy", height / 2 + (Math.sin((offset + completeness) * RAD)) * q * radius)
            .attr("stroke", "gray")
            .attr("fill", "none")
            .attr("stroke-width", innerRadius / 5);

        circle
            .transition()
            .duration(500)
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

function rune(selector, radius, text, fontSize, reverse) {

    var width = $(selector).width();
    var height = $(selector).height();
    var rotation = 0;
    rotation = (reverse) ? rotation - 179.9 : rotation + 179.9;

    var svg = d3.select(selector)
        .select("svg")

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

    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 2)
        .attr("dy", 2)
        .attr("result", "offsetBlur");

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

}

circle("#circle1", 180);
circle("#circle1", 190);

circle("#circle1", 150);
circle("#circle1", 145);

circle("#circle1", 105);
circle("#circle1", 85);

circle("#circle1", 50);
circle("#circle1", 45);

circle("#circle1", 35);
circle("#circle1", 25);

circleRing("#circle1", 70, 6, 15, true);
circleRing("#circle1", 70, 18, 5);
circleRing("#circle1", 85, 40, 2, true);
circleRing("#circle1", 185, 72, 3);

rune("#circle1", 27, "ηκε ολοσχερώς στο μυαλό των θεατών από τη φαντασ", 5, true);
rune("#circle1", 45, "ηκε ολοσχερώς στο μυαλό των θεατών από τη φαντασ", 8, false);
rune("#circle1", 90, "μέχρι το μυαλό της σε μια εμφάνιση του θάρρους. Όταν", 15, true);
rune("#circle1", 115, "δάκρυ φάνηκε να σκοτεινιάζει τα μάτια της όταν μας είδε? αλλά ανάρρωσε γρήγορα τον εαυτό της ", 35);
rune("#circle1", 160, "δάκρυ φάνηκε να σκοτεινιάζει τα μάτια της όταν μας είδε? αλλά ανάρρωσε γρήγορα τον εαυτό της ", 15, true);
//rune("#circle1", 145, lol.hipster() + lol.hipster(), 7,true);
