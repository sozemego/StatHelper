import React from "react";
import {connect} from "react-redux";
import {startSelectingItems, stopSelectingItems, toggleItem} from "../actions/scales-actions";
import ItemDisplayComponent from "./ItemDisplayComponent";

export class ScalesContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <ItemDisplayComponent
                    data={this.props.itemNames}
                    selectedItems={this.props.selectedItems}
                    toggleItem={this.props.toggleItem}
                    stopSelectingItems={this.props.stopSelectingItems}
                    startSelectingItems={this.props.startSelectingItems}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {fileProcessing, scales} = state;
    return {
        scales: scales.scales,
        itemNames: fileProcessing.data[0],
        selectedItems: scales.selectedItems
    }
};

const dispatchToProps = (dispatch) => {
    return {
        startSelectingItems: () => {
            dispatch(startSelectingItems());
        },
        stopSelectingItems: () => {
            dispatch(stopSelectingItems());
        },
        toggleItem: (itemIndex) => {
            dispatch(toggleItem(itemIndex));
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);