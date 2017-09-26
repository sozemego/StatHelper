import {makeActionCreator} from '../../common/actions/utils';
import {store} from '../../store/store-init';
import {runTest} from '../test-runner/test-runner';

export const RUN_TESTS = 'RUN_TESTS';
export const runTests = () => {
	return dispatch => {
		console.log(store.getState());
		const {scales, stats, experimentalDesign, fileProcessing} = store.getState();
		const {data} = fileProcessing;
		const {tests} = experimentalDesign;
		dispatch(notifyNumberTests(tests.length));

		for (let i = 0; i < tests.length; i++) {
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

			const result = runTest(testCopy);
			dispatch(notifyNumberTestsRemaining((tests.length - i) - 1));
		}
		dispatch(notifyTestsDone());
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
export const NOTIFY_NUMBER_TESTS = 'NOTIFY_NUMBER_TESTS';
export const notifyNumberTests = makeActionCreator(NOTIFY_NUMBER_TESTS, 'tests');

export const NOTIFY_NUMBER_TESTS_REMAINING = 'NOTIFY_NUMBER_TESTS_REMAINING';
export const notifyNumberTestsRemaining = makeActionCreator(NOTIFY_NUMBER_TESTS_REMAINING, 'tests');

export const TESTS_DONE = 'TESTS_DONE';
export const notifyTestsDone = makeActionCreator(TESTS_DONE);