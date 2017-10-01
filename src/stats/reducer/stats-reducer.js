import {NOTIFY_TESTS_RUNNING, RUN_TESTS, TESTS_DONE} from '../actions/stats-actions';

const initialState = {
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
		case TESTS_DONE:
			return {...state, testsRunning: false};
		default:
			return state;
	}
};

export default stats;