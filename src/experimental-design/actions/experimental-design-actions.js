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
        dispatch(addTest(createNewTest()))
    }
};