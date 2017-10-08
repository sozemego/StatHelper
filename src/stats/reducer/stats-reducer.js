import {
	NOTIFY_DESCRIPTIVES_RESULTS,
	NOTIFY_DESCRIPTIVES_RUNNING,
	NOTIFY_TEST_RESULTS,
	NOTIFY_TESTS_RUNNING,
} from '../actions/stats-actions';

const initialState = {
	minSignificance: 0.05,
	results: [],
	testsRunning: false,
	runningTests: [],
	descriptives: []
};

const stats = (state = initialState, action) => {
	switch (action.type) {
		case NOTIFY_TESTS_RUNNING:
			return {...state, runningTests: action.tests};
		case NOTIFY_TEST_RESULTS:
			return {...state, runningTests: assignResult(state.runningTests.slice(), action.name, action.results)};
		case NOTIFY_DESCRIPTIVES_RUNNING:
			return {...state, descriptives: action.descriptives};
		case NOTIFY_DESCRIPTIVES_RESULTS:
			return {...state, descriptives: assignDescriptive(state.descriptives.slice(), action.name, action.results)};
		default:
			return state;
	}
};

const assignResult = (runningTests, testName, results) => {
	const test = runningTests.find(test => test.name === testName);
	test.results = results;
	return runningTests;
};

const assignDescriptive = (descriptives, scaleName, results) => {
	const descriptive = descriptives.find(descriptives => descriptives.name === scaleName);
	descriptive.results = results;
	return descriptives;
};

export default stats;