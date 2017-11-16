import React from 'react';
import ScatterPlot from 'components/ScatterPlot';
import LineGraph from 'components/LineGraph';
import { style } from 'd3-selection';

const styles = {
  width: 1200,
  height: 500,
  padding: 30
};

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: styles.width,
      height: styles.height
    };
  }

  render() {
    return (
      <div>
        <LineGraph {...this.state} {...styles}/>
      </div>
    );
  }
}