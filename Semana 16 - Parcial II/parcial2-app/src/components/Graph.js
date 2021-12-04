import React, { useEffect } from "react";
import * as d3 from "d3";

function Graph(props) {
  useEffect(() => {
    pieChart(props.rooms);
  }, [props.rooms]);

  function pieChart(data) {
    d3.select("#canvas").select("svg").remove();

    const width = 450;
    const height = 450;

    const canvas = d3.select("#canvas");

    const svg = canvas
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([0, data.length]);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(200);
    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.powerUsage.value);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    const tooldiv = canvas
      .append("div")
      .style("visibility", "visible")
      .style("position", "absolute")
      .style("background-color", "black");

    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 4)
      .append("title")
      .text(
        (d) =>
          `${d.data.name}: ${d.data.powerUsage.value}  ${d.data.powerUsage.unit}`
      );
    /* .on("mouseover", (e, d) => {
        tooldiv
          .style("visiblity", "visible")
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 50 + "px")
          .text(
            `${d.data.name}: ${d.data.powerUsage.value}  ${d.data.powerUsage.unit}`
          );
      })
      .on("mousemove", (e, d) => {
        tooldiv
          .style("visiblity", "visible")
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 50 + "px");
      })
      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      }); */
  }

  return <div id="canvas"> </div>;
}
export default Graph;
