import {createNewTest} from './model/test';
import {TEST_TYPES} from './model/test-constants';
import actions from './actions';
import selectors from './selectors';

const getRoot = getState => selectors.experimentalDesignRoot(getState());

const createTest = testId => {
  return (dispatch, getState) => {
    checkTestIdAlreadyExists(testId, getRoot(getState));
    dispatch(actions.addTest(createNewTest(testId)));
  };
};

const checkTestIdAlreadyExists = (testId, state) => {
  if (!testId) return;
  const test = selectors.getTestById(state, testId);
  if (test) {
    throw new Error(`Test with id ${testId} already exists!`);
  }
};

const setTestName = (testId, testName) => {
  return (dispatch, getState) => {
    validateTestWithIdExists(testId, getRoot(getState));
    if (isTestNameValid(testName)) {
      dispatch(actions.setTestName(testId, testName));
    }
  };
};

const validateTestWithIdExists = (testId, state) => {
  const test = selectors.getTestById(state, testId);
  if (!test) throw Error(`Test with id ${testId} does not exist!`);
  return test;
};

const isTestNameValid = testName => {
  return testName && testName.trim();
};

const setTestType = (testId, testType) => {
  return (dispatch, getState) => {
    if (!isTestTypeValid(testType)) {
      throw new Error(`${testType} is not a valid test type.`);
    }
    validateTestWithIdExists(testId, getRoot(getState));
    dispatch(actions.setTestType(testId, testType));
  };
};

const isTestTypeValid = testType => {
  return TEST_TYPES.findIndex(type => type === testType) > -1;
};

const removeTest = (testId) => {
  return (dispatch, getState) => {
    validateTestWithIdExists(testId, getRoot(getState));
    dispatch(actions.selectTest(null));
    dispatch(actions.removeTest(testId));
  };
};

const toggleScale = (testId, scaleId) => {
  return (dispatch, getState) => {
    if (!selectors.isSelectingScales(getRoot(getState))) {
      return;
    }
    const test = validateTestWithIdExists(testId, getRoot(getState));
    const selectedScales = _toggleScale(scaleId, selectors.getTestScales(test));
    dispatch(actions.selectScales(testId, selectedScales));
  };
};

const _toggleScale = (scaleId, selectedScales) => {
  const index = selectedScales.findIndex((item) => {
    return item === scaleId;
  });

  const nextSelectedScales = [...selectedScales];
  if (index === -1) {
    nextSelectedScales.push(scaleId);
  } else {
    nextSelectedScales.splice(index, 1);
  }

  return nextSelectedScales;
};

const selectTest = testId => actions.selectTest(testId);
const startSelectingScales = () => actions.startSelectingScales();

export default {
  createTest,
  setTestName,
  setTestType,
  removeTest,
  toggleScale,
  selectTest,
  startSelectingScales
};

