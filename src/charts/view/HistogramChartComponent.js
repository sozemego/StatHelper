import React from 'react';
import Chart from 'chart.js';

export class HistogramChartComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = this.refs.chart;
    const preparedData = this._prepareData();

    const histogramChart = new Chart(canvas, {
      type: 'bar',
      data: preparedData
    });
  }

  _prepareData = () => {
    const {
      data
    } = this.props;

    return {
      labels: data.map(datum => datum.value),
      datasets: [{
        label: 'Frequency',
        backgroundColor: '#90CAF9',
        data: data.map(datum => datum.count)
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