function circle(selector,radius) {

	var width = 500;
	height = 500;
	svg = d3.select(selector);

	var frame = $(selector).find('svg')[0];

	console.log("Drawin circle");
	if (!frame) {

	    var svg = frame || d3.select(selector)
	        .append("svg")
	        .attr("class","main")
	        .attr("width", width)
	        .attr("height", height)
	       

	    }   else {
	        var svg = d3.select(selector).select(".main");
	    }

	    svg .append("circle")
	        .attr("r",0)
	        .attr("cx",width/2)
	        .attr("cy",height/2)
	        .attr("stroke","#000")
	        .attr("fill","none")
	        .attr("stroke-width",3)
	        	.transition()
	        	.duration(500)
	        	.attr("r",radius)

}

circle("#circle1",150);
circle("#circle1",145);

circle("#circle1",100);
circle("#circle1",85);

circle("#circle1",50);
circle("#circle1",45);