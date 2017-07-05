import React from "react";
import {connect} from "react-redux";
import {
    createNewScaleAndSelect, createScale, selectScale, startSelectingItems, stopSelectingItems,
    toggleItem
} from "../actions/scales-actions";
import ItemDisplayComponent from "./ItemDisplayComponent";
import ScaleConfigurerComponent from "./ScaleConfigurerComponent";
import ScaleSelectorComponent from "./ScaleSelectorComponent";
import {mouseUp} from "../../common/actions/common-actions";

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
            <div style={containerStyle} onMouseUp={this.props.mouseUp}>
                <div style={itemDisplayComponentContainerStyle}>
                    <ItemDisplayComponent
                        data={this.props.itemNames}
                        selectedItems={this.props.selectedItems}
                        toggleItem={this.props.toggleItem}
                        startSelectingItems={this.props.startSelectingItems}
                    />
                </div>
                <div style={scaleConfigContainerStyle}>
                    <ScaleSelectorComponent
                        scaleNames={this.props.scales.map(item => item.name)}
                        createScale={this.props.createScale}
                        selectedScaleIndex={this.props.selectedScale}
                        selectScale={this.props.selectScale}
                    />
                    <ScaleConfigurerComponent scale={this.props.scales[this.props.selectedScale]}/>
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
        selectedItems: scales.selectedItems,
        selectedScale: scales.selectedScale
    }
};

const dispatchToProps = (dispatch) => {
    return {
        startSelectingItems: () => {
            dispatch(startSelectingItems());
        },
        mouseUp: () => {
            dispatch(mouseUp())
        },
        toggleItem: (itemIndex) => {
            dispatch(toggleItem(itemIndex));
        },
        createScale: () => {
            dispatch(createScale())
        },
        selectScale: (index) => {
            dispatch(selectScale(index));
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);