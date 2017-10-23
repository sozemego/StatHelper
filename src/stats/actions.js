import {makeActionCreator} from '../common/actions/utils';
import types from './types';

const notifyTestsRunning = makeActionCreator(types.NOTIFY_TESTS_RUNNING, 'tests');
const notifyTestResults = makeActionCreator(types.NOTIFY_TEST_RESULTS, 'name', 'results');
const notifyDescriptivesRunning = makeActionCreator(types.NOTIFY_DESCRIPTIVES_RUNNING, 'descriptives');
const notifyDescriptivesResults = makeActionCreator(types.NOTIFY_DESCRIPTIVES_RESULTS, 'scaleId', 'results');

export default {
  notifyTestsRunning,
  notifyTestResults,
  notifyDescriptivesRunning,
  notifyDescriptivesResults
};