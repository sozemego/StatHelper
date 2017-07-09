import React from "react";
import {RaisedButton} from "material-ui";

const button = {
    margin: "auto",
    width: "100%"
};

export default class ExperimentalDesignConfigurationComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <RaisedButton
                    label="New test"
                    style={button}
                    onTouchTap={() => this.props.createTest()}
                />

            </div>
        )
    }

}