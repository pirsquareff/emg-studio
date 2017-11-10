import React from 'react';
import * as d3 from 'd3'

export default class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.draw()
  }

  shouldComponentUpdate() {
    return false;
  }

  draw() {
    const node = this.node;
    // Set the dimensions and margins of the graph
    var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 70
      },
      width = this.props.width - margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom;

    // Set the ranges
    var x = d3
      .scaleLinear()
      .range([0, width]);
      
    var y = d3
      .scaleLinear()
      .range([height, 0]);

    // Define the line
    var valueline = d3
      .line()
      .x(function (d) {
        return x(d.index);
      })
      .y(function (d) {
        return y(d.value);
      });

    var svg = d3
      .select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("Tong-t1 (1024Hz).csv", function (error, data) {
      if (error) 
        throw error;

      // Format the data
      data.forEach(function (d, i) {
        d.index = i;
        d.value = +d["24"];
      });

      const extentY = d3.extent(data.map(function (d) {
        return d.value;
      }));

      let maxPosExtent = extentY[1];
      
      if (Math.abs(extentY[0]) > Math.abs(extentY[1])) {
        maxPosExtent = Math.abs(extentY[0])
      } else {
        maxPosExtent = Math.abs(extentY[1])
      }
      maxPosExtent += 100;

      // Scale the range of the data
      x.domain(d3.extent(data, function (d) {
        return d.index;
      }));

      y.domain([-maxPosExtent,
        maxPosExtent
      ]);

      // Add the valueline path.
      svg
        .append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the x Axis
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the y Axis
      svg
        .append("g")
        .call(d3.axisLeft(y));

      // Text label for the y axis
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");

    });
  }

  render() {
    return (
      <svg
        ref={node => this.node = node}
        width={this.props.width}
        height={this.props.height}></svg>
    );
  }
};