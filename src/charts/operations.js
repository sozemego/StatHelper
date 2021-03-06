import {quantile} from 'simple-statistics';
import {BAR_CHART, CHART_TYPES, HISTOGRAM_CHART, LINE_CHART} from './constants';
import actions from './actions';
import {getSet} from '../stats/test-runner/statistics';
import {createFrequencyCount} from '../stats/test-runner/descriptive-statistics';

const showChart = (chartType, data) => {
  return (dispatch, getState) => {
    if (isValidChartType(chartType) && isDataValid(chartType, data)) {
      const transformedData = transformData(chartType, data);
      dispatch(actions.showChart(chartType, transformedData));
    }
  };
};

const isValidChartType = chartType => {
  return CHART_TYPES.findIndex(type => type === chartType) > -1;
};

const isDataValid = (chartType, data) => {
  if (chartType === LINE_CHART) {
    const isNumbers = isArrayOfNumbers(data);
    if (!isNumbers) {
      console.warn('Trying to display a line chart with non-numeric data');
      return false;
    }
  }
  if (chartType === BAR_CHART) {
    const isNumbers = isArrayOfNumbers(data);
    if (!isNumbers) {
      console.warn('Trying to display a bar chart with non-numeric data');
      return false;
    }
  }
  if (chartType === HISTOGRAM_CHART) {
    const isNumbers = isArrayOfNumbers(data);
    if (!isNumbers) {
      console.warn('Trying to display a histogram chart with non-numeric data');
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
  return nonNumbers.length === 0;
};

/**
 * Transforms data based on chart type.
 * @param chartType
 * @param data
 */
const transformData = (chartType, data) => {
  const dataTransformer = dataTransformers[chartType];
  if (!dataTransformer) {
    throw new Error(`Data transformer does not exist for ${chartType}.`);
  }
  return dataTransformer(data);
};

const barChartDataTransformer = data => {

};


const histogramDataTransformer = maxGroups => data => {
  // 1. assume data is numeric, because it was checked before

  // 2. check how many unique data points we have
  const uniqueDataPointsLength = getSet(data).length;

  // 3. if we have less unique data points than maxGroups, count frequencies for each number and return
  // frequencies for the data, containg values and counts for those values
  if (uniqueDataPointsLength <= maxGroups) {
    const frequencyData = createFrequencyCount(data);
    frequencyData.sort((a, b) => a.value - b.value);
    return frequencyData;
  }

  // 4. if we have more unique data points than maxGroups, group data into maxGroups groups
  // that is, quantile 0.0, 0.1, 0.2, 0.3 and so on
  // for each quantile, find the average and this will be the labels array
  // for each quantile, find the frequencies (counts) of values falling in that quantile
  const quantiles = getEqualIntervalQuantiles(maxGroups).map(quantileValue => quantile(data, quantileValue));

  // find intervals between found quantiles
  const intervals = [];
  for (let i = 0; i < quantiles.length - 1; i++) {
    intervals.push({from: quantiles[i], to: quantiles[i + 1]});
  }

  const groupedData = [];
  intervals.forEach(interval => { //TODO refactor to reduce?
    const validValues = data.filter(datum => datum >= interval.from && datum < interval.to);
    const intervalAverage = (interval.from + interval.to) / 2;
    validValues.forEach(value => groupedData.push(intervalAverage));
  });

  const frequencyData = createFrequencyCount(groupedData);
  frequencyData.sort((a, b) => a.value - b.value);
  return frequencyData;
};

const getEqualIntervalQuantiles = numberOfQuantiles => {
  if (numberOfQuantiles <= 0) {
    throw new Error('Number of quantiles cannot be equal or less than 0.');
  }

  if (numberOfQuantiles === 1) {
    return [1];
  }

  const interval = 1 / numberOfQuantiles;
  const quantiles = [];
  for (let i = 0; i < numberOfQuantiles; i++) {
    quantiles.push(Number((interval * i).toFixed(2)));
  }
  quantiles.push(1);

  return quantiles;
};

const histogramMaxBars = 20;

const dataTransformers = {
  [HISTOGRAM_CHART]: histogramDataTransformer(histogramMaxBars)
};

const hideChart = () => actions.hideChart();

export default {
  showChart,
  hideChart
};