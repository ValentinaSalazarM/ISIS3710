const canvas = d3.select("#canvas");

d3.json("https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json").then(newData => {
    R1_Grafica(newData);
});

d3.json("https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json").then(newData => {
    console.log(newData)
    R2_Grafica(newData);
});

function R1_Grafica(data) {
    const width = 800;
    const height = 600;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .range([0, iwidth])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    const y = d3.scaleBand()
        .range([0, iheight])
        .domain(data.map(function (d) { return d.name; }))
        .padding(.3);

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "cornflowerblue")
        .attr("x", d => x(0))
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth())

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
}

function R2_Grafica(data) {
    const width = 800;
    const height = 600;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .range([0, iwidth])
        .domain([0, d3.max(data, function (d) {
            return parseFloat(d.purchasingpower);
        }) + 5000]);

    const y = d3.scaleLinear()
        .range([iheight, 0])
        .domain([0, d3.max(data, function (d) {
            return parseFloat(d.lifeexpectancy);
        }) + 20]);

    let maxPopulation = d3.max(data, function (d) {
        return d.population;
    })

    const circles = g.selectAll("circle").data(data);
    const colors = []

    circles.enter().append("circle")
        .style("fill", "#a190e5")
        .attr("cx", d => x(d.purchasingpower))
        .attr("cy", d => y(d.lifeexpectancy))
        .attr("r", d => (parseFloat(d.population) / maxPopulation) * 20)

    circles.enter().append("text")
        .attr("dx", d => x(d.purchasingpower - d.population * 0.000008))
        .attr("dy", d => y(d.lifeexpectancy - 1))
        .attr('stroke', '#564b7c')
        .text(d => d.country)

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));

}