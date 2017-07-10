import {createNewTest} from "../model/test";

export const ADD_TEST = "ADD_TEST";
const addTest = (test) => {
    return {
        type: ADD_TEST,
        test
    }
};

export const createTest = () => {
    return (dispatch, getState) => {
        dispatch(addTest(createNewTest()));
        const allTests = getState().experimentalDesign.tests;
        dispatch(selectTest(allTests.length - 1));
    }
};

export const SELECT_TEST = "SELECT_TEST";
export const selectTest = (testIndex) => {
    return {
        type: SELECT_TEST,
        testIndex
    }
};