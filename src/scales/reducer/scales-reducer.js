import { MOUSE_UP } from "../../common/actions/common-actions";
import {START_SELECTING_ITEMS, SELECT_ITEMS, ADD_SCALE, SELECT_SCALE} from "../actions/scales-actions";

const initialState = {
    scales: [],
    selectedItems: [],
    selectingItems: false,
    selectedScale: -1
};

const scales = (state = initialState, action) => {
    switch (action.type) {
        case START_SELECTING_ITEMS: return { ...state, selectingItems: true };
        case MOUSE_UP: return { ...state, selectingItems: false };
        case SELECT_ITEMS: return { ...state, selectedItems: action.selectedItems};
        case ADD_SCALE: return {...state, scales: addScale(state.scales)};
        case SELECT_SCALE: return {...state, selectedScale: action.scale};
        default: return state;
    }
};

const addScale = (scales) => {
    return scales.concat([{name: "Scale" + scales.length}]);
};

export default scales;