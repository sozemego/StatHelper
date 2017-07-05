import React from "react";
import {connect} from "react-redux";
import {createNewScale, startSelectingItems, stopSelectingItems, toggleItem} from "../actions/scales-actions";
import ItemDisplayComponent from "./ItemDisplayComponent";
import ScaleConfigurerComponent from "./ScaleConfigurerComponent";
import ScaleSelectorComponent from "./ScaleSelectorComponent";

const containerStyle = {
    display: "flex"
};

const itemDisplayComponentContainerStyle = {
    width: "30%"
};

const scaleConfigContainerStyle = {
    width: "70%"
};

export class ScalesContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={containerStyle}>
                <div style={itemDisplayComponentContainerStyle}>
                    <ItemDisplayComponent
                        data={this.props.itemNames}
                        selectedItems={this.props.selectedItems}
                        toggleItem={this.props.toggleItem}
                        stopSelectingItems={this.props.stopSelectingItems}
                        startSelectingItems={this.props.startSelectingItems}
                    />
                </div>
                <div style={scaleConfigContainerStyle}>
                    <ScaleSelectorComponent
                        scaleNames={this.props.scales.map(item => item.name)}
                        createNewScale={this.props.createNewScale}
                    />
                    <ScaleConfigurerComponent />
                </div>

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
        },
        createNewScale: () => {
            dispatch(createNewScale())
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);