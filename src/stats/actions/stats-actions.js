import {makeActionCreator} from '../../common/actions/utils';
import {store} from '../../store/store-init';
import {runTest} from '../test-runner/test-runner';
import {getResultForScale} from '../test-runner/result-calculator';

export const runTests = () => {
	return dispatch => {
		const {scales, stats, experimentalDesign, fileProcessing} = store.getState();
		const {data} = fileProcessing;
		const {tests} = experimentalDesign;

		dispatch(notifyTestsRunning(tests.map(test => {
			return {
				name: test.name,
				type: test.type
			};
		})));
		//TODO first calculate scale results, handle missing data, then get descriptives then run tests
		for (let i = 0; i < tests.length; i++) {
			setTimeout(() => {
				const test = tests[i];
				const scaleObjects = [];
				for (let i = 0; i < test.scales.length; i++) {
					const scale = scales.scales[test.scales[i]];
					scaleObjects.push(Object.assign({}, scale));
				}

				for (let i = 0; i < scaleObjects.length; i++) {
					const scale = scaleObjects[i];
					scale.result = getResultForScale(scale, data);
				}

				const testCopy = Object.assign({}, test);
				testCopy.scales = scaleObjects;

				const results = runTest(testCopy);
				dispatch(notifyTestResults(test.name, results));
			}, i * 50);
		}
	};
};

// fired when a number of tests to run is announced (for progress bars)
export const NOTIFY_TESTS_RUNNING = 'NOTIFY_TESTS_RUNNING';
export const notifyTestsRunning = makeActionCreator(NOTIFY_TESTS_RUNNING, 'tests');

export const NOTIFY_TEST_RESULTS = 'NOTIFY_TEST_RESULTS';
export const notifyTestResults = makeActionCreator(NOTIFY_TEST_RESULTS, 'name', 'results');