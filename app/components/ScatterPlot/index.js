import React from 'react';
import * as d3 from 'd3'
import DataCircles from 'components/DataCircles';

// console.log(d3); Returns the largest X coordinate from the data set
const xMax = (data) => d3.max(data, (d) => d[0]);

// Returns the higest Y coordinate from the data set
const yMax = (data) => d3.max(data, (d) => d[1]);

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
  return d3
    .scaleLinear()
    .domain([
      0,
      xMax(props.data)
    ])
    .range([
      props.padding, props.width - props.padding * 2
    ]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  return d3
    .scaleLinear()
    .domain([
      0,
      yMax(props.data)
    ])
    .range([
      props.height - props.padding,
      props.padding
    ]);
};

export default class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scales: {
        xScale: xScale(props),
        yScale: yScale(props)
      },
      width: 0,
      height: 0,
      x: {},
      y: {},
      brush: {},
      dot: {}
    }
  }

  componentDidMount() {
    this.draw()
  }

  shouldComponentUpdate() {
    return false;
  }

  brushcentered() {
    var dx = this.state.x(1) - this.state.x(0), // Use a fixed width when recentering.
        cx = d3.mouse(this)[0],
        x0 = cx - dx / 2,
        x1 = cx + dx / 2;
    d3.select(this.parentNode).call(this.state.brush.move, x1 > this.state.width ? [this.state.width - dx, this.state.width] : x0 < 0 ? [0, dx] : [x0, x1]);
  }
  
  brushed() {
    const that = this;
    var extent = d3.event.selection.map((that.state.x).invert, that.state.x);
    this.state.dot.classed("selected", function(d) { return extent[0] <= d[0] && d[0] <= extent[1]; });
  }

  draw() {
    var randomX = d3.randomUniform(0, 10),
      randomY = d3.randomNormal(0.5, 0.12),
      data = d3
        .range(800)
        .map(function () {
          return [randomX(), randomY()];
        });

    var svg = d3.select("svg"),
      margin = {
        top: 0,
        right: 0,
        bottom: 30,
        left: 0
      },
      g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    this.state.width = +svg.attr("width") - margin.left - margin.right;
    this.state.height = +svg.attr("height") - margin.top - margin.bottom;

    this.state.x = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, this.state.width]);

    this.state.y = d3
      .scaleLinear()
      .range([this.state.height, 0]);

    this.state.brush = d3
      .brushX()
      .extent([
        [
          0, 0
        ],
        [this.state.width, this.state.height]
      ])
      .on("start brush", this.brushed);

    const that = this;
    this.state.dot = g
      .append("g")
      .attr("fill-opacity", 0.2)
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("transform", function (d) {
        return "translate(" + that.state.x(d[0]) + "," + that.state.y(d[1]) + ")";
      })
      .attr("r", 3.5);

    g
      .append("g")
      .call(this.state.brush)
      .call(this.state.brush.move, [3, 5].map(this.state.x))
      .selectAll(".overlay")
      .each(function (d) {
        d.type = "selection";
      }) // Treat overlay interaction as move.
      .on("mousedown touchstart", this.brushcentered); // Recenter before brushing.

    g
      .append("g")
      .attr("transform", "translate(0," + this.state.height + ")")
      .call(d3.axisBottom(this.state.x));
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        
      </svg>
    );
  }
};