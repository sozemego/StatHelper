import {createNewScale} from "../model/scale";
export const START_SELECTING_ITEMS = "START_SELECTING_ITEMS";
export const startSelectingItems = () => {
    return {
        type: START_SELECTING_ITEMS
    }
};

export const SELECT_ITEMS = "SELECT_ITEMS";
const selectItems = (selectedItems) => {
    return {
        type: SELECT_ITEMS,
        selectedItems
    }
};

export const ADD_SCALE = "ADD_SCALE";
const addScale = (scale) => {
    return {
        type: ADD_SCALE,
        scale
    }
};

export const SELECT_SCALE = "SELECT_SCALE";
export const selectScale = (scale) => {
    return {
        type: SELECT_SCALE,
        scale
    }
};

export const createScale = () => {
    return (dispatch, getState) => {
        dispatch(addScale(createNewScale()));
        const allScales = getState().scales.scales;
        dispatch(selectScale(allScales.length - 1));
    }
};

export const toggleItem = (itemIndex) => {
    return (dispatch, getState) => {
        const scales = getState().scales;
        if(scales.selectingItems) {
            const selectedItems = _toggleItem(itemIndex, scales.selectedItems);
            dispatch(selectItems(selectedItems));
        }
    }
};

const _toggleItem = (itemIndex, selectedItems) => {
    const index = selectedItems.findIndex((item) => {
        return item === itemIndex;
    });

    const nextSelectedItems = selectedItems.slice();
    if(index === -1) {
        nextSelectedItems.push(itemIndex);
    } else {
        nextSelectedItems.splice(index, 1);
    }

    return nextSelectedItems;
};

export const SET_SCALES = "SET_SCALES";
const setScales = (scales) => {
    return {
        type: SET_SCALES,
        scales
    }
};

export const setScaleName = (scaleIndex, scaleName) => {
    return (dispatch, getState) => {
        if(isScaleNameValid(scaleName)) {
            const scales = getState().scales.scales;
            let scale = scales[scaleIndex];
            scale.name = scaleName;
            dispatch(setScales([].concat(scales)));
        }
    }
};

const isScaleNameValid = (scaleName) => {
    return (scaleName || scaleName.trim());
};

export const removeScale = (scaleIndex) => {
    return (dispatch, getState) => {
        dispatch(selectScale(-1));
        const scales = getState().scales.scales.slice();
        scales.splice(scaleIndex, 1);
        dispatch(setScales(scales));
    };
};