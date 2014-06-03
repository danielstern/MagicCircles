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

    var svg = d3.select(selector)
    	.select("svg")

    var runeId = lol.guid();

    svg.append("defs").append("path")
    .attr("id", "s3"+runeId)
    .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
     .attr("transform","translate("+width/2+","+height/2+") scale("+radius+","+radius+")")
    // .attr("scale",150)

    var thing = svg.append("g")
        .attr("id", "thing"+runeId)
        .style("fill", "navy");
     
    thing.append("text")
        .style("font-size", fontSize||20+"px")
      .append("textPath")
        .attr("xlink:href", "#s3"+runeId)
        .text(text);
     
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

rune("#circle1",85,"ω2 = ω02 + 2α(θ − θ0)",20);
rune("#circle1",45,"ω2 = ω02 + 2α(θ − θ0)",10);
rune("#circle1",105,"ω2 = ω02 + 2α(θ − θ0)",45);

