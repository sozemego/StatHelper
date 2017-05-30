import {FILE_PARSING_START, FILE_PARSING_END, FILE_PARSING_ERROR} from "../actions/actions";
import {combineReducers} from "redux";

/**
 * Contains the initial state for the application. Is it a good idea? Perhaps not
 * but it's here for now.
 */
const initialState = {
    parsing: false,
    error: null,
    data: []
};

const fileProcessingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILE_PARSING_START: return { ...state, parsing: true };
        case FILE_PARSING_END: return { ...state, parsing: false, data: action.parsedFile };
        case FILE_PARSING_ERROR: return { ...state, parsing: false, error: action.error };
        default: return state;
    }
};

const reducer = combineReducers({
    fileProcessing: fileProcessingReducer
});

export default reducer;
