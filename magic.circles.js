function circle(selector, radius) {

    var width = 500;
    height = 500;
    svg = d3.select(selector)
        .select("svg")

    svg.append("circle")
        .attr("r", 0)
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("stroke", "#000")
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .transition()
        .duration(500)
        .attr("r", radius)

}

function rune(selector, radius, text, fontSize) {

    var width = $(selector).width();
    var height = $(selector).height();
    var rotation = 179;

    var svg = d3.select(selector)
        .select("svg")

    var runeId = lol.guid();

    var path = svg.append("defs").append("path");
    path
        .attr("id", "s3" + runeId)
        .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") scale(" + radius + "," + radius + ")")
        .transition()
        .duration(5000)
        .ease("linear")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") scale(" + radius + "," + radius + ") rotate("+rotation+")");

    setInterval(function() {
    		rotation += 179.9;
        path
            .transition()
            .duration(5000)
            .ease("linear")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") scale(" + radius + "," + radius + ") rotate("+rotation+")");
    }, 5000);

    var thing = svg.append("g")
        .attr("id", "thing" + runeId)
        .style("fill", "navy");

    thing.append("text")
        .style("font-size", fontSize || 20 + "px")
        .append("textPath")
        .attr("xlink:href", "#s3" + runeId)
        .text(text);

    thing.append("use")
        .attr("xlink:href", "#s3" + runeId)
        .style("stroke", "none")
        .style("fill", "none");

}


circle("#circle1", 150);
circle("#circle1", 145);

circle("#circle1", 100);
circle("#circle1", 85);

circle("#circle1", 50);
circle("#circle1", 45);

rune("#circle1", 85, lol.physics(), 20);
rune("#circle1", 45, lol.physics(), 10);
rune("#circle1", 105, lol.physics(), 45);
