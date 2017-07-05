import React from "react";
import {Chip, FlatButton} from "material-ui";

const scaleListContainerStyle = {
    display: "flex",
    flexWrap: "wrap"
};

const selectedScaleStyle = {
    backgroundColor: "orange"
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
                <FlatButton
                    label="New scale"
                    secondary={true}
                    onTouchTap={() => this.props.createScale()}
                    style={{margin: "auto", width: "100%"}}
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