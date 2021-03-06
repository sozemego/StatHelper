import types from './types';
import experimentalDesign from '../experimental-design/reducer';
import experimentalDesignSelector from '../experimental-design/selectors';

const initialState = {
  minSignificance: 0.05,
  results: [],
  testsRunning: false,
  runningTests: [],
  descriptives: []
};

const stats = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFY_TESTS_RUNNING:
      return {...state, runningTests: action.tests};
    case types.NOTIFY_TEST_RESULTS:
      return {...state, runningTests: assignResult(state.runningTests.slice(), action.name, action.results)};
    case types.NOTIFY_DESCRIPTIVES_RUNNING:
      return {...state, descriptives: action.descriptives};
    case types.NOTIFY_DESCRIPTIVES_RESULTS:
      return {...state, descriptives: assignDescriptive([...state.descriptives], action.scaleId, action.results)};
    default:
      return state;
  }
};

const assignResult = (runningTests, testName, results) => {
  const test = runningTests.find(test => experimentalDesignSelector.getTestName(test) === testName);
  test.results = results;
  return [...runningTests];
};

const assignDescriptive = (descriptives, scaleId, results) => {
  const descriptive = descriptives.find(descriptives => descriptives.scaleId === scaleId);
  descriptive.results = results;
  return [...descriptives];
};

export default stats;