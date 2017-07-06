import React from "react";
import {Chip, FlatButton, RadioButton, RadioButtonGroup, TextField} from "material-ui";
import {MEASUREMENT_LEVELS} from "../model/scale";

const configurerContainer = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "10px 25px 0px 25px"
};

const measurementLevel = {
    display: "flex",
    flexDirection: "row"
};

const measurementLevelItem = {
    display: "block"
};

const itemsContainer = {
    display: "flex",
    flexWrap: "wrap"
};

export default class ScaleConfigurerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    _onScaleNameChange = (event, newValue) => {
        this.props.setScaleName(newValue);
    };

    _onScaleMeasurementLevelChange = (event, newValue) => {
        this.props.setMeasurementLevel(newValue);
    };

    render() {
        const {scale} = this.props;
        const {items} = scale;
        items.sort((a, b) => a - b);
        return (
            <div style={configurerContainer}>
                <div>
                    <p>Scale name</p>
                    <TextField
                        hintText="Scale name"
                        fullWidth={true}
                        value={scale.name}
                        onChange={this._onScaleNameChange}/>
                </div>
                <div>
                    <p>Level of measurement</p>
                    <RadioButtonGroup
                        name="Measurement level"
                        style={measurementLevel}
                        valueSelected={scale.measurementLevel}
                        onChange={this._onScaleMeasurementLevelChange}
                    >
                        {MEASUREMENT_LEVELS.map((level, index) => {
                            return <RadioButton
                                key={index}
                                label={level}
                                value={level}
                                style={measurementLevelItem}
                            />;
                        })}
                    </RadioButtonGroup>
                </div>
                <div>
                    <p>Items</p>
                    <div style={itemsContainer}>
                        {items.map((item, index) => {
                            return <Chip key={index}>
                                {item}
                            </Chip>
                        })}
                    </div>
                </div>
                <div>
                    <FlatButton
                        label="Remove scale"
                        fullWidth={true}
                        onTouchTap={this.props.removeScale}
                    />
                </div>
            </div>
        )
    }

}