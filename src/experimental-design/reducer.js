import types from './types';
import selectors from './selectors';
import {MOUSE_UP} from '../common/actions/common-actions';

const initialState = {
  tests: [],
  selectingScales: false,
  selectedTest: null
};

const experimentalDesign = (state = initialState, action) => {
  switch (action.type) {
    case types.START_SELECTING_SCALES:
      return {...state, selectingScales: true};
    case MOUSE_UP:
      return {...state, selectingScales: false};
    case types.SELECT_SCALES:
      return {...state, tests: selectScales(state, action.scaleId, action.selectedScales)};
    case types.ADD_TEST:
      return {...state, tests: [...state.tests, action.test]};
    case types.SELECT_TEST:
      return {...state, selectedTest: action.testId};
    case types.SET_TEST_NAME:
      return {...state, tests: setTestName(state, action.testId, action.testName)};
    case types.REMOVE_TEST:
      return {...state, tests: removeTest(state, action.testId)};
    default:
      return state;
  }
};

const selectScales = (state, testId, selectedScales) => {
  const testIndex = selectors.getTestIndexById(state, testId);
  const tests = [...selectors.getTests(state)];
  tests[testIndex] = {...tests[testIndex], scales: selectedScales};
  return tests;
};

const setTestName = (state, testId, name) => {
  const test = selectors.getTestById(state, testId);
  const testIndex = selectors.getTestIndexById(state, testId);
  const tests = [...selectors.getTests(state)];
  tests[testIndex] = {...test, name};
  return tests;
};

const removeTest = (state, testId) => {
  const testIndex = selectors.getTestIndexById(state, testId);
  if (testIndex === -1) {
    return selectors.getTests(state);
  }
  const tests = [...selectors.getTests(state)];
  tests.splice(testIndex, 1);
  return tests;
};

export default experimentalDesign;