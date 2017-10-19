import {rootSelector} from '../common/selectors/selectors-utils';

const experimentalDesignRoot = rootSelector('experimentalDesign');

/**
 * Given the root state of the application, returns an array containing all tests
 * @param testsRoot
 * @returns {Array}
 */
const getTests = testsRoot => testsRoot.tests;

const getTestById = (state, testId) => {
  return getTests(state).find(test => getTestId(test) === testId);
};

const getTestIndexById = (state, testId) => {
  return getTests(state).findIndex(test => getTestId(test) === testId);
};

const getSelectedTest = state => {
  const selectedTestId = getSelectedTestId(state);
  return getTestById(state, selectedTestId);
};

const isSelectingScales = state => state.selectingScales;
const getSelectedTestId = state => state.selectedTest;

const getTestScales = test => test.scales;
const getTestId = test => test.testId;
const getTestType = test => test.type;
const getTestName = test => test.name;

export default {
  experimentalDesignRoot,
  getTests,
  getTestById,
  getTestIndexById,
  getSelectedTest,
  isSelectingScales,
  getSelectedTestId,
  getTestId,
  getTestName,
  getTestType,
  getTestScales
};