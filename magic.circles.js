function circle(selector,radius) {

	var width = $(selector).width();
	height = $(selector).height();
	svg = d3.select(selector);

	var frame = $(selector).find('svg')[0];

	console.log("Drawin circle");
	if (!frame) {

	    var svg = frame || d3.select(selector)
	        .append("svg")
	        .attr("class","main")
	        .attr("width", width)
	        .attr("height", height)
	        .append("circle")
	        .attr("r",0)
	        .attr("cx",width/4)
	        .attr("cy",height/4)
	        .attr("stroke","#000")
	        .attr("fill","none")
	        .attr("stroke-width",3)
	        	.transition()
	        	.duration(500)
	        	.attr("r",150)


	    }   else {
	        var svg = d3.select(selector).select(".main");
	    }
}

circle("#circle1")