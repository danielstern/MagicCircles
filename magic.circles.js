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

function circleRing(selector, radius, count) {

    var width = 500;
    var height = 500;
    var innerRadius = radius / count + 5;
    svg = d3.select(selector)
        .select("svg")

		for (var i = 0; i < count; i++) {

			svg.append("circle")
			    .attr("r", innerRadius)
			    .attr("cx", width / 2 + (Math.sin(i) * count / Math.PI) * (radius - 5))
			    .attr("cy", height / 2 + (Math.cos(i) * count / Math.PI) * (radius - 5))
			    .attr("stroke", "gray")
			    .attr("fill", "none")
			    .attr("stroke-width", 3)
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
        .attr("transform", "scale(" + radius + "," + radius + ")");
        // .transition()
        // .duration(5000)
        // .ease("linear")
        // .attr("transform", "scale(" + radius + "," + radius + ")");


    function animate() {
    			rotation = (reverse) ? rotation - 179.9 : rotation + 179.9;
    	    thing
    	        .transition()
    	        .duration(5000)
    	        .ease("linear")
    	        .attr("transform","translate(" + width / 2 + "," + height / 2 + ")  rotate("+rotation+")");

    }
    
    setInterval(animate, 5000);


    var thing = svg.append("g")
        .attr("id", "thing" + runeId)
        .attr('transform',"translate(" + width / 2 + "," + height / 2 + ")  rotate("+rotation+")")

    thing.append("text")
        .style("font-size", fontSize || 20 + "px")
        .append("textPath")
        .attr("xlink:href", "#s3" + runeId)
        .text(text);

    thing.append("use")
        .attr("xlink:href", "#s3" + runeId)
        .style("stroke", "none")
        .attr("text-rendering", "optimizeSpeed ")
        .style("fill", "none");
    
	    animate();

}


circle("#circle1", 150);
circle("#circle1", 145);

circle("#circle1", 105);
circle("#circle1", 85);

circle("#circle1", 50);
circle("#circle1", 45);

circleRing("#circle1", 45, 6);
circleRing("#circle1", 50, 12);

rune("#circle1", 45, "parturient montes, nascetur ridiculus mus", 8, false);
rune("#circle1", 90, "si post fata venit gloria non propero", 15,true);
rune("#circle1", 115, "stultorum calami carbones moenia chartae ", 35);
//rune("#circle1", 145, lol.hipster() + lol.hipster(), 7,true);
