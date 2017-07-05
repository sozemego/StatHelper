

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

export const CREATE_NEW_SCALE = "CREATE_NEW_SCALE";
export const createNewScale = () => {
    return {
        type: CREATE_NEW_SCALE
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
