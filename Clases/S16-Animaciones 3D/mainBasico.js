const svg = d3.select("#canvas").append("svg")
    .attr("width", 400)
    .attr("height", 200)
    .style("border-color", "black")
    .style("border-style", "solid")
    .style("border-width", "1px");

const rectangle = svg.append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 50)
    .attr("height", 50)
    .attr("opacity", 1);

d3.select("#start").on("click", function () {
    rectangle
        .transition()
        .attr("x", 250)
        .attr("width", 100) 
	    .attr("height", 100)
        .attr("opacity",0.5)
        .delay(1000)
        .duration(5000)
        .ease(d3.easeBounce)
        .on("end",function() { 
		    d3.select(this)
		    	.transition() 
                .attr("x", 150) 
                .attr("width", 75) 
                .attr("height", 75) 
                .attr("opacity", 0.75) 
                .attr("fill", "blue") 
                .delay(500)  
                .duration(2500) 
                .ease(d3.easeBounce); 
		});
});

d3.select("#reset").on("click", function () {
    rectangle.transition()
    .attr("x", 50)
    .attr("width", 50) 
    .attr("height", 50)
    .attr("opacity",1);
});