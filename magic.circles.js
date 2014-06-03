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

function rune(selector, text) {

    var width = 500;
    height = 500;
    var svg = d3.select(selector)
    	.select("svg")

    svg
    // .append("g")
    //     .attr("x",15)
    //     .attr("y",150)
    .append("text")
        .text(text)
        .attr("y",150)
        .attr("x",150)

}


circle("#circle1", 150);
circle("#circle1", 145);

circle("#circle1", 100);
circle("#circle1", 85);

circle("#circle1", 50);
circle("#circle1", 45);

rune("#circle1","ω2 = ω02 + 2α(θ − θ0)");