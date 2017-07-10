import React from "react";
import {connect} from "react-redux";
import {
    createScale, removeScale, selectScale, setMeasurementLevel, setScaleName, startSelectingItems,
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

    _getSelectedScale = () => {
        return this.props.scales[this.props.selectedScale];
    };

    _getSelectedScaleItems = () => {
        const selectedScale = this._getSelectedScale();
        return selectedScale ? selectedScale.items: [];
    };

    _getConfigurer = () => {
        const selectedScale = this._getSelectedScale();
        if(!selectedScale) {
            return null;
        }
        const {selectedScale: selectedScaleIndex} = this.props;
        return <ScaleConfigurerComponent
            scale={selectedScale}
            setScaleName={this.props.setScaleName.bind(null, selectedScaleIndex)}
            removeScale={this.props.removeScale.bind(null, selectedScaleIndex)}
            setMeasurementLevel={this.props.setMeasurementLevel.bind(null, selectedScaleIndex)}
        />;
    };

    render() {
        const configurer = this._getConfigurer();
        return (
            <div style={containerStyle} onMouseUp={this.props.mouseUp}>
                <div style={itemDisplayComponentContainerStyle}>
                    <ItemDisplayComponent
                        data={this.props.itemNames}
                        selectedItems={this._getSelectedScaleItems()}
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
                    {configurer}
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
        },
        setScaleName: (scaleIndex, scaleName) => {
            dispatch(setScaleName(scaleIndex, scaleName))
        },
        removeScale: (scaleIndex) => {
            dispatch(removeScale(scaleIndex));
        },
        setMeasurementLevel: (scaleIndex, measurementLevel) => {
            dispatch(setMeasurementLevel(scaleIndex, measurementLevel));
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);