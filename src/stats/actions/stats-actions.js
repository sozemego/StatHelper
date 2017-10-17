import {makeActionCreator} from '../../common/actions/utils';
import {runTest} from '../test-runner/test-runner';
import {getScoresForScale} from '../test-runner/scores-calculator';
import {copy} from '../../common/utils';
import {getDescriptives} from '../test-runner/descriptive-statistics';
import {setScaleScores} from '../../scales/actions/scales-actions';
import {getScaleId, getScales, scaleRootSelector} from '../../scales/selectors/scale-selectors';
import {dataLoaderRootSelector, getData} from '../../data-loader/selectors';

export const runTests = () => {
  return (dispatch, getState) => {
    const state = getState();
    const {experimentalDesign} = state;
    const scales = getScales(scaleRootSelector(state));
    const data = getData(dataLoaderRootSelector(state));
    const {tests} = experimentalDesign;

    dispatch(notifyTestsRunning(tests.map(({name, type}) => ({name, type}))));

    const scaleScores = {};
    scales.forEach(scale => {
      const scores = getScoresForScale(scale, data);
      scaleScores[getScaleId(scale)] = scores;
      dispatch(setScaleScores(getScaleId(scale), scores));
    });

    for (let i = 0; i < tests.length; i++) {
      setTimeout(() => {
        const test = tests[i];
        const scalesForTest = [];
        for (let j = 0; j < test.scales.length; j++) {
          const scale = copy(scales[test.scales[j]]);
          scale.scores = [...scaleScores[getScaleId(scale)]];
          scalesForTest.push(scale);
        }

        const testCopy = copy(test);
        testCopy.scales = scalesForTest;

        const results = runTest(testCopy);
        dispatch(notifyTestResults(test.name, results));
      }, i * 125);
    }

    dispatch(notifyDescriptivesRunning(scales.map(({name, scaleId, measurementLevel}) => ({
      name,
      scaleId,
      measurementLevel
    }))));
    for (let i = 0; i < scales.length; i++) {
      setTimeout(() => {
        const scale = copy(scales[i]);
        scale.scores = scaleScores[getScaleId(scale)];
        const descriptives = getDescriptives(scale);
        dispatch(notifyDescriptivesResults(getScaleId(scale), descriptives));
      }, (tests.length + i) * 125);
    }
  };
};

export const NOTIFY_TESTS_RUNNING = 'NOTIFY_TESTS_RUNNING';
export const notifyTestsRunning = makeActionCreator(NOTIFY_TESTS_RUNNING, 'tests');

export const NOTIFY_TEST_RESULTS = 'NOTIFY_TEST_RESULTS';
export const notifyTestResults = makeActionCreator(NOTIFY_TEST_RESULTS, 'name', 'results');

export const NOTIFY_DESCRIPTIVES_RUNNING = 'NOTIFY_DESCRIPTIVES_RUNNING';
export const notifyDescriptivesRunning = makeActionCreator(NOTIFY_DESCRIPTIVES_RUNNING, 'descriptives');

export const NOTIFY_DESCRIPTIVES_RESULTS = 'NOTIFY_DESCRIPTIVES_RESULTS';
export const notifyDescriptivesResults = makeActionCreator(NOTIFY_DESCRIPTIVES_RESULTS, 'scaleId', 'results');