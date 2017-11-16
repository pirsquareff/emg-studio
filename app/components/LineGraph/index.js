import React from 'react';
import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';

export default class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.draw()
  }

  shouldComponentUpdate() {
    // return false;
  }

  draw() {
    const node = this.node;
    // Set the dimensions and margins of the graph
    var margin = {
        top: 20,
        right: 20,
        bottom: 110,
        left: 40
      },
      margin2 = {
        top: 430,
        right: 20,
        bottom: 30,
        left: 40
      },
      width = this.props.width - margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom,
      height2 = this.props.height - margin2.top - margin2.bottom;

    // Set the ranges
    var x = d3
      .scaleLinear()
      .range([0, width]);
    var x2 = d3
      .scaleLinear()
      .range([0, width]);

    var y = d3
      .scaleLinear()
      .range([height, 0]);
    var y2 = d3
      .scaleLinear()
      .range([height2, 0]);

    // Define the line
    var valueline = d3
      .line()
      .x(function (d) {
        return x(d.index);
      })
      .y(function (d) {
        return y(d.value);
      });

    var valueline2 = d3
      .line()
      .x(function (d) {
        return x2(d.index);
      })
      .y(function (d) {
        return y2(d.value);
      });

    // Brush
    var brush = d3
      .brushX()
      .extent([
        [
          0, 0
        ],
        [width, height2]
      ])
      .on("brush end", brushed);

    // Zoom
    var zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [
          0, 0
        ],
        [width, height]
      ])
      .extent([
        [
          0, 0
        ],
        [width, height]
      ])
      .on("zoom", zoomed);

    var svg = d3.select(node);

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    var focus = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    /*
    var svg = d3
      .select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    */

    // Get the data
    d3.csv("Tong-t1 (1024Hz) xs.csv", function (error, data) {
      if (error) 
        throw error;
      
      // Format the data
      data
        .forEach(function (d, i) {
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

      x2.domain(x.domain());
      y2.domain(y.domain());

      focus
        .append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      focus
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      focus
        .append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

      context
        .append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline2);

      context
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x2));

      context
        .append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());

      /*
      // Add the valueline path.
      svg
        .append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the x Axis
      svg
        .append("g")
        .attr("class", "x-axis")
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
      */

      svg
        .append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
    });

    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") 
        return; // ignore brush-by-zoom
      var s = d3.event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      focus
        .select(".line")
        .attr("d", valueline);
      focus
        .select(".axis--x")
        .call(d3.axisBottom(x));
      svg
        .select(".zoom")
        .call(zoom.transform, d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0));
    }

    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") 
        return; // ignore zoom-by-brush
      var t = d3.event.transform;
      x.domain(t.rescaleX(x2).domain());
      focus
        .select(".line")
        .attr("d", valueline);
      focus
        .select(".axis--x")
        .call(d3.axisBottom(x));
      context
        .select(".brush")
        .call(brush.move, x.range().map(t.invertX, t));
    }
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