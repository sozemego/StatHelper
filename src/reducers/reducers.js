import {combineReducers} from "redux";
import {fileProcessingReducer} from "../reducers/FileProcessingReducer";


const reducer = combineReducers({
    fileProcessing: fileProcessingReducer
});

export default reducer;
