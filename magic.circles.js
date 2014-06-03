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

    // svg
    // // .append("g")
    // //     .attr("x",15)
    // //     .attr("y",150)
    // .append('path')
    // .attr("d","M 10,90 Q 100,15 200,70 Q 340,140 400,30")
    // .attr("id","cs")
    // .attr("fill","none")
    // .attr("stroke","blue")
    // .attr("strokeWidth",1);

    // svg
    // .append("text")
    //     .text(text)
    //     .attr("y",150)
    //     .attr("x",150)
    //     .append("textPath")
    //     	.attr("xlink:href", "#cs")

    svg.append("defs").append("path")
    .attr("id", "s3")
    .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
    .attr("transform","translate(100,100) scale(100,100)")

    var thing = svg.append("g")
        .attr("id", "thing")
        .style("fill", "navy");
     
    thing.append("text")
        .style("font-size", "20px")
      .append("textPath")
        .attr("xlink:href", "#s3")
        .text("Wavy text is the gimmick for many years to come (d3)");
     
    thing.append("use")
        .attr("xlink:href", "#s3")
        .style("stroke", "none")
        .style("fill", "none");

}


circle("#circle1", 150);
circle("#circle1", 145);

circle("#circle1", 100);
circle("#circle1", 85);

circle("#circle1", 50);
circle("#circle1", 45);

rune("#circle1","ω2 = ω02 + 2α(θ − θ0)");