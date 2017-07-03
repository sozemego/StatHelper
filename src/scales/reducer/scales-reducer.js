import { START_SELECTING_ITEMS, STOP_SELECTING_ITEMS, SELECT_ITEMS} from "../actions/scales-actions";

const initialState = {
    scales: [],
    selectedItems: [],
    selectingItems: false
};

const scales = (state = initialState, action) => {
    switch (action.type) {
        case START_SELECTING_ITEMS: return { ...state, selectingItems: true };
        case STOP_SELECTING_ITEMS: return { ...state, selectingItems: false };
        case SELECT_ITEMS: return { ...state, selectedItems: action.selectedItems};
        default: return state;
    }
};

export default scales;