import React from 'react';
import Chart from 'chart.js';

export class LineChartComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      data
    } = this.props;

    const canvas = this.refs.chart;

    const myLineChart = new Chart(canvas, {
      type: 'line',
      data
    });
  }

  render() {
    return (
      <canvas ref="chart">

      </canvas>
    );
  }

}