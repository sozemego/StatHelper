import React from "react";
import {FlatButton, TextField} from "material-ui";

const configurerContainer = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "10px 25px 0px 25px"
};

export default class ScaleConfigurerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    _onScaleNameChange = (event, newValue) => {
        this.props.setScaleName(newValue);
    };

    render() {
        const {scale} = this.props;
        return (
            <div style={configurerContainer}>
                <div>
                    <TextField
                        floatingLabelText="Scale name"
                        fullWidth={true}
                        value={scale.name}
                        onChange={this._onScaleNameChange}/>
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