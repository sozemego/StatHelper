import {createNewTest} from '../model/test';
import {sortAsc} from '../../common/utils';
import {makeActionCreator} from '../../common/actions/utils';
import {TEST_TYPES} from '../model/test-constants';

export const ADD_TEST = 'ADD_TEST';
const addTest = makeActionCreator(ADD_TEST, 'test');

export const createTest = () => {
  return (dispatch, getState) => {
    dispatch(addTest(createNewTest()));
    const allTests = getState().experimentalDesign.tests;
    dispatch(selectTest(allTests.length - 1));
  };
};

export const SELECT_TEST = 'SELECT_TEST';
export const selectTest = makeActionCreator(SELECT_TEST, 'testIndex');

export const setTestName = (testIndex, testName) => {
  return (dispatch, getState) => {
    if (isTestNameValid(testName)) {
      const tests = getState().experimentalDesign.tests;
      const test = tests[testIndex];
      test.name = testName;
      dispatch(setTests([].concat(tests))); //TODO perhaps refactor this so that a new name is sent and that's it?
    }
  };
};

const isTestNameValid = testName => {
  return testName || testName.trim();
};

export const SET_TESTS = 'SET_TESTS';
export const setTests = makeActionCreator(SET_TESTS, 'tests');

export const setTestType = (testIndex, testType) => {
  return (dispatch, getState) => {
    if (isTestTypeValid(testType)) {
      const tests = getState().experimentalDesign.tests;
      const test = tests[testIndex];
      test.type = testType;
      dispatch(setTests([].concat(tests)));  //TODO perhaps refactor this so that a new test type is sent?
    }
  };
};

const isTestTypeValid = testType => {
  return TEST_TYPES.findIndex(type => type === testType) > -1;
};

export const removeTest = (testIndex) => {
  return (dispatch, getState) => {
    dispatch(selectTest(-1));
    const tests = getState().experimentalDesign.tests.slice();
    tests.splice(testIndex, 1);
    dispatch(setTests(tests));   //TODO perhaps refactor this so that a test to remove is sent?
  };
};

export const START_SELECTING_SCALES = 'START_SELECTING_SCALES';
export const startSelectingScales = makeActionCreator(START_SELECTING_SCALES);

export const toggleScale = scaleIndex => {
  return (dispatch, getState) => {
    const experimentalDesign = getState().experimentalDesign;
    if (experimentalDesign.selectingItems && experimentalDesign.selectedTest > -1) {
      const selectedTestIndex = experimentalDesign.selectedTest;
      const selectedTest = experimentalDesign.tests[selectedTestIndex];
      const selectedScales = _toggleScale(scaleIndex, selectedTest.scales);
      dispatch(selectScales(selectedTestIndex, sortAsc(selectedScales)));
    }
  };
};

const _toggleScale = (scaleIndex, selectedScales) => {
  const index = selectedScales.findIndex((item) => {
    return item === scaleIndex;
  });

  const nextSelectedScales = selectedScales.slice();
  if (index === -1) {
    nextSelectedScales.push(scaleIndex);
  } else {
    nextSelectedScales.splice(index, 1);
  }

  return nextSelectedScales;
};

export const SELECT_SCALES = 'SELECT_SCALES';
const selectScales = makeActionCreator(SELECT_SCALES, 'testIndex', 'selectedScales');