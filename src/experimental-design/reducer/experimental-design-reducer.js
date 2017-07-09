import {ADD_TEST} from "../actions/experimental-design-actions";

const initialState = {
    tests: []
};

const experimentalDesign = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEST: return {...state, tests: addTest(action.test, state.tests)};
        default: return state;
    }
};

const addTest = (test, tests) => {
    return tests.concat([test]);
};

export default experimentalDesign;