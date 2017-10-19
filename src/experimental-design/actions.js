import {makeActionCreator} from '../common/actions/utils';
import types from './types';

const addTest = makeActionCreator(types.ADD_TEST, 'test');
const selectTest = makeActionCreator(types.SELECT_TEST, 'testId');
const startSelectingScales = makeActionCreator(types.START_SELECTING_SCALES);
const selectScales = makeActionCreator(types.SELECT_SCALES, 'scaleId', 'selectedScales');
const setTestName = makeActionCreator(types.SET_TEST_NAME, 'testId', 'testName');
const removeTest = makeActionCreator(types.REMOVE_TEST, 'testId');
const setTestType = makeActionCreator(types.SET_TEST_TYPE, 'testId', 'testType');

export default {
  addTest,
  selectTest,
  startSelectingScales,
  selectScales,
  setTestName,
  removeTest,
  setTestType
};