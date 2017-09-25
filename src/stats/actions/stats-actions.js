import {makeActionCreator} from '../../common/actions/utils';
import {store} from '../../store/store-init';

export const RUN_TESTS = 'RUN_TESTS';
export const runTests = () => {
	return dispatch => {
		console.log(store.getState());
		const {stats, experimentalDesign} = store.getState();
		dispatch(notifyNumberTests(experimentalDesign.tests.length));

		for (let i = 0; i < experimentalDesign.tests.length; i++) {
			console.log('RUN TEST');
			dispatch(notifyNumberTestsRemaining((experimentalDesign.tests.length - i) - 1));
		}
		dispatch(notifyTestsDone());
	};
};

// fired when a number of tests to run is announced (for progress bars)
export const NOTIFY_NUMBER_TESTS = 'NOTIFY_NUMBER_TESTS';
export const notifyNumberTests = makeActionCreator(NOTIFY_NUMBER_TESTS, 'tests');

export const NOTIFY_NUMBER_TESTS_REMAINING = 'NOTIFY_NUMBER_TESTS_REMAINING';
export const notifyNumberTestsRemaining = makeActionCreator(NOTIFY_NUMBER_TESTS_REMAINING, 'tests');

export const TESTS_DONE = 'TESTS_DONE';
export const notifyTestsDone = makeActionCreator(TESTS_DONE);