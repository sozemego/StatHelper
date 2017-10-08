import {makeActionCreator} from '../../common/actions/utils';
import {store} from '../../store/store-init';
import {runTest} from '../test-runner/test-runner';
import {getResultForScale} from '../test-runner/result-calculator';
import {copy} from '../../common/utils';
import {getDescriptives} from '../test-runner/descriptive-statistics';

export const runTests = () => {
	return dispatch => {
		const {stats, experimentalDesign, fileProcessing} = store.getState();
		const scales = store.getState().scales.scales;
		const {data} = fileProcessing;
		const {tests} = experimentalDesign;

		dispatch(notifyTestsRunning(tests.map(({name, type}) => ({name, type}))));

		const scaleResults = {};
		for (const scale of scales) {
			scaleResults[scale.name] = getResultForScale(scale, data);
		}

		for (let i = 0; i < tests.length; i++) {
			setTimeout(() => {
				const test = tests[i];
				const scalesForTest = [];
				for (let j = 0; j < test.scales.length; j++) {
					const scale = copy(scales[test.scales[j]]);
					scale.result = scaleResults[scale.name];
					scalesForTest.push(scale);
				}

				const testCopy = copy(test);
				testCopy.scales = scalesForTest;

				const results = runTest(testCopy);
				dispatch(notifyTestResults(test.name, results));
			}, i * 125);
		}

		dispatch(notifyDescriptivesRunning(scales.map(({name, measurementLevel}) => ({name, measurementLevel}))));
		for (let i = 0; i < scales.length; i++) {
			setTimeout(() => {
				const scale = copy(scales[i]);
				scale.result = scaleResults[scale.name];
				const descriptives = getDescriptives(scale);
				dispatch(notifyDescriptivesResults(scale.name, descriptives));
			}, (tests.length + i) * 125);
		}
	};
};

// fired when a number of tests to run is announced (for progress bars)
export const NOTIFY_TESTS_RUNNING = 'NOTIFY_TESTS_RUNNING';
export const notifyTestsRunning = makeActionCreator(NOTIFY_TESTS_RUNNING, 'tests');

export const NOTIFY_TEST_RESULTS = 'NOTIFY_TEST_RESULTS';
export const notifyTestResults = makeActionCreator(NOTIFY_TEST_RESULTS, 'name', 'results');

export const NOTIFY_DESCRIPTIVES_RUNNING = 'NOTIFY_DESCRIPTIVES_RUNNING';
export const notifyDescriptivesRunning = makeActionCreator(NOTIFY_DESCRIPTIVES_RUNNING, 'descriptives');

export const NOTIFY_DESCRIPTIVES_RESULTS = 'NOTIFY_DESCRIPTIVES_RESULTS';
export const notifyDescriptivesResults = makeActionCreator(NOTIFY_DESCRIPTIVES_RESULTS, 'name', 'results');