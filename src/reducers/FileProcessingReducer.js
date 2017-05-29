import {initialState} from "../init/init-state";
import {FILE_PARSING_START, FILE_PARSING_END, FILE_PARSING_ERROR} from "../actions/actions";

export const fileProcessingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILE_PARSING_START: return { ...state, parsing: true };
        case FILE_PARSING_END: return { ...state, parsing: false, data: action.parsedFile };
        case FILE_PARSING_ERROR: return { ...state, parsing: false, error: action.error }
        default: return state;
    }
};
