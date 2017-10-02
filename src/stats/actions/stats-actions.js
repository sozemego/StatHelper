import {makeActionCreator} from '../../common/actions/utils';
import {store} from '../../store/store-init';
import {runTest} from '../test-runner/test-runner';

export const RUN_TESTS = 'RUN_TESTS';
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

/**
 * Computes scores for a scale.
 * @param scale
 * @param data
 * @returns {Array}
 */
const getResultForScale = (scale, data) => {
	const {items} = scale;
	// for each item, get actual values for each row
	const itemValues = items.map(itemIndex => {
		const values = [];
		for (let i = 1; i < data.length; i++) {
			const value = data[i][itemIndex];
			values.push(value);
		}
		return values;
	});

	// for each row, sum the values together. That is the result of the scale
	const results = [];
	for (let i = 0; i < data.length - 1; i++) {
		let sum = 0;
		for (let j = 0; j < itemValues.length; j++) {
			sum += parseInt(itemValues[j][i]);
		}
		results.push(sum);
	}
	return results;
};

// fired when a number of tests to run is announced (for progress bars)
export const NOTIFY_TESTS_RUNNING = 'NOTIFY_TESTS_RUNNING';
export const notifyTestsRunning = makeActionCreator(NOTIFY_TESTS_RUNNING, 'tests');

export const NOTIFY_TEST_RESULTS = 'NOTIFY_TEST_RESULTS';
export const notifyTestResults = makeActionCreator(NOTIFY_TEST_RESULTS, 'name', 'results');