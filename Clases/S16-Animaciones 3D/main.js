const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 }
];

const width = 700;
const height = 500;
const margin = { top:10, left:50, bottom: 40, right: 10};
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top -margin.bottom;

const canvas = d3.select("#canvas");
const svg = canvas.append("svg");
svg.attr("width", width);
svg.attr("height", height);

let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

let y;
let x;
let bars;

graficarIndice("index2005");

function graficarIndice(indice)
{
    y = d3.scaleLinear() 
        .range([iheight, 0])
        .domain([0, 50]);

    x = d3.scaleBand()
    .domain(data.map(d => d.name) ) 
    .range([0, iwidth])
    .padding(0.3); 

    bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
    .attr("class", "bar")
    .style("fill", "cornflowerblue")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d[indice]))
    .attr("height", d => iheight - y(d[indice]))
    .attr("width", x.bandwidth())  

    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  

    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));
}

d3.select("#indice2005").on("click", function () {
    bars = g.selectAll("rect")
        .data(data)
        .transition()
        .duration(2000)
        .style("fill", "cornflowerblue")
        .attr("y", d => y(d["index2005"]))
        .attr("height", d => iheight - y(d["index2005"]))
        
});

d3.select("#indice2006").on("click", function () {
    bars = g.selectAll("rect")
        .data(data)
        .transition()
        .duration(2000)
        .style("fill", "#9b9fea")
        .attr("y", d => y(d["index2006"]))
        .attr("height", d => iheight - y(d["index2006"]))
        
});