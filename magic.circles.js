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
            .attr("height", "130%")

        shadowFilter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", 4)
            .attr("result", "blur");

        shadowFilter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 0)
            .attr("dy", 0)
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
    this.draw.circle = function(radius) {

        var circle = svg.append("circle");

        circle
            .attr("r", 0)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("stroke", colors.ring)
            .attr("fill", "none")
            .style("filter", "url(#drop-shadow)")
            .attr("stroke-width", radius / 100)

        circle
            .transition()
            .duration(introAnimationTime)
            .attr("r", radius)

    }

    this.draw.circleRing = function(radius, count, innerRadius, speed, reverse) {

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
                .style("filter", "url(#drop-shadow)")
                .attr("stroke-width", 0.5 + innerRadius / 15);

            circle
                .transition()
                .duration(introAnimationTime)
                .attr("r", innerRadius)


        }

        magicCircle.onanimate(function(){
            offset = (reverse) ? offset - 1 * (speed || animationSpeed) : offset + 1 * (speed || animationSpeed);
            ring
                .transition()
                .ease("linear")
                .duration(100)
                .attr("transform", "rotate(" + offset + ", "+width/2+", "+width/2+")");
        });
    }

    this.draw.runeRing = function(radius, text, fontSize, speed, reverse) {

        var rotation = 0;

        var runeId = lol.guid();

        var path = svg.append("defs").append("path");
        path
            .attr("id", "s3" + runeId)
            .attr("d", "M 0,-1   C 0.5523, -1   1, -0.5523    1,0  C 1, 0.5523    0.5523, 1     0,1  C -0.5523, 1   -1, 0.5523    -1,0         C -1, -0.5523  -0.5523, -1   0,-1")
            .attr("transform", "scale(" + radius + "," + radius + ")")


        magicCircle.onanimate(function(){
            rotation = (reverse) ? rotation - 1 * (speed || animationSpeed) : rotation + 1 * (speed || animationSpeed);
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
                draw.circle(this.currentRadius);
                if (radius) return this.space(radius);
                return this;
            },
            circleRing:function(count,innerRadius,speed,reverse) {
                draw.circleRing(this.currentRadius + innerRadius, count, innerRadius, speed, reverse);
                this.currentRadius += innerRadius * 2;
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
                draw.runeRing(this.currentRadius + padding, text, height, speed || 10, reverse);
                this.currentRadius += height;
                return this;
            }
        }

    }

}



var magic = new MagicCircle("#circle1", 2);
var magic2 = new MagicCircle("#circle2", 2);


magic.cast()
    .ring(10)
    .text(7, lol.hipster())
    .ring(5)
    .ring(5)
    .ring(5)
    .text(15, lol.hipster(),10, true)
    .ring(5)
    .ring(5)
    .space(10)
    .ring()
    .space(5)
    .ring()
    .circleRing(10,5,10,true)
    .ring()
    .text(15, lol.hipster(),10, true)
    .ring()
    .circleRing(10,5,10)
    .ring()
    .space(2)
    .circleRing(3,21,10)
    .space(2)
    .ring()
    .backspace(10)
    .text(10, lol.hipster(),10, false)
    .backspace(30)
    .ring(5)
    .ring(5)
    .ring(5)
