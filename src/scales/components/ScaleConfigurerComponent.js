import React from "react";
import {Chip, FlatButton, RadioButton, RadioButtonGroup, TextField} from "material-ui";
import {MEASUREMENT_LEVELS} from "../model/scale";

const configurerContainer = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "10px 25px 0px 25px"
};

const field = {
    display: "flex"
};

const fieldName = {
    marginRight: "10px"
};

const measurementLevel = {
    display: "flex",
    flexDirection: "row"
};

const measurementLevelItem = {
    display: "block",
    margin: "auto",
    paddingRight: "6px"
};

const itemsContainer = {
    display: "flex",
    flexWrap: "wrap"
};

const item = {
    margin: "auto"
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
        return (
            <div style={configurerContainer}>
                <div style={field}>
                    <p style={fieldName}>Scale name</p>
                    <TextField
                        hintText="Scale name"
                        fullWidth={false}
                        value={scale.name}
                        underlineShow={false}
                        onChange={this._onScaleNameChange}/>
                </div>
                <div style={field}>
                    <p style={fieldName}>Level of measurement</p>
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
                <div style={field}>
                    <p style={fieldName}>Items</p>
                    <div style={itemsContainer}>
                        {items.map((item, index) => {
                            return <Chip
                                style={item}
                                key={index}>
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