import {makeActionCreator} from '../../common/actions/utils';
import {CHART_TYPES, LINE_CHART} from '../constants/chart-types';

export const showChart = (chartType, data) => {
  return (dispatch, getState) => {
    if (isValidChartType(chartType) && isDataValid(chartType, data)) {
      dispatch(_showChart(chartType, data));
    }
  };
};

const isValidChartType = chartType => {
  return CHART_TYPES.findIndex(type => type === chartType);
};

const isDataValid = (chartType, data) => {
  if (chartType === LINE_CHART) {
    const isNumbers = isArrayOfNumbers(data);
    if (!isNumbers) {
      console.warn('Trying to display a line chart with non-numeric data');
      return false;
    }
  }
  return true;
};

//TODO extract this to utils?
const isArrayOfNumbers = data => {
  if (!(data instanceof Array)) {
    return false;
  }
  const nonNumbers = data.filter(element => {
    const number = parseFloat(element);
    return Number.isNaN(number);
  });
  return nonNumbers.length > 0;
};

export const showChartForScale = scaleId => {
  return (dispatch, getState) => {

    //to get data for chart here, scales need to have results saved
    const scales = getState().scales.scales;
    const scale = getScaleById(scales, scaleId);
    dispatch(showChart(scale));
  };
};

export const SHOW_CHART = 'SHOW_CHART';
const _showChart = makeActionCreator(SHOW_CHART, 'chartType', 'data');

export const HIDE_CHART = 'HIDE_CHART';