import React from "react";
import {Chip, RaisedButton} from "material-ui";

const scaleListContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "6px"
};

const selectedScaleStyle = {
    backgroundColor: "orange"
};

const button = {
    margin: "auto",
    width: "100%"
};

export default class ScaleSelectorComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    _isScaleSelected = (index) => {
        return this.props.selectedScaleIndex === index;
    };

    render() {
        return(
            <div>
                <RaisedButton
                    label="New scale"
                    onTouchTap={() => this.props.createScale()}
                    style={button}
                />
                <div style={scaleListContainerStyle}>
                    {this.props.scaleNames.map((name, index) => {
                        return <Chip
                            onTouchTap={() => this.props.selectScale(index)}
                            key={index}
                            style={this._isScaleSelected(index) ? selectedScaleStyle : {}}
                        >
                            {name}
                        </Chip>
                    })}
                </div>
            </div>
        )
    }

}