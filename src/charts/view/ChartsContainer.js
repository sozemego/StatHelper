import React from 'react';
import {connect} from 'react-redux';
import {Dialog} from 'material-ui';
import chartsOperations from '../operations';
import chartSelectors from '../selectors';
import {BAR_CHART, HISTOGRAM_CHART, LINE_CHART} from '../constants';
import {LineChartComponent} from './LineChartComponent';
import {BarChartComponent} from './BarChartComponent';
import {HistogramChartComponent} from './HistogramChartComponent';

const chartComponents = {
  [LINE_CHART]: LineChartComponent,
  [BAR_CHART]: BarChartComponent,
  [HISTOGRAM_CHART]: HistogramChartComponent
};

export class ChartsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  _getChartComponent = () => {
    const {
      chartType,
      data
    } = this.props;
    const component = chartComponents[chartType];
    if (component) {
      return React.createElement(component, {data}, null);
    }
    return null;
  };

  render() {
    const {
      show,
      hideChart
    } = this.props;

    return (
      <Dialog
        open={show}
        onRequestClose={() => hideChart()}
      >
        {this._getChartComponent()}
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  const chartRoot = chartSelectors.chartRootSelector(state);
  return {
    show: chartSelectors.showChart(chartRoot),
    chartType: chartSelectors.getChartType(chartRoot),
    data: chartSelectors.getData(chartRoot)
  };
};

const dispatchToProps = dispatch => {
  return {
    hideChart: () => dispatch(chartsOperations.hideChart())
  };
};

export default connect(mapStateToProps, dispatchToProps)(ChartsContainer);