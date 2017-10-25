import React from 'react';
import Chart from 'chart.js';

export class BarChartComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = this.refs.chart;
    const preparedData = this._prepareData();

    const barChart = new Chart(canvas, {
      type: 'bar',
      data: preparedData
    });
  }

  _prepareData = () => {
    const {
      data
    } = this.props;

    return {
      labels: data,
      datasets: [{
        label: 'scale name',
        data: data
      }]
    };
  };

  render() {
    return (
      <canvas ref="chart">

      </canvas>
    );
  }

}