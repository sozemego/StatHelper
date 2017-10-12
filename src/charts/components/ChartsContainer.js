import React from 'react';
import {connect} from 'react-redux';
import {Dialog} from 'material-ui';
import {hideChart} from '../actions/actions';
import {BAR_CHART, LINE_CHART} from '../constants/chart-types';
import {LineChartComponent} from './LineChartComponent';
import {BarChartComponent} from './BarChartComponent';

const chartComponents = {
  [LINE_CHART]: LineChartComponent,
  [BAR_CHART]: BarChartComponent
};

export class ChartsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  _getChartComponent = (chartType, data) => {
    const component = chartComponents[chartType];
    if (component) {
      return React.createElement(component, {data}, null);
    }
    return null;
  };

  render() {
    const {
      show,
      chartType,
      data,
      hideChart
    } = this.props;

    return (
      <Dialog
        open={show}
        onRequestClose={() => hideChart()}
      >
        {this._getChartComponent(chartType, data)}
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  const {chart} = state;
  return {
    show: chart.show,
    chartType: chart.chartType,
    data: chart.data
  };
};

const dispatchToProps = dispatch => {
  return {
    hideChart: () => dispatch(hideChart())
  };
};

export default connect(mapStateToProps, dispatchToProps)(ChartsContainer);