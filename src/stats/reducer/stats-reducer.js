import {NOTIFY_TEST_RESULTS, NOTIFY_TESTS_RUNNING, RUN_TESTS} from '../actions/stats-actions';

const initialState = {
	minSignificance: 0.05,
	results: [],
	testsRunning: false,
	runningTests: []
};

const stats = (state = initialState, action) => {
	switch (action.type) {
		case RUN_TESTS:
			return {...state, testsRunning: true};
		case NOTIFY_TESTS_RUNNING:
			return {...state, runningTests: action.tests};
		case NOTIFY_TEST_RESULTS:
			return {...state, runningTests: assignResult(state.runningTests.slice(), action.name, action.results)};
		default:
			return state;
	}
};

const assignResult = (runningTests, testName, results) => {
	const test = runningTests.find(test => test.name === testName);
	test.results = results;
	return runningTests;
};

export default stats;