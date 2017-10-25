import {runTest} from './test-runner/test-runner';
import {getScoresForScale} from './test-runner/scores-calculator';
import {copy} from '../common/utils';
import {getDescriptives} from './test-runner/descriptive-statistics';
import scalesOperations from '../scales/operations';
import scalesSelectors from '../scales/selectors';
import dataLoaderSelectors from '../data-loader/selectors';
import experimentalDesignSelectors from '../experimental-design/selectors';
import actions from './actions';

const runTests = () => {
  return (dispatch, getState) => {
    const state = getState();
    const scalesRoot = scalesSelectors.scaleRootSelector(state);
    const experimentalDesignRoot = experimentalDesignSelectors.experimentalDesignRoot(state);
    const tests = experimentalDesignSelectors.getTests(experimentalDesignRoot);
    const scales = scalesSelectors.getScales(scalesRoot);
    const data = dataLoaderSelectors.getData(dataLoaderSelectors.dataLoaderRootSelector(state));

    dispatch(actions.notifyTestsRunning(tests.map(({name, type}) => ({name, type}))));

    const scaleScores = {};
    scales.forEach(scale => {
      const scores = getScoresForScale(scale, data);
      scaleScores[scalesSelectors.getScaleId(scale)] = scores;
      dispatch(scalesOperations.setScaleScores(scalesSelectors.getScaleId(scale), scores));
    });

    for (let i = 0; i < tests.length; i++) {
      setTimeout(() => {
        const test = tests[i];
        const scalesForTest = [];
        for (let j = 0; j < test.scales.length; j++) {
          const scaleId = experimentalDesignSelectors.getTestScales(test)[j];
          const scale = copy(scalesSelectors.getScaleById(scalesSelectors.scaleRootSelector(state), scaleId));
          scale.scores = [...scaleScores[scalesSelectors.getScaleId(scale)]];
          scalesForTest.push(scale);
        }

        const testCopy = copy(test);
        testCopy.scales = scalesForTest;

        const results = runTest(testCopy);
        dispatch(actions.notifyTestResults(test.name, results));
      }, i * 125);
    }

    dispatch(actions.notifyDescriptivesRunning(scales.map(({name, scaleId, measurementLevel}) => ({
      name,
      scaleId,
      measurementLevel
    }))));
    for (let i = 0; i < scales.length; i++) {
      setTimeout(() => {
        const scale = copy(scales[i]);
        scale.scores = scaleScores[scalesSelectors.getScaleId(scale)];
        const descriptives = getDescriptives(scale);
        dispatch(actions.notifyDescriptivesResults(scalesSelectors.getScaleId(scale), descriptives));
      }, (tests.length + i) * 125);
    }
  };
};

export default {
  runTests
}